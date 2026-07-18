package com.example;

public class EmployeeAutomationApp {
    public String getGreeting() {
        return "Employee automation ready";
    }

    public static void main(String[] args) {
        System.out.println(new EmployeeAutomationApp().getGreeting());
    }
}
