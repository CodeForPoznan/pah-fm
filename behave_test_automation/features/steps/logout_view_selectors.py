from selenium.webdriver.common.by import By

# main_menu
hamburger_menu = (By.CSS_SELECTOR, '.bm-burger-button')
add_drive = (By.CSS_SELECTOR, 'a[href="/drive"]')
menu_drives = (By.CSS_SELECTOR, 'a[href="/drives"]')

# logout view
logout_button = (By.CSS_SELECTOR, 'a[href="/logout"]')
login_again = (By.CSS_SELECTOR, 'a[href="/login"]')
