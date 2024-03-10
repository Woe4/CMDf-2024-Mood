import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType

from models import Mood as MoodModel
from models import User as UserModel

# from mutations import CreateUserMutation
# from mutations import UpdateMoodMutation
# from mutations import DeleteFriendMutation
# from mutations import DeleteUserMutation
# from mutations import AddFriendMutation

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


class NewUserInput(graphene.InputObjectType):
    name = graphene.String()
    email = graphene.String()

class NewMoodInput(graphene.InputObjectType):
    email = graphene.String()
    positivity = graphene.Int()
    sentiment = graphene.String()
    sentimentword = graphene.String()
    date = graphene.DateTime()
    submitted = graphene.Boolean()

class CreateUserMutation(graphene.Mutation):
    user = graphene.Field(User)

    class Arguments:
        user_data = NewUserInput(required=True)

    def mutate(self, info, user_data=None):
        user = UserModel(
            name=user_data.name,
            email = user_data.email,
            moods = [],
            friends = []
        )
        user.save()

        return CreateUserMutation(user=user)

class UpdateMoodMutation(graphene.Mutation):
    user = graphene.Field(User)

    class Arguments:
        mood_data = NewMoodInput(required=True)

    @staticmethod
    def get_user(email):
        return UserModel.objects.get(email=email) # I DONT THINK THIS WORKS

    def mutate(self, info, mood_data=None):
        user = UpdateMoodMutation.get_user(mood_data.email)
        mood = MoodModel(
            positivity=mood_data.positivity,
            sentiment = mood_data.sentiment,
            sentimentword = mood_data.sentimentword,
            date = mood_data.date,
            submitted = mood_data.submitted
        )
        mood.save()
        user.moods.append(mood)
        user.save()

        return CreateUserMutation(user=user)

class DeleteUserMutation(graphene.Mutation):
    class Arguments:
        user_email = graphene.String(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, user_email):
        try:
            UserModel.objects.get(email=user_email).delete()
            success = True
        except:
            success = False

        return CreateUserMutation(success=success)

class AddFriendMutation(graphene.Mutation):
    class Arguments:
        this_user_email = graphene.String(required=True)
        other_user_email = graphene.String(required=True)
        
    success = graphene.Boolean()
    
    def mutate(self, info, this_user_email, other_user_email):
        user = graphene.Field(User)
        user = UserModel.objects.get(email=this_user_email)
        if (UserModel.objects.get(email=this_user_email) and (other_user_email != this_user_email)):
            user.friends.append(other_user_email)
            success = True
        else:
            success = False
        user.save()

        return AddFriendMutation(success=success)

class DeleteFriendMutation(graphene.Mutation):
    class Arguments:
        this_user_email = graphene.String(required=True)
        other_user_email = graphene.String(required=True)
        
    success = graphene.Boolean()
    
    def mutate(self, info, this_user_email, other_user_email):
        user = graphene.Field(User)
        user = UserModel.objects.get(email=this_user_email)
        
        try:
            user.moods.remove(other_user_email)
            success = True
        except:
            success = False

        return DeleteFriendMutation(success=success)
      
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
		user = graphene.Field(User)
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
		user = graphene.Field(User)
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

