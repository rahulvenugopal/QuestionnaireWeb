# Questionnaire Website Setup Guide

This guide will help you set up a password-protected questionnaire website that saves responses to Google Sheets.

## 📋 Features

- ✅ Password protection
- ✅ 30 customizable questions (sample provided)
- ✅ Automatic saving to Google Sheets
- ✅ Progress bar
- ✅ Responsive design
- ✅ Export to CSV functionality
- ✅ Hosted on GitHub Pages

## 🚀 Setup Instructions

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Questionnaire Responses" (or any name you prefer)
4. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Copy and paste the entire contents of `google-script.js` into the editor
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
5. Click **Save** (💾 icon)
6. Name your project (e.g., "Questionnaire Backend")

### Step 3: Deploy the Apps Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Questionnaire API v1"
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize access** when prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
7. **Copy the Web app URL** - it looks like:
   ```
   https://script.google.com/macros/s/LONG_ID_HERE/exec
   ```

### Step 4: Update the HTML File

1. Open `index.html` in a text editor
2. Find this line (around line 300):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web app URL from Step 3
4. (Optional) Change the password on line 301:
   ```javascript
   const CORRECT_PASSWORD = 'research2024';
   ```
5. Save the file

### Step 5: Customize Your Questions

Edit `index.html` to add your 30 questions. The file includes sample questions showing different types:

**Radio buttons (single choice):**
```html
<div class="form-group">
    <div class="question-number">QUESTION 1</div>
    <label>Your question here? <span class="required">*</span></label>
    <div class="radio-group">
        <div class="radio-option">
            <input type="radio" id="q1_1" name="question1" value="Option 1" required>
            <label for="q1_1">Option 1</label>
        </div>
        <!-- Add more options -->
    </div>
</div>
```

**Number input:**
```html
<div class="form-group">
    <div class="question-number">QUESTION 2</div>
    <label>Your question? <span class="required">*</span></label>
    <input type="number" name="question2" required min="1" max="10">
</div>
```

**Checkboxes (multiple choice):**
```html
<div class="form-group">
    <div class="question-number">QUESTION 3</div>
    <label>Your question? (Select all that apply)</label>
    <div class="checkbox-group">
        <div class="checkbox-option">
            <input type="checkbox" id="opt1" name="question3" value="Option 1">
            <label for="opt1">Option 1</label>
        </div>
        <!-- Add more checkboxes -->
    </div>
</div>
```

**Text area (open response):**
```html
<div class="form-group">
    <div class="question-number">QUESTION 4</div>
    <label for="q4">Your question:</label>
    <textarea id="q4" name="question4"></textarea>
</div>
```

### Step 6: Update Google Script for Your Questions

1. Go back to your Apps Script editor
2. Update the `headers` array to match your questions (around line 17):
   ```javascript
   const headers = [
     'Timestamp',
     'Participant ID',
     'Age',
     'Gender',
     'Question 1',
     'Question 2',
     // ... add all your question names
     'Question 30'
   ];
   ```
3. Update the `rowData` array to match (around line 27):
   ```javascript
   const rowData = [
     data.timestamp,
     data.participantId,
     data.age,
     data.gender,
     data.question1,
     data.question2,
     // ... add all your question fields
     data.question30
   ];
   ```
4. Save and deploy a new version:
   - Click **Deploy** → **Manage deployments**
   - Click the pencil icon ✏️
   - Change version to "New version"
   - Click **Deploy**

### Step 7: Update JavaScript Data Collection

In `index.html`, find the form submission section (around line 315) and update the data object:

```javascript
const data = {
    timestamp: new Date().toISOString(),
    participantId: formData.get('participantId'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    question1: formData.get('question1'),
    question2: formData.get('question2'),
    // Add all your questions
    question30: formData.get('question30')
};
```

### Step 8: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it (e.g., "questionnaire")
4. Choose **Public**
5. Click **Create repository**

### Step 9: Upload Files to GitHub

**Option A: Using GitHub Web Interface**
1. In your repository, click **Add file** → **Upload files**
2. Drag and drop `index.html`
3. Commit the changes

**Option B: Using Git Command Line**
```bash
git init
git add index.html
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/questionnaire.git
git push -u origin main
```

### Step 10: Enable GitHub Pages

1. In your repository, go to **Settings**
2. Scroll to **Pages** section (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 2-3 minutes, then visit:
   ```
   https://YOUR_USERNAME.github.io/questionnaire/
   ```

## 🔒 Security Notes

**Important:** The current password protection is client-side only (happens in the browser). For better security:

1. **Change the password regularly**
2. **Don't share the password publicly**
3. **For production use**, consider:
   - Using a backend authentication service
   - Implementing server-side validation
   - Using environment variables for sensitive data

## 📊 Accessing Your Data

### View in Google Sheets
- All responses appear in real-time in your Google Sheet

### Export to CSV
1. Open your Apps Script editor
2. Select the `exportToCSV` function from the dropdown
3. Click **Run** (▶️)
4. Check your Google Drive for the CSV file

Alternatively, from Google Sheets:
- **File** → **Download** → **Comma Separated Values (.csv)**

## 🛠️ Troubleshooting

### Form not submitting
- Check browser console (F12) for errors
- Verify the Google Apps Script URL is correct
- Ensure the Apps Script is deployed with "Anyone" access

### Password not working
- Check the password in `index.html` (line 301)
- Password is case-sensitive

### Data not appearing in Google Sheets
- Verify Sheet ID in `google-script.js`
- Check Apps Script execution logs:
  - Apps Script Editor → **Executions** tab
- Ensure the sheet name matches (default: "Responses")

### GitHub Pages not loading
- Wait 5-10 minutes after enabling
- Check file name is exactly `index.html`
- Verify repository is public

## 📝 Customization Tips

1. **Change colors**: Edit the CSS gradient colors in the `<style>` section
2. **Add logo**: Add an `<img>` tag in the header
3. **Change fonts**: Update the `font-family` in CSS
4. **Add validation**: Use HTML5 validation attributes (`required`, `min`, `max`, `pattern`)

## 🔄 Updating Your Questionnaire

1. Make changes to `index.html`
2. Upload the updated file to GitHub
3. Changes appear on GitHub Pages within 1-2 minutes

## 📞 Need Help?

- Check execution logs in Apps Script
- Use browser DevTools (F12) to debug JavaScript
- Verify all IDs and names match between HTML and JavaScript

## ✅ Quick Checklist

- [ ] Google Sheet created
- [ ] Apps Script code deployed
- [ ] Web app URL copied to `index.html`
- [ ] Password customized
- [ ] All 30 questions added
- [ ] Data collection code updated
- [ ] GitHub repository created
- [ ] `index.html` uploaded
- [ ] GitHub Pages enabled
- [ ] Website tested
- [ ] Password tested
- [ ] Form submission tested

Your questionnaire website is ready! 🎉
