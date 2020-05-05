from behave import then, when


@when(
    'User submits "{start_location}", "{start_mileage}", "{end_location}" and "{end_mileage}"')
def submit_add_new_drive_required_fields(context, start_location, start_mileage,
                                         end_location, end_mileage) -> None:
    context.add_new_drive_page.submit_add_new_drive_required_fields(
        start_location,
        start_mileage,
        end_location,
        end_mileage
    )


@then('User submits "{signature_input}" signature')
def show_success_and_warning_alert(context, signature_input) -> None:
    context.add_new_drive_page.get_success_and_warning_alert(signature_input)


@then('User sees an errors list')
def show_all_add_drive_errors(context) -> None:
    context.add_new_drive_page.show_add_drive_errors()


@when('User submits empty add new drive form')
def submit_empty_drive_form(context) -> None:
    context.add_new_drive_page.submit_empty_drive_form()
