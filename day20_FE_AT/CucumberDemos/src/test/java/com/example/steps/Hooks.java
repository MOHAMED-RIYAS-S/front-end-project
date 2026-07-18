package com.example.steps;

import com.example.utils.WebDriverFactory;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

/**
 * Cucumber hooks for WebDriver lifecycle management.
 * Runs before and after each scenario.
 */
public class Hooks {

    @Before
    public void setUp(Scenario scenario) {
        System.out.println(">>> Starting scenario: " + scenario.getName());
        // WebDriver is lazily created in step definitions
    }

    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            System.out.println(">>> Scenario FAILED: " + scenario.getName());
            try {
                byte[] screenshot = ((TakesScreenshot) WebDriverFactory.getDriver())
                    .getScreenshotAs(OutputType.BYTES);
                scenario.attach(screenshot, "image/png", "screenshot-" + scenario.getName());
            } catch (Exception e) {
                System.err.println("Failed to capture screenshot: " + e.getMessage());
            }
        } else {
            System.out.println(">>> Scenario PASSED: " + scenario.getName());
        }

        // Quit browser after each scenario for isolation
        WebDriverFactory.quitDriver();
    }
}
