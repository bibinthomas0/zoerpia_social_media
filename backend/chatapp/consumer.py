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
        print(body)
        data = json.loads(body)
        by_user = data.get("by_user")
        username = data.get("user")
        post_id = data.get('post_id')
        
        try:
            user = User.objects.get(username=username)
        except:
            user = User.objects.create(username=username)
        print(user.id)
        print('dooooooone')
        try:
            room = NotificationRoom.objects.get(user_id=user.id)
        except:
            room = NotificationRoom.objects.get_or_create(user_id=user.id)
            
        room_name = room.name
        channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     room_name,
        #     {
        #         "type": "send_notification",
        #         "id":body.id,
        #         'user': notification.user,
        #         "notification_type": notification.notification_type,
        #         'post_id': notification.post_id,
        #         'by_user': notification.by_user,
        #         'seen':notification.seen
        #     }
        # )
        print('notification createdd')

channel.basic_consume(queue='notification', on_message_callback=callback, auto_ack=True)

print('Started Consuming')

channel.start_consuming()

channel.close()