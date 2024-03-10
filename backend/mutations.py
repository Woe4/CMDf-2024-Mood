import graphene
from models import Mood as MoodModel
from models import User as UserModel
from schema import Mood as MoodType
from schema import User as UserType


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
    user = graphene.Field(UserType)

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
    user = graphene.Field(UserType)

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
        user = graphene.Field(UserType)
        user = UserModel.objects.get(email=this_user_email)
        if (UserModel.objects.get(email=this_user_email) and (other_user_email != this_user_email)):
            user.moods.append(other_user_email)
            success = True
        else:
            success = False

        return AddFriendMutation(success=success)

class DeleteFriendMutation(graphene.Mutation):
    class Arguments:
        this_user_email = graphene.String(required=True)
        other_user_email = graphene.String(required=True)
        
    success = graphene.Boolean()
    
    def mutate(self, info, this_user_email, other_user_email):
        user = graphene.Field(UserType)
        user = UserModel.objects.get(email=this_user_email)
        
        try:
            user.moods.remove(other_user_email)
            success = True
        except:
            success = False

        return DeleteFriendMutation(success=success)
