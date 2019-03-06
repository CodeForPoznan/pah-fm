from selenium import webdriver

def before_all(context):
    context.driver = webdriver.Chrome('./chromedriver')


def after_all(context):
    context.driver.quit()
