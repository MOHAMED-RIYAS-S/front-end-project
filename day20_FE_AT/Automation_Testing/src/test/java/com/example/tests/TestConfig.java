package com.example.tests;

/**
 * Configuration values for the Employee Management automation tests.
 * Adjust the base URL to match where the app is running.
 */
public final class TestConfig {

    private TestConfig() {
        // utility class
    }

    /** Base URL of the employee management application */
    public static final String BASE_URL = "http://localhost:5173";

    /** Browser to use: "chrome" or "firefox" */
    public static final String BROWSER = "chrome";

    /** Implicit wait timeout in seconds */
    public static final long IMPLICIT_WAIT = 10;

    /** Page load timeout in seconds */
    public static final long PAGE_LOAD_TIMEOUT = 20;

    /** Screenshots directory */
    public static final String SCREENSHOTS_DIR = "target/screenshots";

    /** Delay between steps for stability (milliseconds) */
    public static final long STEP_DELAY = 500;

    /** Max retry attempts for flaky tests */
    public static final int RETRY_ATTEMPTS = 2;
}
