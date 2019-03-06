import time


@when(u'User opens pah-fm website')
def step_impl(context):
    context.driver.get('http://localhost:8080/login')


@then(u'User sees "{label}" {type_} field')
def step_impl(context, label, type_):
    input_element = context.driver.find_element_by_xpath("//label[text()='" + label + "']/../input")
    assert input_element.get_attribute('type') == type_


@then(u'User sees "{text}" button')
def step_impl(context, text):
    context.driver.find_element_by_xpath("//button[text()='" + text + "']")


@then(u'User sees three flags: polish, english, ukrainian, in the right side, at top of the page')
def step_impl(context):
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-pl')
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-gb')
    context.driver.find_element_by_css_selector('span.flag-icon.flag-icon-ua')


@given(u'User has account in the system already created by system admin')
def step_impl(context):
    pass


@when(u'User enters "{text}" into "{label}" field')
def step_impl(context, text, label):
    input_element = context.driver.find_element_by_xpath("//label[text()='" + label + "']/../input")
    input_element.click()
    input_element.send_keys(text)


@when(u'User clicks "{text}" button')
def step_impl(context, text):
    context.driver.find_element_by_xpath("//button[text()='" + text + "']").click()


@then(u'User succesfully logs in')
def step_impl(context):
    time.sleep(1)
    assert context.driver.execute_script("return window.localStorage.jwt") is not None


@then(u'User is redirected to homepage')
def step_impl(context):
    time.sleep(1)
    assert context.driver.current_url == 'http://localhost:8080/'
