from behave import given, then, register_type
from features.steps.common_actions import short_wait

import features.selectors.login_selectors as login_selector
import features.selectors.base_selectors as base_selector
import parse


@given('User navigates to pah-fm website')
def open_main_url(context):
    context.driver.get('http://localhost:8080/login')
    current_page = context.driver.current_url
    assert current_page == 'http://localhost:8080/login'


@parse.with_pattern(r".*")
def parse_nullable_string(text):
    return text


register_type(NullableString=parse_nullable_string)


@given('User submits login form with "{login_credential:NullableString}" login and "{'
       'password_credential:NullableString}" password')
def submit_form_with_valid_credentials(context, login_credential, password_credential):
    context.login_credential = login_credential
    context.password_credential = password_credential

    username_field = context.driver.find_element(*login_selector.username_field)
    username_field.click()
    username_field.send_keys(login_credential)

    password_field = context.driver.find_element(*login_selector.password_field)
    password_field.click()
    password_field.send_keys(password_credential)

    login_button = context.driver.find_element(*login_selector.login_button_enabled)
    login_button.click()


@then('User is logged in to pah website successfully')
def login_successful(context):
    short_wait(context.driver, base_selector.hamburger_menu)
    assert context.driver.execute_script("return window.localStorage.jwt") is not None
    driver_page = context.driver.current_url
    assert driver_page == 'http://localhost:8080/drive'


@then('User failed to login into pah-fm website')
def login_unsuccessful(context):
    current_page = context.driver.current_url
    assert current_page == 'http://localhost:8080/login'
    short_wait(context.driver, login_selector.login_failed_message)


@then('Login button is not clickable')
def login_unsuccessful(context):
    current_page = context.driver.current_url
    assert current_page == 'http://localhost:8080/login'
    short_wait(context.driver, login_selector.login_button_disabled)
