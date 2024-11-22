import requests
from bs4 import BeautifulSoup

class Scraping:
    def __init__(self, url):
        self.url = url

    def execute(self):
        # サイトのHTMLを取得
        response = requests.get(self.url)
        res = ""
        if response.status_code == 200:
            html_content = response.text

            # htmlを掬い取る
            soup = BeautifulSoup(html_content, 'html.parser')

            news_list = soup.find('div', class_='news-list')
            if news_list:
                items = news_list.find_all('div', class_='news-item')
                for item in items:
                    date = item.find('div', class_='news-time').text
                    description = item.find('div', class_='news-link').text
                    print(f"Date: {date} - Info: {description}")
                    res = f"Date: {date} - Info: {description}"
            else:
                print("Couldn't find the required section.")
        else:
            print(f"Failed to fetch the webpage. Status code: {response.status_code}")

        return res