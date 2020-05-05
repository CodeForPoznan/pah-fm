from typing import Callable

from behave.runner import Context


def delete_all_cookies(step_func: Callable) -> Callable:
    def wrapper(context: Context) -> Callable:
        context.driver.delete_all_cookies()
        return step_func(context)

    return wrapper
