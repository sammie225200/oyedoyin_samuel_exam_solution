from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
DATA_FILE = 'data.json'

class SimpleAPI(BaseHTTPRequestHandler):
    def do_DELETE(self):
        content_length = int(self.headers.get('Content-Length', 0))
        raw_data = self.rfile.read(content_length)
        data = json.loads(raw_data.decode('utf-8'))

        delete_id = data.get("id")

        file = open(DATA_FILE, 'r')
        items = json.load(file)
        file.close()

        updated_items = []
        for item in items:
            if item.get("id") != delete_id:
                updated_items.append(item)

        file = open(DATA_FILE, 'w')
        json.dump(updated_items, file)
        file.close()

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"message": f"Item with id {delete_id} deleted"}).encode())

def run():
    server = HTTPServer(('localhost', 8000), SimpleAPI)
    print("Server running")
    server.serve_forever()

run()