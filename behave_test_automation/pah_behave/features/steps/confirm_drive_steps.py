from behave import given, then, when, step
from behave.matchers import use_step_matcher

use_step_matcher("re")


@given('User navigates to confirm drive')
def navigate_to_confirm_drive(context):
    context.confirm_drive_page.navigate_to_confirm_drive()


@step('User submits "([^"]*)" driver code')
def submit_confirm_drive(context, user_input):
    context.confirm_drive_page.submit_confirm_drive(user_input)


@then('User receives confirmation code')
def get_confirmation_code(context):
    context.confirm_drive_page.get_confirmation_code()


@then('User sees confirm drive error message')
def get_confirm_drive_error(context):
    context.confirm_drive_page.get_confirm_drive_error()


@when('User submits driver code and navigates back from confirmation code page')
def navigate_back_from_confirmation_code_page(context):
    context.confirm_drive_page.navigate_back_from_confirmation_code_page()


@then('User navigates to empty confirm drive form')
def empty_confirm_drive_form(context):
    context.confirm_drive_page.empty_confirm_drive_form()
