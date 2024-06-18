from flask import Flask, request, jsonify, render_template
import wikipediaapi
import os

app = Flask(__name__)

# Initialize Wikipedia API
wiki_wiki = wikipediaapi.Wikipedia('en')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    input_text = request.json.get("message")
    history = request.json.get("history", [])

    # Fetch summary from Wikipedia
    page = wiki_wiki.page(input_text)
    if page.exists():
        response_text = page.summary[:500] + ("..." if len(page.summary) > 500 else "")
    else:
        response_text = "I couldn't find information on that topic."

    history.append({"user": input_text, "bot": response_text})

    return jsonify({"response": response_text, "history": history})

if __name__ == '__main__':
    app.run(debug=True)