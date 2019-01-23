from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def before_all(context):
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-setuid-sandbox')

    context.driver = webdriver.Chrome(chrome_options=chrome_options)


def after_all(context):
    context.driver.quit()
