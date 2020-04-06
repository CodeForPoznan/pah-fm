Feature: Login view
  In order to be able to login to pah website
  As a user
  I want to login only via valid credentials

  Background:
    Given User navigates to pah-fm website

  @skip
  Scenario Outline: User sees language translation
    Given User chooses "<language>"
    Then User sees "<login_title>", "<username>", "<password>" and "<login_button>" translated
    Examples:
      | language | login_title | username          | password | login_button |
      | pl       | Zaloguj     | Nazwa użytkownika | Hasło    | Zaloguj      |
      | gb       | Login       | Username          | Password | Login        |
      | ua       | Логін       | Ім'я користувача  | Пароль   | Логін        |

  @skip
  Scenario: User doesn't loose inputted data when he changes language
    Given User inputs valid credentials in login form
    When User switches language to "ua" and submits form
    Then User is logged in to pah website

  Scenario: User logs in to pah-fm system
    Given User submits login form with "hello@codeforpoznan.pl" login and "cfp123" password
    Then User is logged in to pah website

  Scenario: User is not able to login to pah-fm with invalid credentials
    Given User submits login form with "test_login!" login and "test_password!" password
    Then User failed to login into pah-fm website

  Scenario Outline: Login button is blocked until user fills out all form fields
    Given User submits login form with "<login>" login and "<password>" password
    Then Login button is not clickable
    Examples:
      | login                  | password |
      | hello@codeforpoznan.pl |          |
      |                        | cfp123   |
