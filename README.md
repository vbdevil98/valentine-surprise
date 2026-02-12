# 💝 Valentine's Day Interactive Website

A beautiful, interactive Valentine's Day surprise website with a modern glassmorphism design, perfect for confessing your love!

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism UI** - Frosted glass effect with beautiful gradients
- **Fully Responsive** - Optimized for both mobile and desktop/laptop screens
- **Smooth Animations** - Professional transitions and effects
- **Interactive Elements** - Engaging user experience throughout

### 📱 Pages Included
1. **Homepage** (`index.html`) - The big question with relationship timer
2. **Quiz Page** (`pages/quiz.html`) - Fun security check
3. **Reasons Page** (`pages/reasons.html`) - 10 heartfelt reasons
4. **Gallery Page** (`pages/moments.html`) - Photo memories with polaroid effect
5. **Contract Page** (`pages/future.html`) - Valentine's agreement to sign
6. **Coupons Page** (`pages/coupons.html`) - Redeemable love rewards

### 🎯 Interactive Features
- ⏱️ **Live Relationship Timer** - Counts from October 13, 2023
- 🎵 **Background Music** - Plays your special song (Khamoshiyan)
- 😄 **Impossible "No" Button** - Runs away when you try to click it
- 🎉 **Confetti Effects** - Celebrations when signing contract and redeeming coupons
- 📸 **Polaroid Gallery** - Beautiful photo display with hover effects
- 🎟️ **Interactive Coupons** - Click to redeem rewards

## 📁 Folder Structure

```
valentine-website/
│
├── index.html              # Main homepage
├── css/
│   └── style.css          # All styling (responsive + glassmorphism)
├── js/
│   └── script.js          # All functionality and interactions
├── pages/
│   ├── quiz.html          # Security check page
│   ├── reasons.html       # 10 reasons page
│   ├── moments.html       # Photo gallery
│   ├── future.html        # Contract page
│   └── coupons.html       # Rewards page
└── images/
    ├── song.mp3           # Background music (YOU NEED TO ADD THIS)
    ├── image1.jpg         # Gallery photo 1 (YOU NEED TO ADD THIS)
    ├── image2.jpg         # Gallery photo 2 (YOU NEED TO ADD THIS)
    ├── image3.jpg         # Gallery photo 3 (YOU NEED TO ADD THIS)
    ├── image4.jpg         # Gallery photo 4 (YOU NEED TO ADD THIS)
    ├── image5.jpg         # Gallery photo 5 (YOU NEED TO ADD THIS)
    └── image6.jpg         # Gallery photo 6 (YOU NEED TO ADD THIS)
```

## 🚀 Setup Instructions

### Step 1: Download Your Assets

#### For the Song (Khamoshiyan):
1. Download the song "Khamoshiyan" as an MP3 file
2. Rename it to exactly: `song.mp3` (all lowercase)
3. Place it in the `images/` folder

#### For Your Photos:
1. Choose 6 of your favorite photos together
2. Rename them to: `image1.jpg`, `image2.jpg`, `image3.jpg`, `image4.jpg`, `image5.jpg`, `image6.jpg`
3. Place them all in the `images/` folder

**💡 Tip:** You can use any image format (.jpg, .jpeg, .png), just make sure to name them correctly!

### Step 2: Customize (Optional)

#### Change the Relationship Date:
Open `js/script.js` and find line 6:
```javascript
const startDate = new Date("2023-10-13T00:00:00");
```
Change `"2023-10-13"` to your actual relationship start date.

#### Customize the Reasons:
Open `pages/reasons.html` and edit the list items to personalize your reasons.

#### Modify Coupons:
Open `pages/coupons.html` and change the coupon titles and descriptions to your preferences.

### Step 3: Testing Locally

#### Option A: Using VS Code (Recommended)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option B: Simple Browser Opening
1. Double-click `index.html`
2. It will open in your default browser
3. Some features (like music) may not work due to browser restrictions

### Step 4: Deployment (Make it Live!)

