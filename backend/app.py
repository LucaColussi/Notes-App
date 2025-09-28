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
        if not isCategoryPresent(n, result):
            result.append(n)
    return jsonify(result)


def isCategoryPresent(n, result):
    for tmp in result:
        if tmp["category"] == n["category"]:
            return True
    return False

if __name__ == "__main__":
    app.run(debug=True)
    