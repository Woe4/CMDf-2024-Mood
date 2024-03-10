""" app.py """
from flask import Flask
from flask_graphql import GraphQLView
from mongoengine import connect
import os

DATABASE = 'flask-mongodb-graphene'
URI = os.getenv("MONGODB_CONNECT")

client = connect(DATABASE, host=URI, alias='default')
client.admin.command('ping')

app = Flask(__name__)
app.debug = True

# app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run(port=5002)