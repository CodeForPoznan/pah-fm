from time import sleep

from selenium.webdriver.common.by import By

from features.page_objects.base_page import BasePage


class LogoutPage(BasePage):
    logout_button = (By.CSS_SELECTOR, 'a[href="#"]')
    logout_message = (By.CSS_SELECTOR, '.logout')
    hamburger_menu = (By.CSS_SELECTOR, 'div.bm-burger-button')
    login_link = (By.CSS_SELECTOR, 'a[href="/login"]')
    logout_confirmation_button = (By.CSS_SELECTOR, '.btn-danger')

    def logout_via_logout_button(self):
        self.wait_for_element(self.hamburger_menu)
        sleep(1)
        self.find_element(*self.hamburger_menu).click()
        self.find_element(*self.logout_button).click()
        self.wait_for_element(self.logout_confirmation_button)
        self.find_element(*self.logout_confirmation_button).click()
        self.wait_for_element(self.login_link)

    def logged_out_user_state(self):
        self.wait_for_element(self.logout_message)

    def enter_logout_url(self):
        self.visit()

    def navigate_to_login_via_logout(self):
        self.find_element(*self.login_link).click()
