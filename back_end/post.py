from http.server import BaseHTTPRequestHandler, HTTPServer
import json
data = [
]
class BasicAPI(BaseHTTPRequestHandler):
    def send_data(self, payload, status = 200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def do_POST(self):
        content_size = int(self.headers.get("Content-Length", 0))
        parsed_data = self.rfile.read(content_size)
        post_data = json.loads(parsed_data)
        data.append(post_data) #Saving To a Database
        self.send_data({
            "Message": "Data Received",
            "data": post_data
        })
def run():
    HTTPServer(("localhost", 8000), BasicAPI).serve_forever()
print("Application is running")
run() 