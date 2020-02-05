  Feature: Login view
    In order to be able to login to pah website
    As a user
    I want to login only via valid credentials

    Background:
       Given User navigates to pah-fm website

    Scenario: User logs in to pah-fm system
       Given User submits login form with "hello@codeforpoznan.pl" login and "cfp123" password
        Then User is logged in to pah website successfully

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