#### GitHub Pages (Free & Easy):
1. Create a new repository on GitHub
2. Upload all files maintaining the folder structure
3. Go to Settings > Pages
4. Select "Deploy from main branch"
5. Your site will be live at: `https://yourusername.github.io/repository-name/`

#### Netlify (Alternative):
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your entire folder
3. Get an instant live URL!

## 🎨 Design Features

### Desktop Optimization
- **Large Screens**: Maximum width of 850px for comfortable reading
- **Grid Layouts**: Photo gallery and coupons use CSS Grid for perfect alignment
- **Hover Effects**: Enhanced interactions on desktop (polaroid zoom, button animations)
- **Typography**: Larger, more readable fonts on bigger screens

### Mobile Responsive
- **Touch Friendly**: All interactive elements work perfectly on touch screens
- **Optimized Layout**: Single column layout on small screens
- **Readable Text**: Font sizes scale appropriately
- **Smooth Navigation**: Easy thumb-friendly buttons

### Animations
- **Fade-in Effects**: Content smoothly appears
- **Staggered Lists**: Reasons appear one by one
- **Floating Hearts**: Gentle background animation
- **Pulse Effects**: Music button pulses to grab attention
- **Confetti**: Celebration effects on special actions

## 🎯 How to Use

1. **Share the Link**: Send the website URL to your Valentine
2. **Let Them Explore**: They'll go through each page sequentially
3. **The "No" Button**: Watch them try to click it! 😂
4. **Capture the Moment**: They can screenshot redeemed coupons
5. **Keep as Memento**: The site stays online as a digital love letter

## 💡 Tips & Tricks

### Making it More Personal:
- Add more reasons in `reasons.html`
- Create custom coupons based on inside jokes
- Use photos that tell your story chronologically
- Edit the quiz question to something only your partner would know

### Music Tips:
- Choose a song that's meaningful to both of you
- Make sure the MP3 file isn't too large (under 10MB recommended)
- Test the music control button on both mobile and desktop

### Photo Tips:
- Use high-quality images (but not too large - compress if needed)
- Mix different types of photos (candid, posed, funny, romantic)
- Ensure images are properly oriented
- Square or landscape photos work best

## 🐛 Troubleshooting

### Music Not Playing:
- Ensure the file is named exactly `song.mp3`
- Check if the file is in the `images/` folder
- Some browsers block autoplay - user must click the music button
- Try a different browser if issues persist

### Images Not Showing:
- Verify filenames match exactly: `image1.jpg` through `image6.jpg`
- Check that images are in the `images/` folder
- Ensure image file extensions are correct (.jpg, .jpeg, or .png)

### "No" Button Not Moving:
- This is a JavaScript feature - ensure JavaScript is enabled in the browser
- Try refreshing the page
- Clear browser cache if needed

### Layout Issues:
- Try a different browser (Chrome or Firefox recommended)
- Ensure all CSS and JS files are properly linked
- Check browser console for errors (F12 key)

## 🎨 Color Scheme

The website uses a romantic gradient palette:
- Primary: Pink to Peach gradient (`#ff9a9e` to `#fad0c4`)
- Accent: Red (`#d63031`, `#ff6b6b`)
- Text: Dark gray (`#2d3436`)
- Glass effect: White with transparency

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop)
- ✅ Opera (Desktop)

## 🔒 Privacy Note

This website:
- Does NOT collect any data
- Does NOT use cookies
- Does NOT send information anywhere
- Is purely front-end (HTML, CSS, JavaScript)
- Runs entirely in the browser

## 💖 Final Notes

This website was created with love to help you express your feelings in a creative, memorable way. Feel free to:
- Customize any text or colors
- Add more pages or features
- Share it with friends who want to do something similar
- Keep it as a digital memento of your relationship

**Remember**: The most important part isn't the code or the design - it's the genuine feelings you're expressing! 💝

---

## 📞 Need Help?

If you run into issues:
1. Double-check all file paths and names
2. Make sure all files are in the correct folders
3. Try opening in a different browser
4. Clear your browser cache and try again

---

**Created with ❤️ for Valentine's Day 2026**

Enjoy your special day! 🌹✨
