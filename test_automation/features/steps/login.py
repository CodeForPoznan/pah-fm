import features.steps.storage as storage
import features.steps.login_selectors as login_selectors

from features.steps.common_actions import short_wait

from behave import given, step, then, when
from behave.runner import Context


@given("I have url")
def get_form_url(context: Context) -> None:
    context.browser.get(storage.form_url)


@given("I am on login page")
def login_page(context: Context) -> None:
    context.browser.find_element(*login_selectors.main_logo)
    context.browser.find_element(*login_selectors.login_body)
    context.browser.find_element(*login_selectors.languages_container)


@step('I input "{username}" username')
def input_username(context: Context, username: str) -> None:
    username_field = context.browser.find_element(*login_selectors.username_field)
    username_field.click()
    username_field.send_keys(username)


@step('I input "{password}" password')
def input_password(context: Context, password: str) -> None:
    password_field = context.browser.find_element(*login_selectors.password_field)
    password_field.click()
    password_field.send_keys(password)


@when("I click login button")
def click_login(context: Context) -> None:
    login_button_enabled = context.browser.find_element(*login_selectors.login_button_enabled)
    login_button_enabled.click()


@then("I am on add new drive page")
def new_drive_page(context: Context) -> None:
    short_wait(context.browser, login_selectors.hamburger_menu)


@then("I see Login unsuccessful error message")
def login_error(context: Context) -> None:
    short_wait(context.browser, login_selectors.login_error)
