from firebase_functions import https_fn
from src.handlers.tokyo.setagaya.scraping import Scraping
@https_fn.on_request()
def setagaya_sougou_availability(req: https_fn.Request) -> https_fn.Response:
    "世田谷総合運動場の陸上競技場貸出状況を取得する関数"
    url = "https://www.se-sports.or.jp/facility/sougou/"
    title, body = Scraping(url).execute()
    html = f"""
    <h1>{title}</h1>
    <div>{body}</div>
    """
    return https_fn.Response(html, status=200)