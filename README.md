# 📋 Professional Research Questionnaire System

A modern, multi-page, password-protected questionnaire system built for researchers. Responses are automatically captured in a Google Sheet with a unique submission ID and timestamp.

## ✨ Key Features

- **3-Page Wizard**: Improved user experience with a logical step-by-step flow.
- **Dynamic Google Sheets Integration**: The backend automatically detects new questions and adds columns to your sheet—no script editing required when adding/removing questions!
- **Unique Entry Tracking**: Every submission gets a unique ID and a precise ISO timestamp.
- **Password Protected**: Simple client-side security to restrict access.
- **Progress Tracking**: Real-time progress bar shows completion status.
- **Rich Question Types**: Support for Radio buttons, Checkboxes (multi-select), Select dropdowns, and Number inputs.
- **Mobile Responsive**: Works perfectly on phones, tablets, and desktops.

---

## 🚀 Quick Setup Guide

### 1. Google Sheet Setup
1. Create a new Google Sheet.
2. Name the first tab **`Responses`**.
3. Copy the **Spreadsheet ID** from the URL (the long string between `/d/` and `/edit`).

### 2. Google Apps Script Setup
1. In your sheet, go to **Extensions > Apps Script**.
2. Replace everything in the editor with the code from `google-script.js`.
3. Paste your **Spreadsheet ID** on line 5: `const SHEET_ID = '...';`.
4. Click **Deploy > New Deployment**.
5. Select **Web App**.
6. Set "Execute as" to **Me** and "Who has access" to **Anyone**.
7. Copy the **Web App URL**.

### 3. Frontend Configuration
1. Open `index.html`.
2. Find the `GOOGLE_SCRIPT_URL` at the bottom and paste your Web App URL.
3. (Optional) Customize the `CORRECT_PASSWORD` on the next line.

---

## 🛠️ Customization

### Adding New Questions
You can add questions directly to `index.html`. 
- **Wait!** You don't need to change the script! The script is "dynamic." It will see the `name="..."` attribute on your new HTML input and automatically create a column for it in your Google Sheet the first time someone submits.

### Page Navigation
The form is divided into `<div id="page1">`, `<div id="page2">`, etc. You can easily add a `page4` by following the existing structure and updating the `updateProgress` function in the script.

---

## 📊 Data Management

- All responses appear in real-time in your Google Sheet.
- **Checkbox Data**: Multiple selections are automatically joined by commas (e.g., "Netflix, Hulu").
- **Unique ID**: Useful for referencing specific participants without storing personal names if needed.

## 🔒 Security
The current password is: `research2024`. This is stored in `index.html`. While this provides a barrier for general users, it is not military-grade security. For highly sensitive data, consider server-side authentication.

---

## 📝 License
MIT License - Feel free to use and modify for your research!
