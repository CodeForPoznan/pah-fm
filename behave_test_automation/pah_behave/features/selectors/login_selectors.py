from selenium.webdriver.common.by import By

# login view fields
username_field = (By.CSS_SELECTOR, 'input[name="username"]')
password_field = (By.CSS_SELECTOR, 'input[name="password"]')

# login button
login_button_enabled = (By.CSS_SELECTOR, '.btn-primary')
login_button_disabled = (By.CSS_SELECTOR, 'button[disabled="disabled"]')

# error message
login_failed_message = (By.CSS_SELECTOR, '.alert-danger')
