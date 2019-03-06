Feature: Logout

@skip
Scenario: User logs out from pah-fm website using Logout button
   Given User is logged into pah-fm website
    When User clicks on Logout button
    Then User's session details are removed
     And User is redirected to the Login view

@skip
Scenario: User logs out from pah-fm website using URL
   Given User is logged into Ppah-fm website
    When User enters URI '/logout' directly in the address bar
    Then User's session details are removed
     And User is redirected to the Login view
