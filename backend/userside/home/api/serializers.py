from rest_framework import serializers
from home.models import (
    post_collection,
    Callouts,
    Follow,
    ReportedComments,
    Comments,
    ReportedPosts,Notification,ReplyComments
)




class PostSerializer(serializers.Serializer):
    class Meta:
        model = post_collection
        fields = "__all__"


class CalloutSerializer(serializers.Serializer):
    class meta:
        model = Callouts
        fields = "__all__"

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


class FollowSerializer(serializers.Serializer):
    class meta:
        model = Follow
        fields = "__all__"


class ReportCommentSerializer(serializers.Serializer):
    comment_id = serializers.CharField()
    commenter = serializers.CharField()
    post_id = serializers.CharField()
    reported_by = serializers.CharField()
    _id = serializers.CharField()
    verified = serializers.BooleanField()


class CommentSerializer(serializers.Serializer):
    class Meta:
        model = Comments
        fields = "__all__"
        
class ReplyCommentSerializer(serializers.Serializer):
    comment_id = serializers.CharField()
    reply = serializers.CharField()
    username = serializers.CharField()
    _id = serializers.CharField() 
    created_at = serializers.DateTimeField()
    replied_to = serializers.CharField()
 
class ReportPostSerializer(serializers.Serializer):
    post_id = serializers.CharField()
    reported_by = serializers.CharField()
    _id = serializers.CharField()
    created_at = serializers.DateTimeField()
    verified = serializers.BooleanField()
    
class NotificationSerializer(serializers.Serializer):
    class Meta:
        model = Notification 
        fields = "__all__"
    # _id = serializers.CharField()
    # user = serializers.CharField()
    # message = serializers.CharField() 
    # by_user = serializers.CharField()
    # post_id = serializers.CharField()
    # notification_type = serializers.CharField()
    
import json
from bson import ObjectId

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)