from behave import given, then, when
from behave.matchers import use_step_matcher

from features.page_objects.add_new_drive import AddNewDrivePage

use_step_matcher("re")


@when(
    'User submits "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)" and "([^"]*)" '
    'neccessary in add new drive form')
def submit_add_new_drive_required_fields(context, start_location, starting_mileage, project, car, passenger,
                                         end_location, end_mileage) -> None:
    page = AddNewDrivePage(context.driver)
    page.submit_add_new_drive_required_fields(start_location, starting_mileage, project, car, passenger, end_location,
                                              end_mileage)


@then('User sees an errors list')
def show_all_add_drive_errors(context) -> None:
    page = AddNewDrivePage(context.driver)
    page.show_all_add_drive_errors()
