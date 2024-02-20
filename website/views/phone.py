from flask import Blueprint, render_template, redirect, url_for, send_file, jsonify, request, Response
from website.db import db
import os
from website.settings import FILES_PATH
import json
from datetime import datetime as dt


def get_best_price(phone):
    best_price = phone["ramRoms"][0]["shops"][0]["price"]
    for t in phone["ramRoms"]:
        for shop in t["shops"]:
            if shop["price"] < best_price:
                best_price = shop["price"]

    return best_price

def response(data, status):
    return Response(response=json.dumps(data), status=status, mimetype="text/plain")

def prepare_series(phone):
    if phone["series"] == "پرچمدار":
        phone["series"] == 2
    elif phone["series"] == "میان رده":
        phone["series"] == 1
    elif phone["series"] == "اقتصادی":
        phone["series"] == 0
    
    return phone

def prepare_date(phone):
    phone["releaseDate"] = phone["releaseDate"].strftime("%Y/%m/%d")

    return phone

def prepare_for_compare(phone):
    phone = prepare_series(phone)
    phone = prepare_date(phone)
    phone["best_price"] = get_best_price(phone)

    return phone


phone = Blueprint("phone", __name__)

@phone.route("/phone/<_id>", methods=["GET"])
def get_by_id(_id):
    phone = db.phone.find_one({"_id": _id})
    if not phone:
        return redirect(url_for("phone.index"))
    
    # this sorts prices
    for idx, _ in enumerate(phone["ramRoms"]): 
        phone["ramRoms"][idx]["shops"].sort(key=lambda x: x["price"])

    # this gets best_price
    best_price = get_best_price(phone)
    
    # this to update views count
    db.phone.update_one({"_id": _id}, {"$set": {"views": phone["views"]+1}})

    return render_template("info.html", phone=phone, best_price=best_price, enumerate=enumerate, type=type, bool=bool)

@phone.route("/", methods=["GET"])
def index():
    favourites = [phone for phone in db.phone.aggregate([
        {"$sort": {"views": -1}},
        {"$limit": 5}
    ])]

    most_rated = [phone for phone in db.phone.aggregate([
        {"$sort": {"rate": -1}},
        {"$limit": 5}
    ])]

    for i, phone in enumerate(most_rated):
        most_rated[i]["best_price"] = get_best_price(phone)
    
    for i, phone in enumerate(favourites):
        favourites[i]["best_price"] = get_best_price(phone)

    return render_template("Home.html", favourites=favourites, most_rated=most_rated)

# @phone.route("/compare", methods=["GET"]) 
# def compare():

#     return render_template("compare.html") # needs to change compare.html for this route...

@phone.route("/compare/<phone_1>/<phone_2>")
def compare_phone(phone_1, phone_2):
    try:
        phone_1 = db.phone.find_one({"_id": phone_1})
        phone_2 = db.phone.find_one({"_id": phone_2})
    except:
        return redirect(url_for("phone.compare"))

    phone_1 = prepare_for_compare(phone_1)
    phone_2 = prepare_for_compare(phone_2)

    return render_template("compare.html", phone_1=phone_1, phone_2=phone_2)

@phone.route("/file/<filename>", methods=["GET"])
def file(filename):
    if os.path.exists(os.path.join(FILES_PATH, filename)):
        return send_file(open(os.path.join(FILES_PATH, filename), "rb"), download_name=filename)
    else:
        return jsonify({"message": "file not found"})

@phone.route("/search", methods=["GET"])
def search():
    q = request.args.get("q", None)

    if not q:
        return response({}, 200)

    phones = [phone for phone in db.phone.aggregate([
        {
            "$match": {
                "$or": [
                    {"nameEN" : {"$regex" : q}},
                    {"nameFA" : {"$regex" : q}}
                ]
            }
        }
    ])]
    
    return response(phones, 200)
