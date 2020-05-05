from time import sleep

from selenium.webdriver.common.by import By
from selenium.webdriver.support.expected_conditions import staleness_of
from selenium.webdriver.support.wait import WebDriverWait

from features.page_objects.base_page import BasePage


class ConfirmDrivePage(BasePage):
    confirm_drive_menu_item = (By.CSS_SELECTOR, 'a[href="/passenger"]')
    text_input = (By.CSS_SELECTOR, '#hash')
    confirmation_code = (By.CSS_SELECTOR, '#signature')
    confirm_drive_input_error = (By.CSS_SELECTOR, '.alert-danger')

    def wait_for_stale_element(self, locator) -> None:
        WebDriverWait(self.browser, 5).until(staleness_of(locator))

    def navigate_to_confirm_drive(self):
        sleep(1)
        self.find_element(*self.hamburger_menu).click()
        self.page_has_loaded()
        self.find_element(*self.confirm_drive_menu_item).click()

    def submit_confirm_drive(self, user_input) -> None:
        self.find_element(*self.text_input).clear()
        self.find_element(*self.text_input).send_keys(user_input)
        self.find_element(*self.submit_button).click()

    def get_confirmation_code(self) -> None:
        self.find_element(*self.confirmation_code)

    def get_confirm_drive_error(self) -> None:
        self.find_element(*self.confirm_drive_input_error)

    def navigate_back_from_confirmation_code_page(self) -> None:
        self.find_element(*self.text_input).send_keys("123123")
        self.find_element(*self.submit_button).click()
        self.find_element(*self.confirmation_code)
        self.browser.execute_script("window.history.go(-1)")
        self.find_element(*self.text_input)

    def empty_confirm_drive_form(self) -> None:
        self.find_element(*self.submit_button).click()
        self.find_element(*self.confirm_drive_input_error)
