from django.urls import path

from . import views


urlpatterns = [
    path(
        "messages/",
        views.MessageList.as_view(),
        name="chat-messages",
    ),
    path("chatrooms/", views.Chatroomlist.as_view(), name="chatrooms"),
    path("findroom/", views.FindRoom.as_view(), name="findroom"),
    path("getuser/", views.GetUser.as_view(), name="getuser"),
    path('bardresponse/',views.GoogleBardResponse.as_view(),name="bardresponse"),
    path('lastmessage/',views.GetLastMessage.as_view(),name="lastmessage"),
    path('send_notification/', views.send_notification.as_view() , name='send_notification'),
    path('online-users/', views.OnlineUserListView.as_view(), name='online-users-list'),
]
