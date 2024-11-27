from bs4 import BeautifulSoup
from selenium import webdriver
import re
import urllib
import os

base_url = "https://www.city.kawasaki.jp/nakahara"
driver = webdriver.Chrome()
driver.get("https://www.city.kawasaki.jp/nakahara/page/0000088519.html")

content = driver.page_source
soup = BeautifulSoup(content, "html.parser")


save_dir = "track_pdfs"
if save_dir not in os.listdir("./"):
    os.mkdir(save_dir)

for element in soup.findAll(attrs={"class": "mol_attachfileblock"}):
    names = element.findAll("a")
    for name in names:
        pdf_relative_path = name.get("href")
        pdf_path = re.sub(r"^.", base_url, pdf_relative_path)
        file_name = pdf_relative_path.split("/")[-1]
        print(pdf_path)
        urllib.request.urlretrieve(pdf_path, os.path.join(save_dir, file_name))

driver.quit
