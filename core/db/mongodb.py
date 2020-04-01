from pymongo import MongoClient
from config import *
from utils.log import *


class Mongo(object):
    conn = None
    db = None

    @classmethod
    def connect(cls):
        try:
            cls.conn = MongoClient("mongodb://{}:{}/".format(MONGO_HOST, MONGO_PORT),
                                   username=MONGO_USER,
                                   password=MONGO_PASSWORD)
            cls.db = cls.conn[MONGO_NAME]
        except Exception as e:
            log_error('Failed to connect to MongoDB. {}'.format(e))

    @classmethod
    def close(cls):
        try:
            cls.conn.close()
        except Exception as e:
            log_error('Failed to disconnect to MongoDB. {}'.format(e))

    @classmethod
    def insert(cls, collection, document):
        if cls.db is None:
            log_error('Failed to connect to MongoDB.')
            return None

        col = cls.db[collection]
        col.insert_one(document)

    @classmethod
    def insert_bulk(cls, collection, documents):
        if cls.db is None:
            log_error('Failed to connect to MongoDB.')
            return None
        col = cls.db[collection]


Mongo.connect()
