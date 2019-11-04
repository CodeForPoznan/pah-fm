Feature: Login view

    Background:
      Given User opens pah-fm website

    Scenario: User opens pah-fm login view
       And User sees "username_field"
       And User sees "password_field"
       And User sees "Login" button
       And User sees three flags: polish, english, ukrainian, in the right side, at top of the page

    # Positive scenario (passing valid login and password)
    Scenario: User successfully logs in to pah-fm system with valid credentials
      And User inputs "hello@codeforpoznan.pl" username
      And User inputs "cfp123" password
      When User clicks login button
      Then User is logged in successfully
      And User is on add new drive page
