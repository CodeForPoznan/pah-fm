import parse
from behave import given, then, register_type
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
import features.steps.selectors as selector


@given('User navigates to pah-fm website')
def open_main_url(context):
    context.driver.get('http://localhost:8080/login')
    context.driver.find_element(*selector.login_button_enabled)

    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-pl')
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-gb')
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-ua')


@parse.with_pattern(r".*")
def parse_nullable_string(text):
    return text


register_type(NullableString=parse_nullable_string)


@given('User submits login form with "{login_credential:NullableString}" login and "{'
       'password_credential:NullableString}" password')
def submit_form_with_valid_credentials(context, login_credential, password_credential):
    context.login_credential = login_credential
    context.password_credential = password_credential

    username_field = context.driver.find_element(*selector.username_field)
    username_field.click()
    username_field.send_keys(login_credential)

    password_field = context.driver.find_element(*selector.password_field)
    password_field.click()
    password_field.send_keys(password_credential)

    login_button = context.driver.find_element(*selector.login_button_enabled)
    login_button.click()


@then('User is logged in to pah website successfully')
def successful_login(context):
    short_wait(context.driver, selector.hamburger_menu)
    assert context.driver.execute_script("return window.localStorage.jwt") is not None
    driver_page = context.driver.current_url
    assert driver_page == 'http://localhost:8080/drive'


def short_wait(web_driver, selector) -> None:
    """
    Wait for an element to appear in browser. Time value configurable in storage.py
    """
    element_short_wait = expected_conditions.visibility_of_element_located(selector)
    browser_wait = WebDriverWait(web_driver, 10)
    browser_wait.until(element_short_wait)


@then('User not logged into pah-fm website')
def unsuccessful_login(context):
    current_page = context.driver.current_url
    assert current_page == 'http://localhost:8080/login'
