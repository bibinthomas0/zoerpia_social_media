from ..models import (
    post_collection,
    Comments,
    Follow,
    ReportedComments,
    ReportedPosts,
    Notification,
    UserChips,
    ReplyComments
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import (
    PostSerializer,
    ReplyCommentSerializer,
    CalloutSerializer,
    ReportCommentSerializer,
    ReportPostSerializer,
    NotificationSerializer,
     CustomJSONEncoder
)
from bson import ObjectId
import json
from bson import json_util
from datetime import datetime
from bson import ObjectId
from bson.json_util import dumps
from django.http import JsonResponse
from rest_framework import generics
from pymongo.errors import PyMongoError
from ..producer import publish
from django.shortcuts import get_object_or_404


class CreatePost(APIView):
    def post(self, request):
        data = request.data
        date = datetime.now()
        data["created_at"] = date
        user = data["user"]
        data["likes"] = []
        data["active"] = True
        type = data["type"]
        if type == "profile photo":
            post_collection.find_one_and_update(
                {"$and": [{"user": user}, {"type": "profile photo"}, {"active": True}]},
                {"$set": {"active": False}},
            )
        elif type == "cover photo":
            post_collection.find_one_and_update(
                {"$and": [{"user": user}, {"type": "cover photo"}, {"active": True}]},
                {"$set": {"active": False}},
            )
        post_collection.insert_one(data)
        return Response(status=status.HTTP_201_CREATED)


class PostListView(APIView):
    def get(self, request):
        try:
            posts_cursor = post_collection.find().sort("created_at", -1)
            user_id = request.query_params.get("userid")
            print(user_id)
            user = Follow.find_one({"user": user_id})
            following = user["following"]
            following.append(user_id)
            print(following)
            posts_data = []
            for post in posts_cursor:
                post["_id"] = str(post["_id"])
                try:
                    if post["verified"]:
                        continue
                except:
                    if post["user"] in following:
                        posts_data.append(post)
            return Response(
                posts_data, status=status.HTTP_200_OK, content_type="application/json"
            )
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PostLikeView(APIView):
    def updateRecomendation(liked_post_oid, liked_by):
        print(liked_post_oid, "ttttttttttttttttttttttttttt")
        the_post = post_collection.find_one({"_id": liked_post_oid})
        try:
            chips = the_post["chips"]
            print(chips)
            User = UserChips.find_one(
                {
                    "user": liked_by,
                }
            )
            if User:
                l = User["chips"]
                l = list(set(l + chips))
                print(l)
                UserChips.find_one_and_update(
                    {"user": liked_by}, {"$set": {"chips": l}}, return_document=True
                )

            else:
                UserChips.insert_one({"user": liked_by, "chips": chips})
                print("new need")
        except:
            print("hiiiiiiiiiiiiii")

    def post(self, request):
        liked_post = request.data["post"]
        liked_by = request.data["user"]
        liked_post_oid = ObjectId(liked_post)
        post = post_collection.find_one({"_id": liked_post_oid, "likes": liked_by})
        if post:
            update_query = {"$pull": {"likes": liked_by}}
        else:
            update_query = {"$push": {"likes": liked_by}}
            PostLikeView.updateRecomendation(liked_post_oid, liked_by)
        kk = post_collection.find_one_and_update({"_id": liked_post_oid}, update_query)
        userr = kk["user"]
        if post:
            data = {"by_user": liked_by, "post_id": liked_post_oid, "notification_type": "like"}
            Notification.delete_many(data)
            publish(
                    method="like",
                    body={'user':userr},
                )
            return Response(status.HTTP_205_RESET_CONTENT)
        else: 
            if userr != liked_by:
                date = datetime.now()
                data = {"by_user": liked_by, "post_id": liked_post_oid, "notification_type": "like", 'user': userr, 'created_at': date,'seen':False}
                Notification.insert_one(data)
                publish(
                    method="like",
                    body={'user':userr},
                )
            return Response(status.HTTP_202_ACCEPTED)


class CommentCreate(APIView):
    def post(self, request):
        date = datetime.now()
        request.data["created_at"] = date
        Comments.insert_one(request.data)
        d = Comments.find_one(request.data)
        post_id = ObjectId(request.data["post_id"])
        post = post_collection.find_one({"_id": post_id})
        print(d['_id'])
        if post['user'] != request.data['user_name']:
            data = {"by_user": request.data['user_name'],'comment':d['_id'], "post_id": str(post_id), "notification_type": "comment", 'user': post['user'], 'created_at': date,'seen':False}
            Notification.insert_one(data)
            print(data)
            publish(
                        method="comment",
                        body={"user":post['user']}
                    )
        return Response(status.HTTP_201_CREATED)

class CommentList(APIView):
    def get(self, request):
        post_id = request.query_params.get("id")
        if post_id is not None:
            data_cursor = Comments.find({"post_id": post_id}).sort("created_at", -1)
            comment_data = []
            for data in data_cursor:
                data["_id"] = str(data["_id"])
                try:
                    if data["verified"]:
                        continue
                except:
                    comment_data.append(data)
            return Response(comment_data, status.HTTP_200_OK)
        else:
            return Response(
                {"error": 'Missing or invalid "id" parameter'},
                status.HTTP_400_BAD_REQUEST,
            )


class AddCallout(APIView):
    def post(self, request):
        serializer = CalloutSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


class FollowManagementApi(APIView):
    def post(self, request):
        followed_user = request.data.get("followed_user")
        following_user = request.data.get("following_user")
        print(followed_user, following_user)
        the_user = Follow.find_one(
            {
                "user": followed_user,
                "followers": {"$elemMatch": {"$eq": following_user}},
            }
        )
        print(the_user)
        f_user = Follow.find_one({"user": followed_user})
        s_userr = Follow.find_one({"user": following_user})
        try:
            if the_user:
                Followers_update_query = {"$pull": {"followers": following_user}}
                following_update_query = {"$pull": {"following": followed_user}}
            else:
                Followers_update_query = {"$push": {"followers": following_user}}
                following_update_query = {"$push": {"following": followed_user}}
                if not f_user:
                    Follow.insert_one({"user": followed_user})
                if not s_userr:
                    Follow.insert_one({"user": following_user})
                data = {'user':followed_user,'by_user':following_user,'created_at':datetime.now(),'notification_type':"follow"}
                Notification.insert_one(data)
                publish(
                    method="comment",
                    body={"user":followed_user}
                )
            Follow.find_one_and_update({"user": followed_user}, Followers_update_query)
            Follow.find_one_and_update({"user": following_user}, following_update_query)
            print("done")
            return Response(status.HTTP_202_ACCEPTED)
        except:
            return Response(status.HTTP_406_NOT_ACCEPTABLE)


class ProfileImage(APIView):
    def post(self, request): 
        user = request.data["username"]
        photos = post_collection.find_one(
            {"$and": [{"user": user}, {"type": "profile photo"}, {"active": True}]}
        )
        if photos:
            data = photos["image"]
            return Response(data, status.HTTP_202_ACCEPTED)
        else:
            return Response(status.HTTP_204_NO_CONTENT)


class CoverImage(APIView):
    def post(self, request):
        user = request.data["username"]
        photos = post_collection.find_one(
            {"$and": [{"user": user}, {"type": "cover photo"}, {"active": True}]}
        )
        if photos:
            data = photos["image"]
            return Response(data, status.HTTP_202_ACCEPTED)
        else:
            return Response(status.HTTP_204_NO_CONTENT)


class ProfilePostListView(APIView):
    def post(self, request):
        username = request.data["username"]
        posts_cursor = post_collection.find({"user": username}).sort("created_at", -1)
        posts_data = []
        for post in posts_cursor:
            post["_id"] = str(post["_id"])
            posts_data.append(post)
        return Response(
            posts_data, status=status.HTTP_200_OK, content_type="application/json"
        )


class FollowPostChecking(APIView):
    def post(self, request):
        user = request.data.get("user")
        author = request.data.get("author")

        data = Follow.find_one(
            {"$and": [{"user": user}, {"following": {"$in": [author]}}]}
        )

        if data:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class FollowingUsers(APIView):
    def post(self, request):
        try:
            user = request.data["user"]
            datas = Follow.find_one({"user": user})
            data = datas["following"]
            print(data)
            return Response(data=data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class FollowersUsers(APIView):
    def post(self, request): 
        try:
            user = request.data["user"]
            datas = Follow.find_one({"user": user})
            data = datas["followers"]
            print(data)
            return Response(data=data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CommentReport(APIView):
    def post(self, request):
        result = ReportedComments.insert_one(
            {
                "comment_id": request.data.get("id"),
                "commenter": request.data.get("Commenter"),
                "post_id": request.data.get("post_id"),
                "reported_by": request.data.get("reported_by"),
                "verified": False,
            }
        )
        if result.inserted_id:
            return Response({"message": "Comment reported successfully"}, status=200)
        else:
            return Response({"error": "Failed to report comment"}, status=500)


class ReportedCommentsListing(APIView):
    def get(self, request):
        reported_comments = list(ReportedComments.find().sort("created_at", -1))
        serializer = ReportCommentSerializer(reported_comments, many=True)
        if serializer.data:
            return Response(data=serializer.data, status=200)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class CommentRetrieve(APIView):
    def post(self, request):
        comment_id = ObjectId(request.data["comment"])

        comment = Comments.find_one({"_id": comment_id})

        if comment:
            data = comment["comment"]
            return Response(
                data=data,
                status=200,
            )
        else:
            return Response(status=204)


class CommentVerify(APIView):
    def post(self, request):
        print(request.data["r_comment"])
        reported_comment = ObjectId(request.data["r_comment"])
        try:
            ReportedComments.find_one_and_update(
                {"_id": reported_comment}, {"$set": {"verified": True}}
            )
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CommentRemove(APIView):
    def post(self, request):
        orginal_comment_id = ObjectId(request.data["orginalcomment"])
        reported_comment = ObjectId(request.data["r_comment"])
        try:
            c = Comments.find_one_and_update(
                {"_id": orginal_comment_id},
                {"$set": {"verified": False}},
            )
            d = ReportedComments.find_one_and_update(
                {"_id": reported_comment}, {"$set": {"verified": True}}
            )
            user = c["user_name"]
            comm = c["comment"]
            message = f"{user} your comment '{comm}' has been removed. Because it voilate our community policies"
            data = Notification.insert_one(
                {"user_name": user, "message": message, "type": "comment_remove"}
            )
            if data:
                print("succes")
            return Response(status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(f"Error: {e}")
            return Response(status=status.HTTP_404_NOT_FOUND)


class PostReport(APIView):
    def post(self, request):
        date = datetime.now()
        result = ReportedPosts.insert_one(
            {
                "post_id": request.data.get("post_id"),
                "reported_by": request.data.get("reported_by"),
                "created_at": date,
                "verified": False,
            }
        )
        if result.inserted_id:
            return Response({"message": "Post reported successfully"}, status=200)
        else:
            return Response({"error": "Failed to report comment"}, status=500)


class ReportedPostListing(APIView):
    def get(self, request):
        reported_posts = list(ReportedPosts.find().sort("created_at", -1))
        serializer = ReportPostSerializer(reported_posts, many=True)
        if serializer.data:
            return Response(data=serializer.data, status=200)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PostRetrieve(APIView):
    def post(self, request):
        post_id = ObjectId(request.data["post"])

        post = post_collection.find_one({"_id": post_id})
        if post:
            post["_id"] = str(post["_id"])
            print("post")
            return Response(data=post, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class PostVerify(APIView):
    def post(self, request):
        print(request.data["r_post"])
        reported_post = ObjectId(request.data["r_post"])
        try:
            ReportedPosts.find_one_and_update(
                {"_id": reported_post}, {"$set": {"verified": True}}
            )
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PostRemove(APIView):
    def post(self, request):
        orginal_post_id = ObjectId(request.data["orginalpost"])
        reported_post = ObjectId(request.data["r_post"])
        try:
            post_collection.find_one_and_update(
                {"_id": orginal_post_id},
                {"$set": {"verified": False}},
            )
            ReportedPosts.find_one_and_update(
                {"_id": reported_post}, {"$set": {"verified": True}}
            )
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class NotificationsList(APIView):
    def get(self, request):
        user_id = request.query_params.get("user_id", None)
        data = list(Notification.find({"user": user_id}).sort("created_at", -1))
        print(user_id)
        serializer = json.dumps(data, default=str)
        
        if serializer:
            return Response(data=serializer, status=status.HTTP_200_OK,content_type="application/json")
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RecommendedPosts(APIView):
    def get(self, request):
        try:
            user_id = request.query_params.get("userid")
            print(user_id)
            posts_data = []
            
            try:
                user = UserChips.find_one({"user": user_id})
                print(user)
                if user:
                    
                    user_chips = user.get("chips", [])
                    print(user_chips)

                    posts_cursor = post_collection.find({"verified": {"$ne": True}}).sort(
                        "created_at", -1
                    )

                    for post in posts_cursor:
                        post["_id"] = str(post["_id"])
                        post_chips = post.get("chips", [])

                        if any(chip in user_chips for chip in post_chips):
                            posts_data.append(post)
            finally:
                posts_cursor = post_collection.find().sort("created_at", -1)
                for post in posts_cursor:
                    post["_id"] = str(post["_id"])
                    try:
                        if post["verified"]:
                            continue
                    except:
                        if post not in posts_data:
                            posts_data.append(post)
                return Response(data=posts_data, status=status.HTTP_200_OK)
            # else:
            #     return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"An error occurred: {e}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PostDelete(APIView):
    def delete(self, request):
        post_id = request.query_params.get("postid")
        print(post_id)
        try:
            if ObjectId.is_valid(post_id):
                selected_post = ObjectId(post_id)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            result = post_collection.delete_one({"_id": selected_post})

            if result.deleted_count == 1:
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

        except PyMongoError as e:
            print(f"Error: {e}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentDelete(APIView):
    def delete(self, request):
        comment_id = request.query_params.get("commentid")
        try:
            if ObjectId.is_valid(comment_id):
                selected_comment = ObjectId(comment_id)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            result = Comments.delete_one({"_id": selected_comment})

            if result.deleted_count == 1:
                return Response(
                    status=status.HTTP_204_NO_CONTENT
                ) 
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

        except PyMongoError as e:
            print(f"Error: {e}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReplyCommentCreate(APIView):
    def post(self, request):
        request.data["created_at"] = datetime.now()
        ReplyComments.insert_one(request.data)
        return Response(status.HTTP_201_CREATED)
    
    
    
class ReplyCommentListing(APIView):
    def get(self, request):
        comment_id = request.query_params.get("id")
        replyed_comments = list(ReplyComments.find({'comment_id': comment_id}))
        serializer = ReplyCommentSerializer(replyed_comments, many=True)
        if serializer.data:
            return Response(data=serializer.data, status=status.HTTP_200_OK )
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



class NotificationsUnreadList(APIView):
    def get(self, request):
        user_id = request.query_params.get("user_id", None)
        data = list(Notification.find({"user": user_id},{'seen':False}).sort("created_at", -1))
        print(user_id)
        serializer = json.dumps(data, default=str)
        result = Notification.update_many({'seen': True}, {'$set': {'seen': False}})
        if serializer:
            return Response(data=serializer, status=status.HTTP_200_OK,content_type="application/json")
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)