import behave
from behave import when, then, given
import time

import features.steps.logout_view_selectors as logout_selector
import features.steps.main_menu_selectors as main_menu_selector
import features.steps.add_new_drive_selectors as add_new_drive_selector

from features.steps.common_steps import short_wait, open_main_url, element_clickable
from features.steps.login_view import input_password, input_username, click_login


@when('User logs out via logout button from main menu')
def click_hamburger_menu(context) -> None:
    short_wait(context.driver, add_new_drive_selector.add_new_drive_title)
    time.sleep(3)
    hamburger_menu = context.driver.find_element(*main_menu_selector.hamburger_menu)
    context.driver.execute_script("arguments[0].click();", hamburger_menu)

    short_wait(context.driver, logout_selector.add_drive)
    short_wait(context.driver, logout_selector.menu_drives)

    short_wait(context.driver, logout_selector.logout_button)
    logout_button = context.driver.find_element(*logout_selector.logout_button)
    logout_button.click()


@then('User is redirected to the logout view')
def logout_view(context) -> None:
    short_wait(context.driver, logout_selector.login_again)
    assert context.driver.execute_script("return window.localStorage.jwt") is None


@when('User enters logout url')
def enter_logout_url(context) -> None:
    context.driver.get('http://localhost:8080/logout')
    assert context.driver.execute_script("return window.localStorage.jwt") is None
    short_wait(context.driver, logout_selector.login_again)


@given('User is logged into pah-fm website')
def logged_in_user(context) -> None:
    open_main_url(context)
    input_username(context, "hello@codeforpoznan.pl")
    input_password(context, "cfp123")
    click_login(context)
