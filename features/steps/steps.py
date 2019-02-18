from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome('./chromedriver')

@when(u'User opens pah-fm website')
def step_impl(context):
    driver.get('http://localhost:8080/login')


@then(u'User sees login view with two text fields: "Username" and "Password" and one button "Login"')
def step_impl(context):
    time.sleep(1)
    driver.find_element_by_name('username')
    driver.find_element_by_name('password')
    driver.find_element_by_css_selector('button.btn.btn-primary')

@then(u'User sees three flags: polish, english, ukrainian, in the right side, at top of the page')
def step_impl(context):
    driver.find_element_by_css_selector('span.flag-icon.flag-icon-pl')
    driver.find_element_by_css_selector('span.flag-icon.flag-icon-gb')
    driver.find_element_by_css_selector('span.flag-icon.flag-icon-ua')
    driver.quit()
