package com.example.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;

/**
 * Factory for creating and managing WebDriver instances.
 * Uses WebDriverManager for automatic driver binary management.
 */
public class WebDriverFactory {

    private static WebDriver driver;

    private WebDriverFactory() {
        // utility class
    }

    /**
     * Create a new WebDriver instance for the given browser.
     *
     * @param browser browser name ("chrome" or "firefox")
     * @return configured WebDriver instance
     */
    public static WebDriver createDriver(String browser) {
        if (driver != null) {
            return driver;
        }

        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--remote-allow-origins=*");
                chromeOptions.addArguments("--disable-gpu");
                chromeOptions.addArguments("--no-sandbox");
                chromeOptions.addArguments("--disable-dev-shm-usage");
                driver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                firefoxOptions.addArguments("--headless");
                driver = new FirefoxDriver(firefoxOptions);
                break;

            default:
                throw new IllegalArgumentException("Unsupported browser: " + browser);
        }

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.manage().window().maximize();
        return driver;
    }

    /**
     * Get the current WebDriver instance, creating a Chrome driver if none exists.
     */
    public static WebDriver getDriver() {
        if (driver == null) {
            return createDriver("chrome");
        }
        return driver;
    }

    /**
     * Quit the current WebDriver instance and reset.
     */
    public static void quitDriver() {
        if (driver != null) {
            try {
                driver.quit();
            } catch (Exception ignored) {
            }
            driver = null;
        }
    }
}
