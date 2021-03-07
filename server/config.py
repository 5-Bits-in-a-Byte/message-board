"""
Config file imports environmeant variables
Used to configure the flask app in app.py
"""
import os

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
HS_256_KEY = os.getenv('HS_256_KEY')
MONGO_URI = os.getenv('MONGO_URI')
swagger_config = {
    "headers": [
    ],
    "specs": [
        {
            "endpoint": 'apispec_1',
            "route": '/apispec_1.json',
            "rule_filter": lambda rule: True,  # all in
            "model_filter": lambda tag: True,  # all in
        }
    ],
    "static_url_path": "/flasgger_static",
    # "static_folder": "static",  # must be set by user
    "swagger_ui": True,
    "specs_route": "/apidocs/",
    "title": "Inquire API"
}
CLIENT_URL = os.getenv('CLIENT_URL')
DEFAULT_COLORS = [
    "#dd0000",
    "#dd7700",
    "#eedd00",
    "#00cc00",
    "#2a2aff",
    "#7337ee",
    "#ee55ee",
    "#00cccc",
]
