import behave_webdriver
import features.steps.storage as storage
from behave.runner import Context
from selenium.webdriver.chrome.webdriver import Options

AVAILABLE_BROWSERS = {
    "chrome": behave_webdriver.Chrome,
    "chrome_headless": behave_webdriver.Chrome.headless,
    "ie": behave_webdriver.Ie,
    "edge": behave_webdriver.Edge,
}


class InvalidBrowserError(Exception):
    """"Raised when string doesn't match available_browsers keys"""

    def __init__(self, message="Invalid browser choice"):
        super().__init__(message)


def before_all(context: Context) -> None:
    """Before test execution the browser choice from behave.ini is matched"""

    config_userdata = context.config.userdata
    browser = config_userdata["browser"].lower()

    if "chrome" in browser:
        opts = Options()
        opts.add_argument("--window-size=1366,768")
        if "headless" in browser:
            opts.add_argument("--headless")
            opts.add_argument("--disable-gpu")
            opts.add_argument("--no-sandbox")
            opts.add_argument("--disable-dev-shm-usage")
            opts.add_argument("--start-maximized")
            opts.add_experimental_option(
                "w3c", False
            )  # Added to avoid UnknownCommandError raised by chromedriver
        context.browser = behave_webdriver.Chrome(chrome_options=opts)
    else:
        try:
            context.browser = AVAILABLE_BROWSERS[browser]()
        except KeyError:
            raise InvalidBrowserError

    short_timeout = config_userdata.get("short_timeout")
    if short_timeout is not None:
        storage.short_timeout = int(short_timeout)
    medium_timeout = config_userdata.get("medium_timeout")
    if medium_timeout is not None:
        storage.medium_timeout = int(medium_timeout)
    long_timeout = config_userdata.get("long_timeout")
    if long_timeout is not None:
        storage.long_timeout = int(long_timeout)

    storage.form_url = config_userdata["form_url"]


def after_all(context: Context) -> None:
    """When test execution of all scenarios is finished, the browser will be closed."""
    context.browser.close()
