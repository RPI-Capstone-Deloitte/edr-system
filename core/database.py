from pymongo import MongoClient
from config import *
import sys


class database(object):
    
    @classmethod
    def connect(cls):
        try:
            cls.conn = MongoClient("mongodb://{}:{}/".format(DB_HOST, DB_PORT),
                                    username=DB_USER,
                                    password=DB_PASSWORD)
            cls.db = cls.conn[DB_NAME]
        except Exception as e:
            print('-' * 50, file=sys.stderr)
            print(e, file=sys.stderr)
            print('-' * 50, file=sys.stderr)
            print("Fail to connect to database.", file=sys.stderr)
            
            
    @classmethod
    def close(cls):
        try:
            cls.conn.close()
        except Exception as e:
            print('-' * 50, file=sys.stderr)
            print(e, file=sys.stderr)
            print('-' * 50, file=sys.stderr)
            print("Fail to disconnect to database.", file=sys.stderr)
        
        
    @classmethod
    def insert(cls, collection, document):
        col = cls.db[collection]
        col.insert_one(document)
        