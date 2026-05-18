# Android Mobile Integration for ZenHealth

This directory contains a complete Android Studio project structure.

## Features
- **Native WebView**: Wraps the ZenHealth web application.
- **Hardware Acceleration**: Enabled for smooth chart and UI transitions.
- **JavaScript & DOM Support**: Fully supports React and Recharts.
- **Automatic Loading**: Points to your deployed web app URL.

## How to use in Android Studio
1. Open **Android Studio**.
2. Select **File > Open**.
3. Navigate to the `android/` directory in this project.
4. Wait for Gradle sync to complete.
5. Click **Run** on your device or emulator.

## Configuration
The App URL is defined in `MainActivity.kt`:
```kotlin
private val appUrl = "https://zenhealth-509796132053.asia-southeast1.run.app"
```
If you deploy to a different URL, update this variable.
