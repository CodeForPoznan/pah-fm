from behave import given, then
from behave.matchers import use_step_matcher
from page_objects.login_page import LoginPage

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
    assert context.driver.execute_script("return window.localStorage.jwt") is not None
    assert "drive" in page.get_current_url()


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
