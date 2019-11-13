from behave import when, step, then
import features.steps.selectors as selector
from features.steps.common_steps import short_wait


@when('User clicks on hamburger menu')
def hamburger_menu_click(context) -> None:
    hamburger_menu = context.driver.find_element(*selector.hamburger_menu)
    hamburger_menu.click()


@step('User clicks logout button')
def logout_button_click(context) -> None:
    short_wait(context.driver, selector.logout_button)
    logout_button = context.driver.find_element(*selector.logout_button)
    logout_button.click()


@then('User is redirected to the logout view')
def logout_view(context) -> None:
    driver_page = context.driver.current_url
    assert driver_page == 'http://localhost:8080/logout'

    short_wait(context.driver, selector.login_again)


@when('User enters logout url')
def enter_logout_url(context) -> None:
    context.driver.get('http://localhost:8080/logout')
