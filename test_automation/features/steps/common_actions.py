import features.steps.storage as storage
from behave_webdriver import driver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait


def clear_field(element: WebElement) -> None:
    """Click on given element and erase it's value"""
    element.click()
    element.send_keys(Keys.CONTROL + "a")
    element.send_keys(Keys.BACKSPACE)


def short_wait(web_driver: driver, selector: tuple) -> None:
    """
    Wait for an element to appear in browser. Time value configurable in storage.py
    """

    element_short_wait = expected_conditions.visibility_of_element_located(selector)
    browser_wait = WebDriverWait(web_driver, storage.short_timeout)
    browser_wait.until(element_short_wait)
