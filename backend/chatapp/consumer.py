import pika, json, os, django
from django.http import JsonResponse
from requests import Response


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chatapp.settings")
django.setup()

from api.models import Notifications,User,NotificationRoom
from api.consumers import NotificationConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

params = pika.URLParameters('amqps://iggiivmd:W-MSVEIraHIRql_MsV720W7f3GPuQCEc@puffin.rmq2.cloudamqp.com/iggiivmd')
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='notification')


def callback(ch, method, properties, body):
        data = json.loads(body)
        username = data.get("user")
        try:
            user = User.objects.get(username=username)
        except:
            user = User.objects.create(username=username)
        print(user.id)
        try:
            room = NotificationRoom.objects.get(user=user)
            print(room.name)
        except:
            print('hi')
            room = NotificationRoom.objects.create(user_id=user.id)   
        room_name = room.name
        print(room_name)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            room_name,
            {
                "type": "send_notification",
                'user': username,
        
            }
        )
        print('notification createdd')
            
  
channel.basic_consume(queue='notification', on_message_callback=callback, auto_ack=True)

print('Started Consuming')

channel.start_consuming()

channel.close()