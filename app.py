from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

messages = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    user_message = request.json.get("message")
    messages.append({"sender": "You", "text": user_message})

    reply = {"sender": "Bot", "text": "hi"}
    messages.append(reply)
    
    return jsonify(reply)

if __name__ == "__main__":
    app.run(debug=True)
