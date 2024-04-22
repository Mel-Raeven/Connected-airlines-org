Feature: Bookings Page
  As a user
  I want to see my bookings
  So that I can manage them efficiently

  Scenario: Display bookings on the page
    Given I visit the bookings page
    When the bookings are loaded
    Then I should see the booking cards displayed
    And the number of booking cards should match the number of bookings returned from the API

  Scenario Outline: Display correct booking information on each card
    Given I visit the bookings page
    When the bookings are loaded
    Then each booking card should display the correct information
    Examples:
      | Booking Name | User ID |
      | Test Booking | 2       |
