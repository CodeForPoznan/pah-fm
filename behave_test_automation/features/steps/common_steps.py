from behave import given
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
import features.steps.login_view_selectors as login_selector


@given('User opens pah-fm website')
def open_main_url(context):
    context.driver.get('http://localhost:8080/login')

    # wait for languages icons
    context.driver.find_element(*login_selector.ukrainian_language)
    context.driver.find_element(*login_selector.polish_language)
    context.driver.find_element(*login_selector.british_language)


def short_wait(web_driver, selector) -> None:
    """
    Wait for an element to appear in browser. Time value configurable in storage.py
    """

    element_short_wait = expected_conditions.visibility_of_element_located(selector)
    browser_wait = WebDriverWait(web_driver, 10)
    browser_wait.until(element_short_wait)


def medium_wait(web_driver, selector) -> None:
    """
    Wait for an element to appear in browser. Time value configurable in storage.py
    """

    element_medium_wait = expected_conditions.visibility_of_element_located(selector)
    browser_wait = WebDriverWait(web_driver, 15)
    browser_wait.until(element_medium_wait)


def element_clickable(web_driver, selector) -> None:
    """
    Wait for an element to be clickable in browser.
    """

    element_located = expected_conditions.element_to_be_clickable(selector)
    browser_wait = WebDriverWait(web_driver, 5)
    browser_wait.until(element_located)
