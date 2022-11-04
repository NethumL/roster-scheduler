from datetime import datetime
from http.server import BaseHTTPRequestHandler

from ortools.sat.python import cp_model


# Example serverless function
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        model = cp_model.CpModel()
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(str(datetime.now().strftime("%Y-%m-%d %H:%M:%S")).encode())
        return
