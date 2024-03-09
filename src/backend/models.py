import datetime
from enum import Enum
import graphene
from mongoengine import Document, EmbeddedDocument
from mongoengine.fields import (
    DateTimeField,
    ListField,
    ReferenceField,
    StringField,
    IntField,
    BooleanField,
    EnumField
)


class PositiveSentiments(Enum):
    JOY = "JOY"
    SATISFACTION = "SATISFACTION"

class NegativeSentiments(Enum):
    DISAPPROVAL = "DISAPPROVAL"

class NeutralSentiments(Enum):
    CONCERN = "CONCERN"

class Sentiments(Enum):
    positive = EnumField(PositiveSentiments)
    negative = EnumField(NegativeSentiments)
    neutral = EnumField(NeutralSentiments)

class Mood(Document):
    meta = {"collection": "mood"}
    positivity = IntField()
    sentiment = EnumField(Sentiments, choices = [Sentiments.positive, Sentiments.negative, Sentiments.neutral])
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


