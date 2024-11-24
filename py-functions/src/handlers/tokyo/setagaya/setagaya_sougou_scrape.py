from firebase_functions import scheduler_fn
from src.handlers.tokyo.setagaya.scraping import Scraping

@scheduler_fn.on_schedule(schedule="* * * * *")
def setagaya_sougou_availability(event: scheduler_fn.ScheduledEvent) -> None:
    "1分ごとに世田谷総合運動場の陸上競技場貸出状況を取得する関数"
    url = "https://www.se-sports.or.jp/facility/sougou/"
    title, body = Scraping(url).execute()
    html = f"""
    <h1>{title}</h1>
    <div>{body}</div>
    """
    print(html)