from behave import given, then, when
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait


@given(u'User opens pah-fm website')
def step_impl(context):
    context.driver.get('http://localhost:8080/login')


def short_wait(web_driver, selector) -> None:
    """
    Wait for an element to appear in browser. Time value configurable in storage.py
    """

    element_short_wait = expected_conditions.visibility_of_element_located(selector)
    browser_wait = WebDriverWait(web_driver, 10)
    browser_wait.until(element_short_wait)
