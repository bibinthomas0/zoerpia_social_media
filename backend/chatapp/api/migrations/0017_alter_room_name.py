# Generated by Django 5.0.1 on 2024-02-06 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_notificationroom_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='name',
            field=models.TextField(max_length=100),
        ),
    ]
