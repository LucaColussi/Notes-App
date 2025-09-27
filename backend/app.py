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


if __name__ == "__main__":
    app.run(debug=True)