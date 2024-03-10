import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType

from models import Mood as MoodModel
from models import User as UserModel


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
            moods = []
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

class Mutations(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
    update_mood = UpdateMoodMutation.Field()

class Query(graphene.ObjectType):
	node = Node.Field()
	all_users = MongoengineConnectionField(User)
	user_by_email = graphene.Field(User, email = graphene.String())
    
	def resolve_user_by_email(parent, info, email):
		return UserModel.objects.get(email=email)
        
    
all_users_schema = graphene.Schema(query=Query, mutation=Mutations, types=[User])

