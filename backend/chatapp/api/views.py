from django.shortcuts import render
from rest_framework import generics
from .models import Message, Room, User,NotificationRoom
from .serializers import MessageSerializer, RoomSerializer, Userserializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
import json
from django.db.models import Q
import random
import string
from .google_bard import get_response
from django.http import JsonResponse
from time import timezone
from datetime import datetime

class MessageList(APIView):
    def get(self,request):
        try:
            room = request.query_params.get("room")
            
            messages = Message.objects.filter(room__name=room).order_by("timestamp")
            serializer = MessageSerializer(messages,many=True)
            return Response(data=serializer.data,status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class Chatroomlist(generics.ListCreateAPIView):
    serializer_class = RoomSerializer

    def post(self, request):
        username = request.data.get("username")
        try:
            user = User.objects.get(username=username)
            queryset = Room.objects.filter(userslist__in=[user.id])
            serializer = RoomSerializer(queryset, many=True)
            userslist = [
                user_id for room in serializer.data for user_id in room["userslist"]
            ]
            users = []
            userslist_values = list(set(userslist))
            for x in userslist_values:
                if x != user.id:
                    userr = User.objects.get(id=x)
                    serializer = Userserializer(userr)
                    users.append(serializer.data)
                
            return Response(data=users, status=status.HTTP_200_OK)
        except:
            return Response(
                data={"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST
            )

class FindRoom(APIView):
    def generate_mixed_string(self, length=5):
        characters = string.digits + string.ascii_letters 
        mixed_string = ''.join(random.choice(characters) for _ in range(length))
        return mixed_string

    def get_or_create_user(self, username):
        user, created = User.objects.get_or_create(username=username)
        return user

    def get_or_create_room(self, user1, user2):
        room_name = self.generate_mixed_string()
        room, created = Room.objects.get_or_create(name=room_name)
        room.userslist.add(user1, user2)
        return room

    def get(self, request):
        user1_name = request.query_params.get("user1")
        user2_name = request.query_params.get("user2")
        print(user1_name,user2_name)
        if user1_name and user2_name:
            try:
                user1 = self.get_or_create_user(user1_name)
                user2 = self.get_or_create_user(user2_name)

                user1_rooms = Room.objects.filter(userslist=user1)
                user2_rooms = Room.objects.filter(userslist=user2)

                room = user1_rooms.filter(userslist=user2).first()

                if not room: 
                    room = self.get_or_create_room(user1, user2)

                serializer = RoomSerializer(room)
                print(serializer.data)
                return Response(data=serializer.data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class GetUser(APIView):
    def get(self,request):
        userId = request.query_params.get("username")
        try:
            user = User.objects.get(username=userId)
            serializer = Userserializer(user)
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GetLastMessage(APIView):
    print('jj')
    def get(self,request):
        room_id = request.data.get("roomid")
        print(room_id)
        try:
            last_message = Message.objects.filter(room=room_id).order_by("timestamp")[:1]
            m = last_message[0]
            print(m.content) 
            serializer = MessageSerializer(m)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GoogleBardResponse(APIView):
    def get(self,request):
        print(request.query_params.get("prompt"))
        response = get_response(request.query_params.get("prompt"))
          
        return Response(data=response,status=status.HTTP_200_OK)

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class send_notification(APIView):
    def post(self,request):
        username = "bibin"
        content = "helloooooooo"
        type = "hiiiiiiiiii"
        try:
            room = NotificationRoom.objects.get(user__username=username)
            room_group_name = room.name
        except :
            return Response(status=status.HTTP_404_NOT_FOUND)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                'type': 'notification',
                'content': content,
                'type': type,
                'created_at': 666,
                'is_seen': False,
            }
        )

        return Response(status=status.HTTP_200_OK)

