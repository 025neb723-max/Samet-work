# Nepal Survey Dashboard

A professional, large-scale survey dashboard showing the **Top 50 Preferred** and **Top 50 Not Preferable** things in Nepal — plus a multi-step survey form to collect new responses.

## Features

### Dashboard (`index.html`)
- 📊 **Bar chart** visualization of top 10 items by score with animations
- 📋 **Sortable table** of all 50 items with rank medals, mini score bars, category badges, votes, and trends
- 🏷️ **Category breakdown** cards showing item distribution per category
- 🔍 **Search** items by name or category in real-time
- 🎚️ **Filter** by category and trend direction (up / down / stable)
- 🔄 **Tab switching** between Preferred and Not Preferable lists
- ⬇️ **Export CSV** — download filtered data as a CSV file
- 🌙 **Dark mode** toggle with persistent preference via localStorage
- 📱 **Responsive** design for mobile and desktop
- ♿ **Accessible** — skip links, focus styles, keyboard navigation, ARIA attributes
- 🖨️ **Print-friendly** styles for clean printouts
- ⬆️ **Scroll-to-top** floating button

### Survey Form (`survey.html`)
- 📝 **Multi-step form** with progress bar (3 steps)
- ✅ **Step 1**: Personal info — name, email, age group, province, travel frequency
- ✅ **Step 2**: Select preferred things (food, places, culture, adventure)
- ✅ **Step 3**: Select issues/problems + additional comments
- 🔒 **Client-side validation** at each step
- 💾 **localStorage** storage of all survey responses
- 🎯 **Thank you page** (`thankyou.html`) with response summary

## How to Run

Open `index.html` in any modern browser, or use a local server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## File Structure

```
├── index.html       # Dashboard page
├── survey.html      # Multi-step survey form
├── thankyou.html    # Survey confirmation page
├── style.css        # All shared styles (dark mode, print, responsive)
├── app.js           # Dashboard logic
├── survey.js        # Survey form logic
├── data.js          # Survey data (50 preferred + 50 not preferable)
└── README.md        # This file
```

## Survey Stats

- **52,480** respondents across all 7 provinces and 77 districts
- Survey period: January 2025 – March 2026
- Margin of error: ±1.2%
