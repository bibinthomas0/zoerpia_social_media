from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Message,User,NotificationRoom
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def create_notification(user,room):
    users_in_room = room.userslist.all()
    other_user = room.userslist.exclude(id=user.id).first()

    if other_user:
        try:
            not_room = NotificationRoom.objects.get(user_id=other_user.id)
        except NotificationRoom.DoesNotExist:
            not_room = NotificationRoom.objects.create(user_id=other_user.id)

        room_name = not_room.name

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            room_name,
            {
                "type": "send_chat_notification",
                "user": other_user.username,
            }
        )

        print("Notification sent for", other_user.username)
    else:
        print("No other user in the room")