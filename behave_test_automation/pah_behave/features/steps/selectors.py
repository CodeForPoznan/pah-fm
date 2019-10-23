from selenium.webdriver.common.by import By

#login view fields
username_field = (By.CSS_SELECTOR, 'input[name="username"]')
password_field = (By.CSS_SELECTOR, 'input[name="password"]')

#login button
login_button_enabled = (By.CSS_SELECTOR, '.btn-primary')

#main_menu
hamburger_menu = (By.CSS_SELECTOR, '.bm-burger-button')
