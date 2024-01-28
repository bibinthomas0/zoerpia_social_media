from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notifications,NotificationRoom

@receiver(pre_save, sender=Notifications)
def message_created(sender, instance,**kwargs):
    print('notification_created signal handler is called.')
    # if instance:
    #     room = NotificationRoom.objects.get(user__username=instance.user)
    #     room_name = room.name
    #     channel_layer = get_channel_layer()
    #     async_to_sync(channel_layer.group_send)(
    #         room_name,
    #         {
    #             "type": "send_notification",
    #             'user': instance.user,
    #             "notification_type": instance.notification_type,
    #             'created_at': instance.created_at,
    #             'post_id': instance.post_id,
    #             'by_user': instance.by_user
    #         }
    #     )
