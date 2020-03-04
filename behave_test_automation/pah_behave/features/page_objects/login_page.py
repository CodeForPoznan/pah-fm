from selenium.webdriver.common.by import By
from features.page_objects.base_page import BasePage


class LoginPage(BasePage):
    username_field = (By.CSS_SELECTOR, 'input[name="username"]')
    password_field = (By.CSS_SELECTOR, 'input[name="password"]')
    login_button_enabled = (By.CSS_SELECTOR, '.btn-primary')
    login_button_disabled = (By.CSS_SELECTOR, 'button[disabled="disabled"]')
    login_failed_message = (By.CSS_SELECTOR, '.alert-danger')
    hamburger_menu = (By.CSS_SELECTOR, '.bm-burger-button')

    def submit_login_form(self, login, password):
        self.find_element(*self.username_field).send_keys(login)
        self.find_element(*self.password_field).send_keys(password)
        self.find_element(*self.login_button_enabled).click()

    def login_successful(self):
        self.wait_for_element(self.hamburger_menu)

    def login_unsuccessful(self):
        self.wait_for_element(self.login_failed_message)

    def disabled_login_button(self):
        self.find_element(*self.login_button_disabled)

    def login_to_pah_website(self):
        self.visit()
        assert "login" in self.get_current_url()
        self.find_element(*self.username_field).send_keys("hello@codeforpoznan.pl")
        self.find_element(*self.password_field).send_keys("cfp123")
        self.find_element(*self.login_button_enabled).click()
        self.wait_for_element(self.hamburger_menu)

    def input_login_data(self, login, password):
        self.find_element(*self.username_field).send_keys(login)
        self.find_element(*self.password_field).send_keys(password)
