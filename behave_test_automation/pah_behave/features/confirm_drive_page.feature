Feature: Confirm drive
  In order to get reference number
  As a user
  I want to confirmation number

  Background:
    Given User logs in to pah-fm system

  Scenario: User is able to confirm a drive with correct input
    Given User navigates to confirm drive
    When User submits "123123" driver code
    Then User receives confirmation code

  Scenario: User is able to confirm a drive after input correction
    Given User navigates to confirm drive
    And User submits "111" driver code
    When User submits "123123" driver code
    Then User receives confirmation code

  Scenario: User doesn't see driver code when navigating back from confirmation code page
    Given User navigates to confirm drive
    When User submits driver code and navigates back from confirmation code page
    Then User navigates to empty confirm drive form

  Scenario Outline: User is not able to confirm a drive with incorrect input
    Given User navigates to confirm drive
    When User submits "<driver_code>" driver code
    Then User sees confirm drive error message
    Examples:
      | driver_code |
      | scsd        |
      |             |
      | !@#$%^&     |
      | .TEST       |
