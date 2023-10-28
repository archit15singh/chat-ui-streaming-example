from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_events(input_text):
    event_data = f"received:\n {input_text*100}\n\n"
    for char in event_data:
        yield char.encode('utf-8')

@app.route('/chat', methods=['POST'])
def completion_api():
    data = request.get_json()
    input_text = data['key']
    return Response(generate_events(input_text), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
