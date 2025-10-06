import uuid
from flask import Flask, jsonify, request, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def load_notes():
    with open("notes.json", "r", encoding="utf-8") as f:
        return json.load(f)
    
def save_notes(note):
    with open("notes.json", "w", encoding="utf-8") as f:
        json.dump(note, f, ensure_ascii=False, indent=2)

@app.route("/notes", methods=["GET"])
def get_notes():
    return jsonify(load_notes())

@app.route("/notes/category", methods=["GET"])
def get_notes_categories():
    notes = load_notes()
    result = [];
    for n in notes:
        if not isCategoryPresent(n["category"], result):
            result.append(n)
    return jsonify(result)

def isCategoryPresent(n, result):
    for tmp in result:
        if tmp["category"].upper() == n.upper():
            return True
    return False

@app.route("/notes/category/<category>", methods=["GET"])
def get_notes_by_category(category):
    notes = load_notes()    # devo aggiungere in result quando n == category
    result = [];
    for n in notes:
        if category.upper() == n["category"].upper():
            result.append(n)
    return jsonify(result)

@app.route("/notes", methods=["POST"])
def add_note():
    data = request.get_json() # prendo json inviato dal frontend
    notes = load_notes()
    new_note = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "body": data["body"],
        "category": data["category"]
    }
    notes.append(new_note);
    save_notes(notes)
    return jsonify(new_note), 201

@app.route("/notes/editor", methods=["POST"])
def modify_note():
    data = request.get_json() # prendo json inviato dal frontend
    notes = load_notes()
    for n in notes:
        if n["id"] == data["id"]:
            n["body"] = data["body"]
    save_notes(notes)
    return jsonify(notes), 201

if __name__ == "__main__":
    app.run(debug=True)
    