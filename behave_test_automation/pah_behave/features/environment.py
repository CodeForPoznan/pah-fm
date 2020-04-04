from selenium import webdriver

from features.page_objects.logout_page import LogoutPage
from features.page_objects.login_page import LoginPage
from features.page_objects.new_drive_page import AddNewDrivePage
from features.page_objects.confirm_drive_page import ConfirmDrivePage


def before_all(context):
    context.driver = webdriver.Chrome(
        executable_path='/usr/local/bin/chromedriver'
    )
    context.logout_page = LogoutPage(context.driver)
    context.login_page = LoginPage(context.driver)
    context.add_new_drive_page = AddNewDrivePage(context.driver)
    context.confirm_drive_page = ConfirmDrivePage(context.driver)

    context.driver.implicitly_wait(6)


def before_scenario(context, scenario):
    if "skip" in scenario.effective_tags:
        scenario.skip("Marked with @skip")


def after_all(context):
    context.driver.quit()
