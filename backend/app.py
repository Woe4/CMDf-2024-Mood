""" app.py """
from flask import Flask
from flask_graphql import GraphQLView
from mongoengine import connect
import os

from schema import all_users_schema

DATABASE = 'flask-mongodb-graphene'
URI = os.getenv("MONGODB_CONNECT")

client = connect(DATABASE, host=URI, alias='default')

app = Flask(__name__)
app.debug = True

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=all_users_schema, graphiql=True))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)