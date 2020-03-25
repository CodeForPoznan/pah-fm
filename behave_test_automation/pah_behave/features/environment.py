from selenium import webdriver


def before_all(context):
    context.driver = webdriver.Chrome(
        executable_path='/usr/local/bin/chromedriver'
    )
    context.driver.implicitly_wait(6)


def after_all(context):
    context.driver.quit()
