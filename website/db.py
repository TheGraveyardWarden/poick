import pymongo
import sys


try:
    mongo_client = pymongo.MongoClient(
        host="localhost",
        port=27017
    )
except:
    print("Couldn\'t connect to database.")
    sys.exit(1)

db = mongo_client.poick

from .models import *