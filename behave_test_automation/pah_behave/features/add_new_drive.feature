Feature: Add new drive view
  In order to be able to add a new drive
  As a user
  I want to submit new drive

  Scenario: User sees field validation errors on add new drive view
     Given User logs in to pah-fm system
      When User submits empty add new drive form
      Then User sees an errors list

  Scenario Outline: User submits a new drive
     Given User logs in to pah-fm system
      When User submits "<start location>", "<starting mileage>", "<project>", "<car>", "<passenger>", "<end location>" and "<ending mileage>"
      Then User sees a success and warning alert
    Examples:
      | start location | starting mileage | project                            | car      | passenger         | end location | ending mileage |
      | Poland         | 100              | Whole officer individual read.     | AA2836HC | Амалія Іваничук   | Ukraina      | 123            |
      | Ukraine        | 1000             | Sound six draw meeting million by. | AC4298MB | Богуслава Бабенко | Poland       | 2000           |

