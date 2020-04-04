from behave import when, given, then


@given('User is on drive page')
def login_successful(context):
    context.login_page.login_to_pah_website()
    context.login_page.login_successful()
    assert context.driver.execute_script("return window.localStorage.jwt") is not None


@when('User logs out via menu Logout button')
def logout_via_button(context):
    context.logout_page.logout_via_logout_button()


@then('User is on logout view with removed session details')
def logged_out_user_state(context):
    context.logout_page.logged_out_user_state()
    assert context.driver.execute_script("return window.localStorage.jwt") is None
    assert "drive" not in context.logout_page.get_current_url()


@when('User enters logout page')
def enter_logout_url(context):
    context.logout_page.visit_logout_view()


@then('User logs in via logout view')
def login_via_logout_view(context):
    context.logout_page.navigate_to_login_via_logout()
    context.login_page.login_to_pah_website()
    context.login_page.login_successful()
