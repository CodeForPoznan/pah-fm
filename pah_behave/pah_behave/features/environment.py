from selenium import webdriver


def before_all(context):
    context.driver = webdriver.Chrome(
        executable_path='/usr/local/bin/chromedriver'
    )


def before_scenario(context, scenario):
    if 'skip' in scenario.tags:
        scenario.skip()


def after_all(context):
    context.driver.quit()
