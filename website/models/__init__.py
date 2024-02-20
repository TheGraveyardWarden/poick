from website.db import db


def create_collection(collection):
    try:
        db.create_collection(collection)
    except:
        return
    
create_collection("phone")

