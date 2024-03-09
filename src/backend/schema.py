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
        

class Query(graphene.ObjectType):
    node = Node.Field()
    all_users = MongoengineConnectionField(User)
    
schema = graphene.Schema(query=Query, types=[User])