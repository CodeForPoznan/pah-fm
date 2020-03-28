from behave import given, then, when
from behave.matchers import use_step_matcher
from features.page_objects.confirm_drive_page import ConfirmDrivePage

use_step_matcher("re")


@given('User navigates to confirm drive')
def navigate_to_confirm_drive(context):
    page = ConfirmDrivePage(context.driver)
    page.navigate_to_confirm_drive()


@step('User submits "([^"]*)" driver code')
def submit_confirm_drive(context, user_input):
    page = ConfirmDrivePage(context.driver)
    page.submit_confirm_drive(user_input)


@then('User receives confirmation code')
def get_confirmation_code(context):
    page = ConfirmDrivePage(context.driver)
    page.get_confirmation_code()


@then('User sees confirm drive error message')
def get_confirm_drive_error(context):
    page = ConfirmDrivePage(context.driver)
    page.get_confirm_drive_error()


@when('User submits driver code and navigates back from confirmation code page')
def navigate_back_from_confirmation_code_page(context):
    page = ConfirmDrivePage(context.driver)
    page.navigate_back_from_confirmation_code_page()


@then('User navigates to empty confirm drive form')
def empty_confirm_drive_form(context):
    page = ConfirmDrivePage(context.driver)
    page.empty_confirm_drive_form()
