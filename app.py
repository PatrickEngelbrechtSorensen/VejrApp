from flask import Flask, jsonify, send_from_directory, json

app = Flask(__name__)

def load_forecast():
    with open('forecast_data.json', encoding='utf-8') as f:
        return json.load(f)

@app.route('/forecast')
def forecast():
    return jsonify(load_forecast())

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/main.js')
def main_js():
    return send_from_directory('.', 'main.js')

@app.route('/style.css')
def style_css():
    return send_from_directory('.', 'style.css')

if __name__ == '__main__':
    app.run(debug=True)