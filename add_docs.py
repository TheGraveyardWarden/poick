from pymongo import MongoClient
import sys
import json
import codecs
from datetime import datetime as dt


def prepare_phone(phone):
    phone["views"] = 0

    year, month, day = phone["releaseDate"].split("-")
    phone["releaseDate"] = dt(int(year), int(month), int(day))

    phone["_id"] = ""
    for i in phone["nameEN"].split(" "):
        phone["_id"] += i
    
    tmp = 0
    n = 0
    for detail in phone["details"]:
        if detail == "others":
            continue
        tmp += phone["details"][detail]["rate"]
        n += 1
    phone["rate"] = int(tmp/n)

    return phone

def find_most_rated(phones):
    tmp = 0
    tmp_i = 0
    for i, phone in enumerate(phones):
        if phone["rate"] > tmp:
            tmp = phone["rate"]
            tmp_i = i
    
    phones[tmp_i]["tags"] = ["websiteRecommendedPhone"]

    return phones
    
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("[-] Usage: add_phone.py collection_name path/to/data")
        sys.exit(1)

    coll = sys.argv[1]
    file = sys.argv[2]

    try:
        client = MongoClient(host="127.0.0.1", port=27017)
    except:
        print("[-] Can\'t connect to db")
        sys.exit(1)

    db = client.poick

    print("[+] Connected to db")
    print("[+} Reading file...")

    with codecs.open(file, "r", encoding="utf-8") as f:
        data = json.loads(f.read())
    
    if coll == "phone":
        for d in data:
            d = prepare_phone(d)
        data = find_most_rated(data)

    success = 0
    failed = 0
    print("[+] Inserting objects...")
    for d in data:
        try:
            inserted_id = db[coll].insert_one(d).inserted_id
            print(f"[+] Object inserted with id {inserted_id}")
            success += 1
        except Exception as e:
            print(f"[-] Can\'t insert object {str(e)}")
            failed += 1
    
    print(f"[+] Insertion finished\nsuccess: {success}\tfailed: {failed}")
