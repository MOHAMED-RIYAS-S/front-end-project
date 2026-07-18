package com.example.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Page object for the Employee Management application.
 * Handles navigation, CRUD operations, searching, and filtering.
 */
public class EmployeePage extends BasePage {

    // --- Locators ---

    private static final By ADD_BUTTON = By.cssSelector("button.add-btn");
    private static final By NAME_INPUT = By.cssSelector("input[name='name']");
    private static final By DEPARTMENT_INPUT = By.cssSelector("input[name='department']");
    private static final By EMAIL_INPUT = By.cssSelector("input[name='email']");
    private static final By MOBILE_INPUT = By.cssSelector("input[name='mobileNo']");
    private static final By HIRED_DATE_INPUT = By.cssSelector("input[name='hiredDate']");
    private static final By ROLE_INPUT = By.cssSelector("input[name='role']");
    private static final By PREMIUM_CHECKBOX = By.cssSelector("input[name='isPremium']");
    private static final By SUBMIT_BUTTON = By.cssSelector("form button[type='submit']");
    private static final By SEARCH_INPUT = By.cssSelector(".search-input input");
    private static final By PREMIUM_FILTER_LABEL = By.xpath("//label[input[@type='checkbox']][contains(.,'Premium')]");
    private static final By EMPLOYEE_CARDS = By.cssSelector(".employee-card");
    private static final By EMPTY_STATE = By.cssSelector(".empty-state");
    private static final By SUCCESS_MESSAGE = By.cssSelector(".status-message.success");
    private static final By ERROR_MESSAGE = By.cssSelector(".status-message.error");
    private static final By NEXT_PAGE = By.xpath("//button[contains(text(),'Next')]");
    private static final By PREV_PAGE = By.xpath("//button[contains(text(),'Prev')]");
    private static final By EDIT_BUTTON = By.xpath(".//button[contains(text(),'Edit')]");
    private static final By DELETE_BUTTON = By.xpath(".//button[contains(text(),'Delete')]");

    public EmployeePage(WebDriver driver) {
        super(driver);
    }

    // ========== Navigation ==========

    public void open() {
        navigateTo("http://localhost:5173");
        sleep(2000);
    }

    public void openUrl(String url) {
        navigateTo(url);
        sleep(2000);
    }

    // ========== Add Employee ==========

    public void clickAddButton() {
        click(ADD_BUTTON);
        sleep(800);
    }

    public void fillEmployeeForm(String name, String department, String email,
                                  String mobile, String hiredDate, String role, boolean premium) {
        type(NAME_INPUT, name);
        type(DEPARTMENT_INPUT, department);
        type(EMAIL_INPUT, email);
        if (mobile != null && !mobile.isEmpty()) {
            type(MOBILE_INPUT, mobile);
        }
        if (hiredDate != null && !hiredDate.isEmpty()) {
            type(HIRED_DATE_INPUT, hiredDate);
        }
        if (role != null && !role.isEmpty()) {
            type(ROLE_INPUT, role);
        }
        if (premium) {
            WebElement cb = findElement(PREMIUM_CHECKBOX);
            scrollIntoView(cb);
            jsClick(cb);
        }
    }

    public void submitForm() {
        WebElement submitBtn = findElement(SUBMIT_BUTTON);
        scrollIntoView(submitBtn);
        sleep(300);
        click(SUBMIT_BUTTON);
        sleep(2000);
    }

    public void addEmployee(String name, String department, String email,
                             String mobile, String hiredDate, String role, boolean premium) {
        clickAddButton();
        fillEmployeeForm(name, department, email, mobile, hiredDate, role, premium);
        submitForm();
    }

    // ========== Edit Employee ==========

    public void editEmployee(int cardIndex, String newName, String newRole) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            WebElement card = cards.get(cardIndex);
            WebElement editBtn = card.findElement(EDIT_BUTTON);
            scrollIntoView(editBtn);
            sleep(300);
            click(editBtn);
            sleep(800);

            WebElement nameInput = findElement(NAME_INPUT);
            nameInput.clear();
            nameInput.sendKeys(newName);

            if (newRole != null && !newRole.isEmpty()) {
                WebElement roleInput = findElement(ROLE_INPUT);
                roleInput.clear();
                roleInput.sendKeys(newRole);
            }

            WebElement submitBtn = findElement(SUBMIT_BUTTON);
            scrollIntoView(submitBtn);
            sleep(300);
            click(SUBMIT_BUTTON);
            sleep(2000);
        }
    }

    // ========== Delete Employee ==========

    public void deleteEmployee(int cardIndex) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            WebElement card = cards.get(cardIndex);
            WebElement deleteBtn = card.findElement(DELETE_BUTTON);
            scrollIntoView(deleteBtn);
            sleep(300);
            click(deleteBtn);
            sleep(800);
            try {
                driver.switchTo().alert().accept();
                sleep(1500);
            } catch (Exception ignored) {
            }
        }
    }

    // ========== Search and Filter ==========

    public void searchEmployee(String query) {
        WebElement search = findElement(SEARCH_INPUT);
        scrollIntoView(search);
        search.clear();
        search.sendKeys(query);
        sleep(800);
    }

    public void clearSearch() {
        WebElement search = findElement(SEARCH_INPUT);
        scrollIntoView(search);
        search.clear();
        sleep(500);
    }

    public void togglePremiumFilter() {
        WebElement label = findElement(PREMIUM_FILTER_LABEL);
        scrollIntoView(label);
        sleep(300);
        click(label);
        sleep(800);
    }

    // ========== Reading Data ==========

    public int getEmployeeCount() {
        return findElements(EMPLOYEE_CARDS).size();
    }

    public String getEmployeeName(int cardIndex) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            return cards.get(cardIndex).findElement(By.cssSelector("strong")).getText();
        }
        return "";
    }

    public String getEmployeeRole(int cardIndex) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            WebElement info = cards.get(cardIndex).findElement(By.cssSelector(".info"));
            return info.getText().replace("—", "").trim();
        }
        return "";
    }

    public boolean isPremiumBadgePresent(int cardIndex) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            return cards.get(cardIndex).findElements(By.cssSelector(".premium-badge")).size() > 0;
        }
        return false;
    }

    public String getEmployeeEmail(int cardIndex) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            List<WebElement> contactLines = cards.get(cardIndex).findElements(By.cssSelector(".employee-contact div"));
            for (WebElement line : contactLines) {
                String text = line.getText();
                if (text.contains("@")) return text;
            }
        }
        return "";
    }

    // ========== Status Checks ==========

    public String getSuccessMessage() {
        try {
            return driver.findElement(SUCCESS_MESSAGE).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getErrorMessage() {
        try {
            return driver.findElement(ERROR_MESSAGE).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isSuccessDisplayed() {
        return isDisplayed(SUCCESS_MESSAGE);
    }

    public boolean isErrorDisplayed() {
        return isDisplayed(ERROR_MESSAGE);
    }

    public boolean isEmptyStateDisplayed() {
        return isDisplayed(EMPTY_STATE);
    }

    // ========== Pagination ==========

    public void goToNextPage() {
        click(NEXT_PAGE);
        sleep(800);
    }

    public void goToPrevPage() {
        click(PREV_PAGE);
        sleep(800);
    }

    // ========== Extra helpers ==========

    public void scrollIntoView(WebElement el) {
        try {
            ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", el);
            sleep(200);
        } catch (Exception ignored) {
        }
    }

    public void jsClick(WebElement el) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", el);
    }
}
