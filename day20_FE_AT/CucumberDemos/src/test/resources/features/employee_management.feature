Feature: Employee Management CRUD Operations
  As an HR administrator
  I want to manage employee records
  So that I can maintain an organized team directory

  Background:
    Given I am on the Employee Management application page

  @TC-CRUD-01
  Scenario: Add a new employee with all fields
    When I click the "Add Candidate" button
    And I fill in the employee form with:
      | field     | value            |
      | name      | Alice Johnson    |
      | department| Engineering      |
      | email     | alice@example.com|
      | mobile    | 555-0101         |
      | hiredDate | 2026-07-17       |
      | role      | Senior Developer |
      | premium   | true             |
    And I submit the employee form
    Then a success message should be displayed
    And the employee count should increase

  @TC-CRUD-02
  Scenario: Add a new employee without premium
    When I click the "Add Candidate" button
    And I fill in the employee form with:
      | field     | value            |
      | name      | Bob Smith        |
      | department| Marketing        |
      | email     | bob@example.com  |
      | mobile    | 555-0202         |
      | role      | Marketer         |
    And I submit the employee form
    Then a success message should be displayed

  @TC-CRUD-03
  Scenario: View employee details in the directory
    Given there are employees in the directory
    Then employee cards should be visible
    And each employee card should display name and role

  @TC-CRUD-04
  Scenario: Search employees by name
    When I search for "alice"
    Then the results should match the search query

  @TC-CRUD-05
  Scenario: Search employees by email domain
    When I search for "@example.com"
    Then at least one employee should be visible

  @TC-CRUD-06
  Scenario: Search with non-matching query shows empty state
    When I search for "zzzzNonExistentQuery"
    Then the empty state should be displayed
    And no employee cards should be visible

  @TC-CRUD-07
  Scenario: Filter employees by premium status
    Given there are employees in the directory
    When I toggle the premium filter
    Then only premium employees should be shown

  @TC-CRUD-08
  Scenario: Edit an employee's details
    Given there is at least one employee in the directory
    When I edit the first employee's name to "Updated Name"
    And I edit the first employee's role to "Updated Role"
    Then a success message should be displayed

  @TC-CRUD-09
  Scenario: Delete an employee
    Given there is at least one employee in the directory
    When I delete the first employee
    Then the employee count should decrease

  @TC-CRUD-10
  Scenario: Overview statistics are displayed
    Then the total employees overview should be visible
    And the premium members count should be visible
    And the departments count should be visible

  @TC-CRUD-11
  Scenario: Toggle dark mode
    When I toggle dark mode
    Then the theme should switch
    When I toggle dark mode again
    Then the theme should switch back

  @TC-CRUD-12
  Scenario: Navigate pagination controls
    Given there are employees in the directory
    When pagination controls are visible
    Then I can navigate between pages

  @TC-CRUD-13
  Scenario: Bulk delete employees
    Given there are multiple employees in the directory
    When I select the first employee checkbox
    And I click "Delete selected"
    Then the selected employee should be removed

  @TC-CRUD-14
  Scenario: Export employees to CSV
    Given there are employees in the directory
    When I click "Export CSV"
    Then the CSV export should be triggered

  @TC-CRUD-15
  Scenario: Verify employee card contains contact information
    Given there are employees in the directory
    Then each employee card should show email
    And each employee card should show department
