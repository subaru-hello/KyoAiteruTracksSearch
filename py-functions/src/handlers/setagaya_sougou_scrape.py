import requests
from bs4 import BeautifulSoup
from firebase_functions import https_fn
from src.models.scraping import Scraping
# 
@https_fn.on_request()
def scraping(req: https_fn.Request) -> https_fn.Response:
    url = "https://www.se-sports.or.jp/facility/sougou/"
    scraping_result = Scraping(url).execute()
    return https_fn.Response(scraping_result, status=200)