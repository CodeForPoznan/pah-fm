Feature: Logout view
  In order to be not logged in after login to pah fm website
  As a user
  I want to be able to log out

  Scenario: User logs out via menu Logout button
    Given User is on drive page
    When User logs out via menu Logout button
    Then User is on logout view with removed session details

  Scenario: User logs out from pah-fm website using URL
    Given User is on drive page
    When User enters logout page
    Then User is on logout view with removed session details

  Scenario: User logs in after logout via logout view
    Given User is on drive page
    When User logs out via menu Logout button
    Then User logs in via logout view
