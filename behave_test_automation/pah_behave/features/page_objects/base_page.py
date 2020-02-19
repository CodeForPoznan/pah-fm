from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait


class BasePage:
    def __init__(
        self, browser, base_url="http://localhost:8080/login"
    ) -> None:
        self.base_url = base_url
        self.browser = browser
        self.timeout = 30
        
    hamburger_menu = (By.CSS_SELECTOR, '.bm-burger-button')

    def visit(self) -> None:
        self.browser.get(self.base_url)

    def find_element(self, *locator) -> None:
        return self.browser.find_element(*locator)

    def delete_all_cookies(self) -> None:
        self.browser.delete_all_cookies()

    def get_current_url(self) -> None:
        return self.browser.current_url

    def wait_for_element(self, *locator) -> None:
        WebDriverWait(self.browser, 5).until(
            expected_conditions.visibility_of_element_located(*locator)
        )
