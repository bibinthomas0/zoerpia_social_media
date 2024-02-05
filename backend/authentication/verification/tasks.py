from celery import shared_task
from django.core.mail import send_mail
from authentication import settings
import random
from .models import UserOtp

@shared_task(bind=True)
def send_notification_mail(self, target_mail):
    mail_subject = "Welcome on Board!"
    print('senddingggggg')
    otp = str(random.randint(100000, 999999)) 
    message = f'Use {otp} as One Time Password (OTP) to log in to your Zorpia account. This OTP is valid for 3 minutes. Please do not share this OTP with anyone for security reasons.'
    send_mail(
        subject = mail_subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[target_mail],
        fail_silently=False,
        )
    UserOtp.objects.create(email=target_mail,otp=otp)
    return 'Done'