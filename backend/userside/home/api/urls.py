from django.urls import path
from . import views


urlpatterns = [
    path("createpost/", views.CreatePost.as_view(), name="create-post"),
    path("listpost/", views.PostListView.as_view(), name="list-post"),
    path("likepost/", views.PostLikeView.as_view(), name="list-like"),
    path("createcomment/", views.CommentCreate.as_view(), name="create-comment"),
    path("listcomment/", views.CommentList.as_view(), name="list-comment"),
    path("createcallout/", views.AddCallout.as_view(), name="createcallout"),
    path("follow/", views.FollowManagementApi.as_view(), name="follow"),
    path("getprofilephoto/", views.ProfileImage.as_view(), name="getprofilephoto"),
    path("getcoverphoto/", views.CoverImage.as_view(), name="getcoverphoto"),
    path("profilelistpost/", views.ProfilePostListView.as_view(), name="profilelistpost"),
    path("checkfollow/", views.FollowPostChecking.as_view(), name="checkfollow"),
    path("followingList/", views.FollowingUsers.as_view(), name="followingList"),
    path("followersList/", views.FollowersUsers.as_view(), name="followersList"),
    path("commentreport/", views.CommentReport.as_view(), name="commentreport"),
    path("reportedcomments/",views.ReportedCommentsListing.as_view(),name="reportedcomments",),
    path("getcomment/", views.CommentRetrieve.as_view(), name="getcomment"),
    path("commentverify/", views.CommentVerify.as_view(), name="commentverify"),
    path("commentremove/", views.CommentRemove.as_view(), name="commentremove"),
    path("postreport/", views.PostReport.as_view(), name="postreport"),
    path("reportedposts/", views.ReportedPostListing.as_view(), name="reportedposts"),
    path("getpost/", views.PostRetrieve.as_view(), name="getpost"),
    path("postverify/", views.PostVerify.as_view(), name="postverify"),
    path("postremove/", views.PostRemove.as_view(), name="postremove"),
    path("notifylist/", views.NotificationsList.as_view(), name="notifylist"),
    path("recomendaion/", views.RecommendedPosts.as_view(), name="recomendaion"),
    path("postdelete/", views.PostDelete.as_view(), name="postdelete"),
    path("commentdelete/", views.CommentDelete.as_view(), name="commentdelete"),
     path("createreply/", views.ReplyCommentCreate.as_view(), name="createreply"),
     path("replylist/", views.ReplyCommentListing.as_view(), name="replylist"), 
     path("notifyunreadlist/", views.NotificationsUnreadList.as_view(), name="notifyunreadlist"),
]
   