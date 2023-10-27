from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_events():
    while True:
        prompt = request.args.get('prompt')

        event_data = f"data: {prompt}\n\n"
        yield event_data

@app.route('/chat', methods=['GET'])
def chat():
    return Response(generate_events(), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, threaded=True)
