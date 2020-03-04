from selenium.webdriver.common.by import By

from features.page_objects.base_page import BasePage


class AddNewDrivePage(BasePage):
    submit_button = (By.CSS_SELECTOR, '.btn-primary')
    passenger_dropdown = (By.CSS_SELECTOR, 'input[type="search"]')
    passenger_dropdown_output = (By.CSS_SELECTOR, 'ul[role="listbox"]')

    def add_new_drive_field(self, name):
        return By.CSS_SELECTOR, f'input[name="{name}"]'

    def add_new_drive_dropdown(self, name):
        return By.CSS_SELECTOR, f'select[name="{name}"]'

    def choose_dropdown_option(self, name):
        return By.XPATH, f'//option[contains(text(), "{name}")]'

    def error_add_new_drive(self, name):
        return By.XPATH, f'//li[contains(text(), "{name}" + is required)]'

    def submit_add_new_drive_required_fields(self, start_location, starting_mileage, project, car, passenger,
                                             end_location, end_mileage) -> None:
        self.find_element(*self.add_new_drive_field("startLocation")).send_keys(start_location)
        self.find_element(*self.add_new_drive_field("startMileage")).send_keys(starting_mileage)

        self.find_element(*self.add_new_drive_dropdown("project")).click()
        self.find_element(*self.choose_dropdown_option(project)).click()

        self.find_element(*self.add_new_drive_dropdown("car")).click()
        self.find_element(*self.choose_dropdown_option(car)).click()

        self.find_element(*self.passenger_dropdown).send_keys(passenger)
        self.find_element(*self.passenger_dropdown_output).click()

        self.find_element(*self.add_new_drive_field("endLocation")).send_keys(end_location)
        self.find_element(*self.add_new_drive_field("endMileage")).send_keys(end_mileage)

        self.find_element(*self.submit_button).click()

    def show_all_add_drive_errors(self):
        self.find_element(*self.error_add_new_drive("date"))
        self.find_element(*self.error_add_new_drive("car"))
        self.find_element(*self.error_add_new_drive("project"))
        self.find_element(*self.error_add_new_drive("start Mileage"))
        self.find_element(*self.error_add_new_drive("end Mileage"))
        self.find_element(*self.error_add_new_drive("start Location"))
        self.find_element(*self.error_add_new_drive("end Location"))
        self.find_element(*self.error_add_new_drive("passenger"))
