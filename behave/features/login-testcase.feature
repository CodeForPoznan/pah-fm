Feature: Login view

    @skip
    Scenario: User opens pah-fm login view
        When User opens pah-fm website
        Then User sees login view with two text fields: "Username" and "Password" and one button "Login"
         And User sees three flags: polish, english, ukrainian, in the right side, at top of the page

    # Positive scenario (passing valid login and password)
    @skip
    Scenario: User logins to pah-fm system
       Given User has account in the system already created by system admin
        When User opens pah-fm website
         And User enters his email (attached to already created account) into "Username" field
         And User enters his password (attached to already created account) into "Password" field
         And User clicks "Login" button
        Then User succesfully logs in and is redirected to homepage
