Feature: As a user I want to login

  Background:
    Given I have url

  Scenario: Login via valid credentials
    Given I am on login page
    And I input "hello@codeforpoznan.pl" username
    And I input "cfp123" password
    When I click login button
    Then I am on add new drive page

  Scenario: Login via invalid email and invalid password
    Given I am on login page
    And I input "fake@email.pl" username
    And I input "!@#$%^&*()" password
    When I click login button
    Then I see Login unsuccessful error message

  Scenario: Login via valid email and invalid password
    Given I am on login page
    And I input "hello@codeforpoznan.pl" username
    And I input "fakeP@ssword!" password
    When I click login button
    Then I see Login unsuccessful error message

  Scenario: Login via empty email and password values
    Given I am on login page
    And I input " " username
    And I input " " password
    When I click login button
    Then I see Login unsuccessful error message
