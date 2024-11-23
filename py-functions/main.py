# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app
from src.handlers.addmessage import addmessage
from src.handlers.makeuppercase import makeuppercase
from src.handlers.test import introduction
from src.handlers.tokyo.setagaya.setagaya_sougou_scrape import setagaya_sougou_availability

initialize_app()

@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")

# 各functionsを呼び出す
addmessage
makeuppercase
introduction
setagaya_sougou_availability