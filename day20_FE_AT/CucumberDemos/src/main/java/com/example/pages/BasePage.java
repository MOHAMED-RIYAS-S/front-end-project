package com.example.pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

/**
 * Base page class providing common WebDriver utilities for all page objects.
 */
public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected WebDriverWait shortWait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        this.shortWait = new WebDriverWait(driver, Duration.ofSeconds(5));
        PageFactory.initElements(driver, this);
    }

    /** Navigate to a URL */
    public void navigateTo(String url) {
        driver.get(url);
    }

    /** Get current page URL */
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    /** Get page title */
    public String getTitle() {
        return driver.getTitle();
    }

    /** Click an element identified by locator */
    public void click(By locator) {
        WebElement el = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        scrollIntoView(el);
        wait.until(ExpectedConditions.elementToBeClickable(locator));
        try {
            el.click();
        } catch (ElementClickInterceptedException e) {
            jsClick(el);
        }
    }

    /** Click a WebElement directly */
    public void click(WebElement el) {
        scrollIntoView(el);
        wait.until(ExpectedConditions.elementToBeClickable(el));
        try {
            el.click();
        } catch (ElementClickInterceptedException e) {
            jsClick(el);
        }
    }

    /** Type text into an input field */
    public void type(By locator, String text) {
        WebElement el = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        scrollIntoView(el);
        el.clear();
        if (text != null) {
            el.sendKeys(text);
        }
    }

    /** Type text into a WebElement input */
    public void type(WebElement el, String text) {
        scrollIntoView(el);
        wait.until(ExpectedConditions.visibilityOf(el));
        el.clear();
        if (text != null) {
            el.sendKeys(text);
        }
    }

    /** Get text from an element */
    public String getText(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).getText();
    }

    /** Check if an element is displayed */
    public boolean isDisplayed(By locator) {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).isDisplayed();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }

    /** Check if an element exists in the DOM */
    public boolean exists(By locator) {
        try {
            return driver.findElements(locator).size() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    /** Take a screenshot */
    public byte[] takeScreenshot() {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }

    /** Pause execution */
    public void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /** Refresh the current page */
    public void refresh() {
        driver.navigate().refresh();
    }

    /** Find a single element */
    public WebElement findElement(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    /** Find all matching elements */
    public List<WebElement> findElements(By locator) {
        return driver.findElements(locator);
    }

    // ========== Helpers ==========

    protected void scrollIntoView(WebElement el) {
        try {
            ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", el);
            sleep(200);
        } catch (Exception ignored) {
        }
    }

    protected void jsClick(WebElement el) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", el);
    }
}
