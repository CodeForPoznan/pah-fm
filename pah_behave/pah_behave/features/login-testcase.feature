Feature: Login view
    @skip
    Scenario: User opens pah-fm login view
        When user opens pah-fm website
        Then user sees login view with two text fields: "Username" and "Password" and one button "Login"
         And user sees three flags: polish, english, ukrainian, in the right side, at top of the page

    # Positive scenario (passing valid login and password)
    @skip
    Scenario: User logins to pah-fm system
       Given user has account in the system already created by system admin
        When user opens pah-fm website
         And user enters his email (attached to already created account) into "Username" field
         And user enters his password (attached to already created account) into "Password" field
         And user clicks "Login" button
        Then user succesfully logs in and is redirected to homepage
