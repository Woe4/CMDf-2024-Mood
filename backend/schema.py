import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType

from models import Mood as MoodModel
from models import User as UserModel

from mutations import *

class Mood(MongoengineObjectType):
    class Meta:
        description = "Meta Mood"
        model = MoodModel
        interfaces = (Node,)

class User(MongoengineObjectType):
    class Meta:
        description = "Meta User"
        model = UserModel
        interfaces = (Node,)
        
class Mutations(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
    update_mood = UpdateMoodMutation.Field()
    delete_user = DeleteUserMutation.Field()
    add_frind = AddFriendMutation.Field()
    delete_friend = DeleteFriendMutation.Field()

class Query(graphene.ObjectType):
	node = Node.Field()
	all_users = MongoengineConnectionField(User)
	user_by_email = graphene.Field(User, email = graphene.String())

	def resolve_user_by_email(parent, info, email):
		return UserModel.objects.get(email=email)

	average_monthly_mood = graphene.Field(graphene.Int, email = graphene.String())

	def resolve_average_monthly_mood(parent, info, email):
		user = graphene.Field(UserType)
		user = UserModel.objects.get(email=email)
		length = 0
		for mood in user.moods:
			length += 1
		if (length < 30):
			sum = 0
			for mood in user.moods:
				sum += mood.positivity
			return sum // length
		else:
			sum = 0
			count = 0
			for mood in user.moods:
				if (length - count <= 30):
					sum += mood.positivity
				count += 1
			return sum // length

	average_weekly_mood = graphene.Field(graphene.Int, email = graphene.String())

	def resolve_average_weekly_mood(parent, info, email):
		user = graphene.Field(UserType)
		user = UserModel.objects.get(email=email)
		length = 0
		for mood in user.moods:
			length += 1
		if (length < 7):
			sum = 0
			for mood in user.moods:
				sum += mood.positivity
			return sum // length
		else:
			sum = 0
			count = 0
			for mood in user.moods:
				if (length - count <= 7):
					sum += mood.positivity
				count += 1
			return sum // length



            
    
all_users_schema = graphene.Schema(query=Query, mutation=Mutations, types=[User])

