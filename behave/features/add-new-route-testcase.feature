Feature: Add New Route

    @skip
    Scenario: User opens pah-fm Add New Route view
       Given User has account in the system already created by system admin
         And User is already logged in
        When User opens "/routes/" view
        Then User sees "Date" - date field dd.mm.rrrr
         And User sees "Choose a car" - dropdown field, single-select only
         And User sees "Description" - text field
         And User sees "From" - text field
         And User sees "Destination" - text field
         And User sees "Starting Mileage" - number field
         And User sees "Ending Mileage" - number field
         And User sees button "Submit"

    # Positive scenario for large displays
    @skip
    Scenario: User adds new route
       Given User has account in the system already created by system admin
         And User is already logged in
         And Car exists in the system
        When User opens "/routes/" view
         And User enters "12.01.2019" into "Date" field
         And User chooses car from "Choose a car" field
         And User enters "I'm going to Bangkok" into "Description" field
         And User enters "Poznań" into "From" field
         And User enters "Bangkok" into "Destination" field
         And User enters "1254" into "Starting Mileage" field
         And User enters "12254" into "Ending Mileage" field
         And User clicks "Submit" button
        Then User succesfully add new route
         And User is informed about success
         And User is redirected to "/routes/" view
