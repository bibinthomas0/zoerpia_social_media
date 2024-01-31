import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from .models import Message, Room, User, NotificationRoom
import random
import string
from django.db.models import Count
from .serializers import MessageSerializer
from .signals import create_notification 

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None
        self.room_group_name = None
        self.room = None
        self.user = None
        self.users = None

    async def connect(self):
        print("Connecting...")
        print("rtrt", self.scope["url_route"]["kwargs"]["username"])
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.userr = self.scope["url_route"]["kwargs"]["username"] or "Anonymous"
        if not self.room_name or len(self.room_name) > 100:
            await self.close(code=400)
            return
        self.room_group_name = f"chat_{self.room_name}"
        self.room = await self.get_or_create_room()
        self.user = await self.get_or_create_user()

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.create_online_user(self.user)
        await self.send_user_list()
        await self.seen_messages()
        # consumer_instance = NotificationConsumer()
        # await consumer_instance.get_unread_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        await self.send_user_list()

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data.get("message")
        m_type = data.get("m_type")
        if not message or len(message) > 555:
            return
        await self.seen_messages()
        message_obj = await self.create_message(message, m_type)
        if message_obj:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message_obj.content,
                    "username": message_obj.user.username,
                    "timestamp": str(message_obj.timestamp),
                    "seen": message_obj.seen,
                    "m_type": message_obj.m_type,
                },
            )

    async def send_user_list(self):
        user_list = await self.get_connected_users()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "user_list",
                "user_list": user_list,
            },
        )

    async def chat_message(self, event):
        message = event["message"]
        username = event["username"]
        timestamp = event["timestamp"]
        m_type = event["m_type"]
        await self.send(
            text_data=json.dumps(
                {
                    "message": message,
                    "username": username,
                    "timestamp": timestamp,
                    "m_type": m_type,
                }
            )
        )

    async def user_list(self, event):
        user_list = event["user_list"]
        await self.send(text_data=json.dumps({"user_list": user_list}))

    @database_sync_to_async
    def create_message(self, message, m_type):
        try:
            user_instance, _ = User.objects.get_or_create(username=self.user.username)
            create_notification(user=self.user,room=self.room)
            
            return Message.objects.create(
                room=self.room, content=message, user=user_instance, m_type=m_type
            )
            
        except Exception as e:
            print(f"Error creating message: {e}")
            return None

    @database_sync_to_async
    def get_or_create_room(self):
        room, _ = Room.objects.get_or_create(name=self.room_name)
        return room

    @database_sync_to_async
    def get_or_create_user(self):
        userr = User.objects.get_or_create(username=self.userr)
        user = User.objects.get(username=self.userr)
        return user

    @database_sync_to_async
    def create_online_user(self, user):
        try:
            self.room.userslist.add(user.id)
            self.room.save()
        except Exception as e:
            print("Error joining user to room:", str(e))
            return None

    @database_sync_to_async
    def remove_online_user(self, user):
        try:
            self.room.userslist.remove(user)
            self.room.save()
        except Exception as e:
            print("Error removing user to room:", str(e))
            return None

    @database_sync_to_async
    def get_connected_users(self):
        return [user.username for user in self.room.userslist.all()]

    @database_sync_to_async
    def seen_messages(self):
        un_read = Message.objects.filter(room=self.room).exclude(user=self.user)
        for obj in un_read:
            obj.seen = True
            obj.save()





class NotificationConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None
        self.room = None
        self.user = None 
        self.room_group_name = None
        self.data = None
        self.rooms = None
    async def connect(self):
        print("Connecting...")
        self.userr = self.scope["url_route"]["kwargs"]["username"] or "Anonymous"
        if not self.userr or len(self.userr) > 100:
            await self.close(code=400)
            return
        self.user = await self.get_or_create_user()
        self.room = await self.get_or_create_room()
        self.room_group_name = self.room_name
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.create_online_user()

        await self.get_unread_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        await self.remove_online_user()

    async def send_notification(self, event):
      
        await self.send(
            text_data=json.dumps({"type": "notification", "user": event["user"]})
        )
    async def send_chat_notification(self, event):
      
        await self.send(
            text_data=json.dumps({"type": "chat_notification", "user": event["user"]})
        )

    async def get_unread_messages(self):
        self.rooms = await self.get_rooms()
        self.data = await self.unread_messages()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "send_unread_messages", 
                "un_read": self.data,
            },
        )

    async def send_unread_messages(self, event):
        unread = event["un_read"]
        await self.send(text_data=json.dumps({"type":"unread_messages","unread_messages": unread}))

    def generate_mixed_string(self, length=10):
        characters = string.digits + string.ascii_letters
        mixed_string = "".join(random.choice(characters) for _ in range(length))
        return mixed_string

    @database_sync_to_async
    def get_or_create_room(self):
        try:
            room = NotificationRoom.objects.get(user=self.user)
            self.room_name = room.name
            print(self.room_name)
        except:
            self.room_name = self.generate_mixed_string()
            room = NotificationRoom.objects.create(user=self.user, name=self.room_name)
        return room

    @database_sync_to_async
    def get_or_create_user(self):
        userr = User.objects.get_or_create(username=self.userr)
        user = User.objects.get(username=self.userr)
        print("user_created", user.id)
        return user

    @database_sync_to_async
    def create_online_user(self):
        self.user.is_online = True
        self.user.save()

    @database_sync_to_async
    def remove_online_user(self):
        self.user.is_online = False
        self.user.save()

    @database_sync_to_async
    def get_rooms(self):
        username = self.user
        user = User.objects.get(username=username)
        queryset = Room.objects.filter(userslist=user)

        roomlist = list(queryset) 
        return roomlist



    @database_sync_to_async
    def unread_messages(self):

        unread_messages_dict = {}

        for room in self.rooms:
            unread = Message.objects.filter( room__id=room.id, seen=False).exclude(user=self.user)
            unread_messages_list = [
                {
                    "id": msg.id,
                    "content": msg.content,
                    "timestamp": str(msg.timestamp),
                    "room": msg.room_id,
                    "user": msg.user_id,
                    "seen": msg.seen,
                    "m_type": msg.m_type,
                } 
                for msg in unread
            ]
            unread_messages_dict[room.name] = unread_messages_list

        print('not calling')
        return unread_messages_dict
