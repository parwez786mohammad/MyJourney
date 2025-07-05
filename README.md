# Mohammad Parwez - Futuristic Portfolio Website

A stunning, futuristic portfolio website showcasing Mohammad Parwez's journey as a Project Manager specializing in automation, intralogistics, and digital transformation.

## 🚀 Features

- **Futuristic Design**: Modern UI with glassmorphism, neon accents, and smooth gradients
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Theme Switcher**: Toggle between light and dark modes
- **Smooth Animations**: Engaging scroll animations and hover effects
- **Interactive Elements**: Expandable project cards, timeline, and filtering
- **Contact Form**: Working contact form with validation using Formspree
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern CSS with custom properties, flexbox, and grid
- **Vanilla JavaScript**: No frameworks, pure JavaScript for optimal performance
- **Lucide Icons**: Beautiful, consistent iconography
- **Formspree**: Contact form handling
- **GitHub Pages**: Free hosting solution

## 📱 Pages

- **Home** (`index.html`): Hero section with introduction and key stats
- **About** (`about.html`): Detailed information about background and expertise
- **Projects** (`projects.html`): Showcase of major automation and digital transformation projects
- **Journey** (`journey.html`): Career timeline with expandable details
- **Blogs** (`blogs.html`): Insights on technology, leadership, and career growth
- **Videos** (`videos.html`): Educational content and book summaries (coming soon)
- **Contact** (`contact.html`): Contact form with social links and resume request

## 🎨 Design Features

- **Glassmorphism panels** with backdrop blur effects
- **Gradient backgrounds** and neon accent colors
- **Hover animations** and micro-interactions
- **Scroll-triggered animations** for engaging content reveal
- **Consistent color system** with cyan and purple gradients
- **Modern typography** with Inter and JetBrains Mono fonts

## 🚀 Quick Start

### Prerequisites

- A modern web browser
- Basic knowledge of HTML/CSS/JavaScript (for customization)

### Local Development

1. Clone or download the repository:
```bash
git clone https://github.com/your-username/mohammad-parwez-portfolio.git
cd mohammad-parwez-portfolio
```

2. Open `index.html` in your web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open [http://localhost:8000](http://localhost:8000) in your browser

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it something like `your-username.github.io` or `portfolio`

2. **Upload Your Files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your Site**:
   - Your site will be available at `https://your-username.github.io/your-repo-name`
   - It may take a few minutes to deploy

### Alternative Deployment Options

#### Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be deployed instantly with a random URL
4. You can customize the URL in site settings

#### Vercel
1. Go to [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Deploy with zero configuration

#### GitHub Codespaces
1. Open your repository in GitHub
2. Click "Code" → "Codespaces" → "Create codespace"
3. Run a local server in the codespace
4. Use port forwarding to access your site

## 📁 Project Structure

```
├── index.html              # Home page
├── about.html              # About page
├── projects.html           # Projects showcase
├── journey.html            # Career timeline
├── blogs.html              # Blog listing
├── videos.html             # Video content
├── contact.html            # Contact form
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Core functionality
│   ├── projects.js         # Projects page logic
│   ├── journey.js          # Timeline functionality
│   ├── blogs.js            # Blog filtering
│   ├── videos.js           # Video page logic
│   └── contact.js          # Contact form handling
└── README.md               # This file
```

## 🎯 Customization

### Colors

The color scheme uses CSS custom properties. Update the gradient colors in `css/styles.css`:

```css
:root {
  --primary-cyan: #06b6d4;
  --primary-purple: #8b5cf6;
  --primary-pink: #ec4899;
}
```

### Content

1. **Personal Information**: Update all instances of Mohammad Parwez's information with your own
2. **Projects**: Modify the project data in `projects.html`
3. **Timeline**: Update career milestones in `journey.html`
4. **Contact**: Replace email and social links in `contact.html`
5. **Images**: Replace profile images with your own (use the same URLs or local images)

### Contact Form

The contact form uses Formspree. To set up your own:

1. Go to [Formspree](https://formspree.io)
2. Create an account and get your form endpoint
3. Replace the form action in `contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Analytics

Add Google Analytics by including the tracking code in the `<head>` section of all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🔧 Advanced Features

### Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to your repository root with your domain:
   ```
   yourdomain.com
   ```

2. Configure your domain's DNS settings:
   - Add a CNAME record pointing to `your-username.github.io`
   - Or add A records pointing to GitHub's IP addresses

### Performance Optimization

The site is already optimized for performance:

- **Minified CSS**: Consider minifying CSS for production
- **Image Optimization**: Use WebP format for better compression
- **Lazy Loading**: Images load as needed
- **Efficient JavaScript**: Vanilla JS with minimal dependencies

### SEO Enhancements

- **Sitemap**: Add a `sitemap.xml` file
- **Robots.txt**: Add crawling instructions
- **Schema Markup**: Add structured data for better search results
- **Meta Tags**: Already included for social sharing

## 📈 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features Used**: CSS Grid, Flexbox, CSS Custom Properties, Intersection Observer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you need help with setup or customization:

- **Issues**: Open an issue on GitHub
- **Email**: Contact Mohammad Parwez at mohammad.parwez@span-group.com
- **LinkedIn**: [Mohammad Parwez](https://www.linkedin.com/in/mohammad-parwez-18bb01a7/)

## 🙏 Acknowledgments

- **Design Inspiration**: Modern portfolio websites and futuristic UI trends
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Images**: [Pexels](https://pexels.com) for stock photography
- **Fonts**: [Google Fonts](https://fonts.google.com) - Inter and JetBrains Mono

---

Built with ❤️ using modern web technologies. Perfect for showcasing professional portfolios with a futuristic, cutting-edge design.