from behave import given, then, when
from behave.matchers import use_step_matcher

from features.helpers.decorators import delete_all_cookies

use_step_matcher("re")


@given('User navigates to pah-fm website')
@delete_all_cookies
def open_main_url(context):
    context.login_page.visit()


@given('User submits login form with "([^"]*)" login and "([^"]*)" password')
def submit_form_with_valid_credentials(context, login_credential, password_credential):
    context.login_page.submit_login_form(login_credential, password_credential)


@then('User is logged in to pah website')
def login_successful(context):
    context.login_page.login_successful()
    context.login_page.wait_for_url("drive")


@then('User failed to login into pah-fm website')
def login_unsuccessful(context):
    context.login_page.login_unsuccessful()


@then('Login button is not clickable')
def login_unsuccessful(context):
    context.login_page.disabled_login_button()


@given('User provides "([^"]*)" login and "([^"]*)" password')
def input_login_data(context, login_credential, password_credential):
    context.login_page.input_login_data(login_credential, password_credential)


@given('User logs in to pah-fm system')
def login_to_pah(context):
    context.login_page.login_to_pah_website()


@given('User chooses "([^"]*)"')
def change_language(context, language):
    context.login_page.change_language(language)


@then('User sees "([^"]*)", "([^"]*)", "([^"]*)" and "([^"]*)" translated')
def translation_login_view(context, login_title, username, password, login_button):
    context.login_page.translation_login_view(login_title, username, password, login_button)


@given('User inputs valid credentials in login form')
def input_valid_credentials_to_login_form(context):
    context.login_page.input_valid_credentials_to_login_form()


@when('User switches language to "([^"]*)" and submits form')
def switch_language_and_submit(context, language):
    context.login_page.switch_language_and_submit(language)
