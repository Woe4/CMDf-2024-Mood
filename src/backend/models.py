from enum import Enum
from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    ListField,
    ReferenceField,
    StringField,
    IntField,
    BooleanField,
)


class Sentiments(Enum):
    POSITIVE = "POSITIVE"
    NEGATIVE = "NEGATIVE"
    NEUTRAL = "NEUTRAL"

class Mood(Document):
    meta = {"collection": "mood"}
    positivity = IntField()
    sentiment = StringField()
    sentimentword = StringField()
    date = DateTimeField()
    submitted = BooleanField(required=True)

class User(Document):
    meta = {"collection": "user"}
    name = StringField(required=True)
    email = StringField(required=True)
    moods = ListField(ReferenceField(Mood), required=True)


# class Mood(graphene.ObjectType):
#     positivity = graphene.Int
#     sentiment = graphene.Enum
#     date = graphene.DateTime
#     submitted: graphene.Boolean

# class Sentiments(graphene.Enum):
#     JOY = "JOY"
#     CONCERN = "CONCERN"
#     SATISFACTION = "SATISFACTION"
#     DISAPPROVAL = "DISAPPROVAL"


