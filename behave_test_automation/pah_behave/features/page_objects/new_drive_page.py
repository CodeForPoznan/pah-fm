from time import sleep

from behave_webdriver.driver import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

from features.page_objects.base_page import BasePage


class AddNewDrivePage(BasePage):
    submit_button = (By.CSS_SELECTOR, '.btn-primary')
    passenger_dropdown = (By.CSS_SELECTOR, 'input[type="search"]')
    passenger_dropdown_output = (By.CSS_SELECTOR, 'ul[role="listbox"]')
    drive_added_alert = (By.CSS_SELECTOR, '.alert-success')
    drive_not_verified_alert = (By.CSS_SELECTOR, '.alert-warning')
    drive_errors_alert = (By.CSS_SELECTOR, '.alert-danger')
    signature_text_field = (By.CSS_SELECTOR, '#signature')
    dropdown_toggle = (By.CSS_SELECTOR, 'svg[role="presentation"]')

    def add_new_drive_field(self, name):
        return By.CSS_SELECTOR, f'input[name="{name}"]'

    def add_new_drive_dropdown(self, name):
        return By.CSS_SELECTOR, f'select[name="{name}"]'

    def choose_dropdown_option(self, name):
        return By.XPATH, f'//option[contains(text(), "{name}")]'

    def error_add_new_drive(self, name):
        return By.XPATH, f'//li[contains(text(), "{name} is required")]'

    def first_select_option(self, select_name):
        first_option = Select(self.browser.find_element_by_name(f'{select_name}'))
        first_option.select_by_index(0)

    def submit_add_new_drive_required_fields(self, start_location, starting_mileage,
                                             end_location, end_mileage) -> None:
        self.find_element(*self.add_new_drive_field("startLocation")).send_keys(start_location)
        self.find_element(*self.add_new_drive_field("startMileage")).send_keys(starting_mileage)

        self.first_select_option("project")
        self.first_select_option("car")

        self.find_element(*self.dropdown_toggle).click()
        self.find_element(*self.passenger_dropdown_output).click()

        self.find_element(*self.add_new_drive_field("endLocation")).send_keys(end_location)
        self.find_element(*self.add_new_drive_field("endMileage")).send_keys(end_mileage)
        self.find_element(*self.submit_button).click()

    def get_success_and_warning_alert(self, signature_input):
        self.wait_for_element(self.signature_text_field)
        self.find_element(*self.signature_text_field).send_keys(signature_input)
        self.find_element(*self.submit_button).click()
        self.find_element(*self.drive_added_alert)
        self.find_element(*self.drive_not_verified_alert)

    def show_add_drive_errors(self):
        self.find_element(*self.error_add_new_drive("car"))
        self.find_element(*self.error_add_new_drive("project"))
        self.find_element(*self.error_add_new_drive("start Mileage"))
        self.find_element(*self.error_add_new_drive("end Mileage"))
        self.find_element(*self.error_add_new_drive("start Location"))
        self.find_element(*self.error_add_new_drive("end Location"))
        self.find_element(*self.error_add_new_drive("passenger"))

    def submit_empty_drive_form(self):
        sleep(1)
        self.find_element(*self.submit_button).click()
