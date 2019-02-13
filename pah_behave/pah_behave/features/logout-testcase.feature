Feature: Logout
    @skip
    Scenario: User logs out from pah-fm website using Logout button
       Given user is logged into pah-fm website
        When user clicks on Logout button
        Then user's session details are removed
         And user is redirected to the Login view

    @skip
    Scenario: User logs out from pah-fm website using URL
       Given user is logged into Ppah-fm website
        When user enters URI '/logout' directly in the address bar
        Then user's session details are removed
         And user is redirected to the Login view
