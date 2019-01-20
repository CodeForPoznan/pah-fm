Feature: logout

Scenario: User logs out from PAH website using Logout button
    Given User is logged into PAH website
    When User clicks on Logout button
    Then User's session details are removed
    And User is redirected to the login screen

Scenario: User logs out from PAH website using URL
    Given User is logged into PAH website
    When User enters URI '/logout' directly in the address bar
    Then User's session details are removed
    And User is redirected to the login screen