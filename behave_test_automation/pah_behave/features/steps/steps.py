import time
from behave import given, then, when
import features.steps.selectors as selector


@when(u'User enters "{text}" into "{label}" field')
def step_impl(context, text, label):
    input_element = context.driver.find_element_by_xpath("//label[text()='" + label + "']/../input")
    input_element.click()
    input_element.send_keys(text)
