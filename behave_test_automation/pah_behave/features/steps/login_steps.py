from behave import given, then
from behave.matchers import use_step_matcher

from features.page_objects.login_page import LoginPage

use_step_matcher("re")


@given('User navigates to pah-fm website')
def open_main_url(context):
    page = LoginPage(context.driver)
    page.visit()
    assert "login" in page.get_current_url()


@given('User submits login form with "([^"]*)" login and "([^"]*)" password')
def submit_form_with_valid_credentials(context, login_credential, password_credential):
    page = LoginPage(context.driver)
    page.submit_login_form(login_credential, password_credential)


@then('User is logged in to pah website')
def login_successful(context):
    page = LoginPage(context.driver)
    page.login_successful()
    page.wait_for_url("drive")
    assert context.driver.execute_script("return window.localStorage.jwt") is not None


@then('User failed to login into pah-fm website')
def login_unsuccessful(context):
    page = LoginPage(context.driver)
    page.login_unsuccessful()
    assert "login" in page.get_current_url()


@then('Login button is not clickable')
def login_unsuccessful(context):
    page = LoginPage(context.driver)
    page.disabled_login_button()
    assert "login" in page.get_current_url()


@given('User provides "([^"]*)" login and "([^"]*)" password')
def input_login_data(context, login_credential, password_credential):
    page = LoginPage(context.driver)
    page.input_login_data(login_credential, password_credential)


@then('Translation "([^"]*)" is applied for login view')
def login_view_translation(context, translation):
    page = LoginPage(context.driver)


@given('User logs in to pah-fm system')
def login_to_pah(context):
    page = LoginPage(context.driver)
    page.login_to_pah_website()
