Feature: Add New Route
    @skip
    Scenario: User opens pah-fm Add New Route view
       Given user has account in the system already created by system admin
         And user is already logged in
        When user opens "/routes/" view
        Then user sees "Date" - date field dd.mm.rrrr
         And user sees "Choose a car" - dropdown field, single-select only
         And user sees "Description" - text field
         And user sees "From" - text field
         And user sees "Destination" - text field
         And user sees "Starting Mileage" - number field
         And user sees "Ending Mileage" - number field
         And user sees button "Submit"

    # Positive scenario for large displays
    @skip
    Scenario: User adds new route
       Given user has account in the system already created by system admin
         And user is already logged in
         And car exists in the system
        When user opens "/routes/" view
         And user enters "12.01.2019" into "Date" field
         And user chooses car from "Choose a car" field
         And user enters "I'm going to Bangkok" into "Description" field
         And user enters "Poznań" into "From" field
         And user enters "Bangkok" into "Destination" field
         And user enters "1254" into "Starting Mileage" field
         And user enters "12254" into "Ending Mileage" field
         And user clicks "Submit" button
        Then user succesfully add new route
         And user is informed about success
         And user is redirected to "/routes/" view
