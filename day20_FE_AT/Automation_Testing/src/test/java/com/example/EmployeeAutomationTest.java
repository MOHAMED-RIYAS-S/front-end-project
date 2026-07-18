package com.example;

import com.example.utils.WebDriverFactory;
import com.example.pages.BasePage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Quick-verification test: confirms the automation framework is wired correctly.
 * Requires the employee management app running on http://localhost:5173.
 */
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class EmployeeAutomationTest {

    private static WebDriver driver;
    private static BasePage basePage;

    @BeforeAll
    static void setUp() {
        driver = WebDriverFactory.createDriver("chrome");
        basePage = new BasePage(driver);
        driver.manage().window().maximize();
    }

    @AfterAll
    static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    @Order(1)
    @DisplayName("Framework: WebDriver and BasePage instantiate correctly")
    void frameworkShouldInitialize() {
        assertNotNull(driver, "WebDriver should be initialized");
        assertNotNull(basePage, "BasePage should be initialized");
    }

    @Test
    @Order(2)
    @DisplayName("Framework: Can navigate to the employee management app")
    void shouldNavigateToAppUrl() {
        basePage.navigateTo("http://localhost:5173");
        String url = basePage.getCurrentUrl();
        assertNotNull(url, "Should have navigated to the app");
    }
}
