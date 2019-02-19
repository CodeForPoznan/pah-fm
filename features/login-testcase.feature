Feature: Login view

    Scenario: User opens pah-fm login view
        When User opens pah-fm website
        Then User sees "Username" text field
         And User sees "Password" password field
         And User sees "Login" button
         And User sees three flags: polish, english, ukrainian, in the right side, at top of the page

    # Positive scenario (passing valid login and password)
    Scenario: User logins to pah-fm system
       Given User has account in the system already created by system admin
        When User opens pah-fm website
         And User enters "solomiiavyshniak@eukr.net" into "Username" field
         And User enters "pass123" into "Password" field
         And User clicks "Login" button
        Then User succesfully logs in
         And User is redirected to homepage
