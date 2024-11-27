import requests
from bs4 import BeautifulSoup
import logging

logging.basicConfig(level=logging.INFO)


class Scraping:
    TARGET_TEXT = "総合運動場　個人開放"
    KEYWORDS = ["陸上競技", "・陸上"]

    def __init__(self, url):
        self.url = url

    def get_soup(self, url):
        """HTMLを取得してBeautifulSoupオブジェクトを返す"""
        try:
            response = requests.get(url)
            response.raise_for_status()
            return BeautifulSoup(response.text, "html.parser")
        except requests.RequestException as e:
            logging.error(f"ウェブページの取得中にエラーが発生しました: {e}")
            return None

    def get_href(self, url):
        """個人開放のリンクを取得"""
        soup = self.get_soup(url)
        print("個人開放リンク:", url)
        if not soup:
            return None

        news_list = soup.find("div", class_="news-list")
        if not news_list:
            logging.error("指定されたセクション 'news-list' が見つかりません。")
            return None

        for item in news_list.find_all("div", class_="news-item"):
            news_link_div = item.find("div", class_="news-link")
            if not news_link_div:
                continue
            news_link_text = news_link_div.get_text(strip=True)
            if self.TARGET_TEXT in news_link_text:
                a_tag = item.find("a", href=True)
                if a_tag:
                    return a_tag["href"]
        logging.info(f"'{self.TARGET_TEXT}' に一致するリンクが見つかりませんでした。")
        return None

    def get_availability_today(self, url):
        """詳細ページのタイトルと内容を取得"""
        soup = self.get_soup(url)
        if not soup:
            return None, None

        title_tag = soup.find("h1")
        title = (
            title_tag.get_text(strip=True)
            if title_tag
            else "タイトルが見つかりません。"
        )

        content_div = soup.find("div", class_="news-contents")
        if not content_div:
            logging.error("コンテンツのセクション 'news-contents' が見つかりません。")
            return title, "コンテンツが見つかりませんでした。"

        body_text = ""
        for paragraph in content_div.find_all("p"):
            paragraph_content = paragraph.decode_contents().replace("<br/>", "\n")
            for line in paragraph_content.split("\n"):
                clean_line = BeautifulSoup(line, "html.parser").get_text(strip=True)
                if any(keyword in clean_line for keyword in self.KEYWORDS):
                    body_text += clean_line + "\n"

        if not body_text:
            body_text = "該当するコンテンツが見つかりませんでした。"

        return title, body_text

    def execute(self):
        """実行"""
        print("渡されたリンク:", self.url)
        href = self.get_href(self.url)
        if not href:
            logging.error(f"'{self.TARGET_TEXT}' のリンクが見つかりません。")
            return None, None

        absolute_url = (
            href
            if href.startswith("http")
            else f"{self.url.rstrip('/')}/{href.lstrip('/')}"
        )

        title, body = self.get_availability_today(absolute_url)
        logging.info(f"タイトル: {title}\n内容:\n{body}")
        return title, body
