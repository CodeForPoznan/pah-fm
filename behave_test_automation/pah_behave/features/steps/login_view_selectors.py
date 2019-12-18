from selenium.webdriver.common.by import By

# fields
username_field = (By.CSS_SELECTOR, 'input[name="username"]')
password_field = (By.CSS_SELECTOR, 'input[name="password"]')

# buttons
login_button_enabled = (By.CSS_SELECTOR, '.btn-primary')

# languages
polish_language = (By.CSS_SELECTOR, '.flag-icon-pl')
ukrainian_language = (By.CSS_SELECTOR, '.flag-icon-ua')
british_language = (By.CSS_SELECTOR, '.flag-icon-gb')
