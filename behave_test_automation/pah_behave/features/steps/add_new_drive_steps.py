from behave import given, then, when
from behave.matchers import use_step_matcher

from features.page_objects.add_new_drive import AddNewDrivePage

use_step_matcher("re")


@when(
    'User submits "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)" and "([^"]*)"')
def submit_add_new_drive_required_fields(context, start_location, starting_mileage, project, car, passenger,
                                         end_location, end_mileage) -> None:
    page = AddNewDrivePage(context.driver)
    page.submit_add_new_drive_required_fields(start_location, starting_mileage, project, car, passenger, end_location,
                                              end_mileage)


@then('User sees a success and warning alert')
def show_success_and_warning_alert(context) -> None:
    page = AddNewDrivePage(context.driver)
    page.get_success_and_warning_alert()


@then('User sees an errors list')
def show_all_add_drive_errors(context) -> None:
    page = AddNewDrivePage(context.driver)
    page.show_add_drive_errors()


@when('User submits empty add new drive form')
def submit_empty_drive_form(context) -> None:
    page = AddNewDrivePage(context.driver)
    page.submit_empty_drive_form()


@then('User sees "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)" alert')
def show_missing_field_alert(context, start_location_alert, starting_mileage_alert, project_alert, car_alert,
                             passenger_alert,
                             end_location_alert, end_mileage_alert) -> None:
    page = AddNewDrivePage(context.driver)
    page.show_missing_field_alert(start_location_alert, starting_mileage_alert, project_alert, car_alert,
                                  passenger_alert,
                                  end_location_alert, end_mileage_alert)
