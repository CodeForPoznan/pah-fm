from behave import then, when, step, given
import features.steps.selectors as selector
from features.steps.common_steps import short_wait


@step('User sees "{field_name}"')
def visibility_of_fields(context, field_name) -> None:
    fields = {
        'username_field': selector.username_field,
        'password_field': selector.password_field,
    }

    context.driver.find_element(*fields[field_name])


@step('User sees "{text}" button')
def step_impl(context, text) -> None:
    context.driver.find_element(*selector.login_button_enabled)


@step('User sees three flags: polish, english, ukrainian, in the right side, at top of the page')
def visibility_of_flags(context) -> None:
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-pl')
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-gb')
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-ua')


@step('User inputs "{username}" username')
def input_username(context, username) -> None:
    username_field = context.driver.find_element(*selector.username_field)
    username_field.click()
    username_field.send_keys(username)


@step('User inputs "{password}" password')
def input_password(context, password) -> None:
    password_field = context.driver.find_element(*selector.password_field)
    password_field.click()
    password_field.send_keys(password)


@then("User is logged in successfully")
def new_drive_page(context) -> None:
    short_wait(context.driver, selector.hamburger_menu)
    assert context.driver.execute_script("return window.localStorage.jwt") is not None


@when("User clicks login button")
def click_login(context) -> None:
    login_button_enabled = context.driver.find_element(*selector.login_button_enabled)
    login_button_enabled.click()


@step("User is on add new drive page")
def click_login(context) -> None:
    driver_page = context.driver.current_url
    assert driver_page == 'http://localhost:8080/drive'


@given('User is logged into pah-fm website')
def logged_in_user(context) -> None:
    # This is a step which executes several steps in one
    context.execute_steps("""
        Given User opens pah-fm website
         And User inputs "hello@codeforpoznan.pl" username
         And User inputs "cfp123" password
         When User clicks login button
         Then User is logged in successfully
    """)
