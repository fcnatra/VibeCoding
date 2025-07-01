# Kata: "I Told You So" Prediction Recorder

## Problem
Many friendships end up in debates about who was right in a prediction (e.g., "I told you it would rain").

## Context
This kata is about building a simple app that allows anyone to leave a registered prediction (like a "sealed tweet") to review later.

## Expected Delivery
A microproduct that allows users to save a "I predicted that..." with a date and see it later. The app consists of a form to save predictions and a view to display them.

## Solution Overview
- Web app using HTML, CSS, and JavaScript (with jQuery)
- Predictions are stored in the browser's localStorage
- Users can add a prediction and see all saved predictions with their dates

## How to Run
1. Open `index.html` in your browser (no server required)
2. Enter your prediction in the input field and click "Save Prediction"
3. Your prediction will appear in the list below, along with the date

## How to Test
1. Open a terminal and navigate to the `tests` folder
2. Run the test script:
   ```
   test_predictions.cmd
   ```
   The script will check that the HTML contains the required form and predictions list

## File Structure
- `index.html` – Main app page
- `styles.css` – App styles
- `script.js` – App logic (prediction saving and display)
- `tests/test_predictions.cmd` – Automated test for HTML structure

## Author
VibeCoding Team
