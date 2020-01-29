Feature: Login view
    In order to be able to login to pah website
    As a user
    I want to login only via valid credentials

    Background:
       Given User navigates to pah-fm website


    Scenario: User successfully logs in to pah-fm system with valid credentials
       Given User submits login form with "hello@codeforpoznan.pl" login and "cfp123" password
        Then User is logged in to pah website successfully


    Scenario Outline: User is not able to login to pah-fm with invalid credentials
       Given User submits login form with "<login>" login and "<password>" password
        Then User not logged into pah-fm website
      Examples:
        | login                  | password |
        |   123                  |    123   |
        | hello@codeforpoznan.pl |          |
        |                        | cfp123   |
