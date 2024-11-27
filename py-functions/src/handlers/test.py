from firebase_functions import https_fn
from src.models.test import Test


# 等々力競技場の個人利用可能状況を取得してR2へJsonを保存するハンドラ
@https_fn.on_request()
def introduction(req: https_fn.Request) -> https_fn.Response:
    you = req.args.get("me")
    age = req.args.get("age")
    introduce_myself = Test(you, age)
    return https_fn.Response(f"{introduce_myself.introduce()}")
