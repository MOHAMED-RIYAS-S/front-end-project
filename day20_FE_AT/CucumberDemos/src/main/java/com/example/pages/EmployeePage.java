package com.example.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Page object for the Employee Management application.
 * Provides CRUD operations, search, filter, and pagination support.
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
    private static final By NEXT_PAGE_BTN = By.xpath("//button[contains(text(),'Next')]");
    private static final By PREV_PAGE_BTN = By.xpath("//button[contains(text(),'Prev')]");
    private static final By PAGE_INDICATOR = By.cssSelector("div[style*='padding: 8px 12px']");
    private static final By ROLE_FILTER = By.cssSelector("select");
    private static final By TOTAL_EMPLOYEES = By.cssSelector(".meta-card span");
    private static final By OVERVIEW_TOTAL = By.cssSelector(".overview-card:first-child span");
    private static final By DARK_MODE_BTN = By.xpath("//button[contains(text(),'Dark') or contains(text(),'Light')]");

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

    private WebElement getDrawerNameInput() {
        // The drawer might be visible or the inline form
        List<WebElement> inputs = findElements(NAME_INPUT);
        if (!inputs.isEmpty()) {
            return inputs.get(0);
        }
        return findElement(NAME_INPUT);
    }

    public void fillEmployeeForm(String name, String department, String email,
                                  String mobile, String hiredDate, String role, boolean premium) {
        WebElement nameEl = getDrawerNameInput();
        type(nameEl, name);

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
            if (!cb.isSelected()) {
                jsClick(cb);
            }
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
            WebElement editBtn = card.findElement(By.xpath(".//button[contains(text(),'Edit')]"));
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
            WebElement deleteBtn = card.findElement(By.xpath(".//button[contains(text(),'Delete')]"));
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

    // ========== Bulk Operations ==========

    public void selectEmployeeCheckbox(int cardIndex) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            WebElement card = cards.get(cardIndex);
            WebElement cb = card.findElement(By.cssSelector("input[type='checkbox']"));
            scrollIntoView(cb);
            sleep(200);
            jsClick(cb);
            sleep(300);
        }
    }

    public void clickBulkDelete() {
        By bulkDeleteBtn = By.xpath("//button[contains(text(),'Delete selected')]");
        if (exists(bulkDeleteBtn)) {
            click(bulkDeleteBtn);
            sleep(800);
            try {
                driver.switchTo().alert().accept();
                sleep(1500);
            } catch (Exception ignored) {
            }
        }
    }

    public void clickExportCsv() {
        By exportBtn = By.xpath("//button[contains(text(),'Export CSV')]");
        if (exists(exportBtn)) {
            click(exportBtn);
            sleep(500);
        }
    }

    // ========== Search and Filter ==========

    public void searchEmployee(String query) {
        WebElement search = findElement(SEARCH_INPUT);
        scrollIntoView(search);
        search.clear();
        if (query != null && !query.isEmpty()) {
            search.sendKeys(query);
        }
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

    public void selectRoleFilter(String role) {
        WebElement select = findElement(ROLE_FILTER);
        select.click();
        sleep(200);
        List<WebElement> options = select.findElements(By.tagName("option"));
        for (WebElement opt : options) {
            if (opt.getText().equalsIgnoreCase(role)) {
                opt.click();
                sleep(500);
                return;
            }
        }
    }

    public void selectRoleFilterByIndex(int index) {
        WebElement select = findElement(ROLE_FILTER);
        select.click();
        sleep(200);
        List<WebElement> options = select.findElements(By.tagName("option"));
        if (index < options.size()) {
            options.get(index).click();
            sleep(500);
        }
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

    public List<String> getAllEmployeeNames() {
        return findElements(EMPLOYEE_CARDS).stream()
                .map(card -> card.findElement(By.cssSelector("strong")).getText())
                .collect(Collectors.toList());
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

    public String getEmployeeDepartment(int cardIndex) {
        List<WebElement> cards = findElements(EMPLOYEE_CARDS);
        if (cardIndex < cards.size()) {
            List<WebElement> contactLines = cards.get(cardIndex).findElements(By.cssSelector(".employee-contact div"));
            if (!contactLines.isEmpty()) {
                String text = contactLines.get(0).getText();
                if (!text.contains("@") && !text.contains("-")) {
                    return text;
                }
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

    // ========== Overview / Stats ==========

    public String getTotalEmployeesOverview() {
        try {
            return driver.findElement(OVERVIEW_TOTAL).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getTotalEmployeesMeta() {
        try {
            return driver.findElement(TOTAL_EMPLOYEES).getText();
        } catch (Exception e) {
            return "";
        }
    }

    // ========== Pagination ==========

    public void goToNextPage() {
        click(NEXT_PAGE_BTN);
        sleep(800);
    }

    public void goToPrevPage() {
        click(PREV_PAGE_BTN);
        sleep(800);
    }

    public boolean hasNextPage() {
        try {
            WebElement btn = driver.findElement(NEXT_PAGE_BTN);
            return btn.isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasPrevPage() {
        try {
            WebElement btn = driver.findElement(PREV_PAGE_BTN);
            return btn.isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    public String getPageIndicator() {
        try {
            return driver.findElement(PAGE_INDICATOR).getText();
        } catch (Exception e) {
            return "";
        }
    }

    // ========== Theme ==========

    public void toggleDarkMode() {
        click(DARK_MODE_BTN);
        sleep(500);
    }

    public boolean isDarkModeActive() {
        return driver.findElements(By.cssSelector(".dark-theme")).size() > 0
            || driver.getPageSource().contains("dark-theme");
    }

    // ========== Screenshot ==========

    public byte[] captureScreenshot() {
        return takeScreenshot();
    }
}
