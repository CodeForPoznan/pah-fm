Feature: Logout

    Background:
        Given User is logged into pah-fm website

    Scenario: User logs out from pah-fm website using Logout button
        When User logs out via logout button from main menu
        Then User is redirected to the logout view

    Scenario: User logs out from pah-fm website using URL
        When User enters logout url
        Then User is redirected to the logout view
