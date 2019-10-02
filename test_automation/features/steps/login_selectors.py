from selenium.webdriver.common.by import By

# # LOGIN
# login elements
main_logo = (By.CSS_SELECTOR, '.logo')
login_body = (By.CSS_SELECTOR, '.login-form')
languages_container = (By.CSS_SELECTOR, '.lang')

#login view fields
username_field = (By.CSS_SELECTOR, 'input[name="username"]')
password_field = (By.CSS_SELECTOR, 'input[name="password"]')

#login button
login_button_enabled = (By.CSS_SELECTOR, '.btn-primary')

#login error message
login_error = (By.CSS_SELECTOR, '.alert-danger')

# #ADD NEW DRIVE
#new drive buttons
hamburger_menu = (By.CSS_SELECTOR, '.bm-burger-button')
