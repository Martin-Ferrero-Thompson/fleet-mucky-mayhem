# Fleet Mucky Mayhem

A modern, responsive website for Fleet Mucky Mayhem - a local cycling group in Fleet, Hampshire, UK. The site showcases upcoming rides, photo galleries, sponsors, and provides information for both new and experienced cyclists interested in social, off-road cycling adventures.

## 🚴 About the Project

Fleet Mucky Mayhem is a welcoming community of social cyclists who enjoy off-road routes including Cross Country (XC), Adventure, and exploring-type rides. This website serves as the primary digital hub for:

- Regular and longer ride schedules
- Group information and meeting points
- Photo galleries from past rides
- Sponsor showcases
- FAQ and contact information
- Ride diary with detailed route information

## 🛠️ Technology Stack

- **Build Tool**: [Vite](https://vitejs.dev/) - Fast, modern frontend build tool
- **Runtime**: [Bun](https://bun.sh/) - Ultra-fast JavaScript runtime and package manager
- **Framework**: Vanilla HTML, CSS, and JavaScript
- **UI Framework**: [Bootstrap 5.3](https://getbootstrap.com/) with dark theme
- **CSS Preprocessor**: [Sass (Embedded)](https://sass-lang.com/)
- **Fonts**: Google Fonts (Urbanist, Roboto Flex)
- **Icons**: Bootstrap Icons
- **Image Optimization**: vite-plugin-imagemin with WebP support
- **Analytics**: Google Analytics & Google Tag Manager

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (latest version recommended)
  ```bash
  # Install Bun (macOS, Linux, WSL)
  curl -fsSL https://bun.sh/install | bash
  ```

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Martin-Ferrero-Thompson/fleet-mucky-mayhem.git
   cd fleet-mucky-mayhem
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

### Development

Start the development server with hot module replacement:

```bash
bun run dev
```

The site will be available at `http://localhost:8080`

#### Available Scripts

- `bun run dev` - Start development server on port 8080
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally

### Project Structure

```
fleet-mucky-mayhem/
├── .github/
│   └── workflows/
│       └── static.yaml           # GitHub Actions workflow for deployment
├── public/                       # Production build output
├── src/                          # Source files
│   ├── img/                      # Images and assets
│   ├── js/                       # JavaScript modules
│   │   ├── main.js              # Bootstrap and main styles
│   │   ├── about-us.js          # About section functionality
│   │   ├── ride-diary.js        # Ride diary interactions
│   │   ├── navlink.js           # Navigation handling
│   │   └── ...
│   ├── scss/                     # Sass stylesheets
│   └── index.html               # Main HTML file
├── vite.config.mjs              # Vite configuration
├── package.json                 # Project dependencies
└── bun.lock                     # Bun lockfile
```

## 🏗️ Building for Production

To create an optimized production build:

```bash
bun run build
```

This will:
- Bundle and minify all JavaScript and CSS
- Optimize images (JPEG, PNG) and generate WebP versions
- Output to the `./public` directory
- Apply proper base path configuration for deployment

The build process uses Vite's production optimizations including:
- Code splitting
- Tree shaking
- Asset compression
- Image optimization (via imagemin)

## 🌐 Deployment to GitHub Pages

The site is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

The site automatically deploys when:
- Code is pushed to the `main` branch
- Manual workflow dispatch is triggered
- Scheduled weekly on Tuesdays at 8:00 AM UTC

### Deployment Configuration

The deployment workflow (`.github/workflows/static.yaml`) handles:

1. **Checkout**: Pulls the latest code
2. **Setup Bun**: Installs Bun runtime
3. **Install Dependencies**: Runs `bun install --frozen-lockfile`
4. **Build**: Executes `bun run build`
5. **Upload Artifact**: Packages the `./public` directory
6. **Deploy**: Publishes to GitHub Pages

### Manual Deployment

To manually trigger a deployment:

1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Select **Deploy Main to Pages** workflow
4. Click **Run workflow**

### Custom Domain Setup

If using a custom domain:

1. Add a `CNAME` file to the `./public` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in repository settings under **Pages**

### Base Path Configuration

The Vite config automatically handles base paths:
- **Production (main branch)**: Uses `/` as base (for custom domains)
- **Preview builds**: Can use repository name as base path if needed

To build for a specific base path, set the `VITE_PREVIEW_BUILD` environment variable:

```bash
VITE_PREVIEW_BUILD=true bun run build
```

## 🔧 Configuration

### Vite Configuration

Key settings in `vite.config.mjs`:

- **Root**: `src/` - Source files location
- **Build Output**: `public/` - Production build directory
- **Dev Server Port**: 8080
- **Base Path**: Auto-configured based on environment
- **Image Optimization**: JPEG (quality 80), PNG (level 7), WebP (quality 80)

### Environment Variables

- `VITE_PREVIEW_BUILD`: Set to `'true'` for preview builds with repository base path
- `GITHUB_REPOSITORY`: Automatically set by GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Links

- **Live Site**: [Fleet Mucky Mayhem](https://fleetmuckymayhem.co.uk)
- **WhatsApp Group**: [Join the group](https://chat.whatsapp.com/LJ1XZhB7KprApZhr4plhGD)
- **Repository**: [GitHub](https://github.com/Martin-Ferrero-Thompson/fleet-mucky-mayhem)

## 📞 Contact

For questions about the cycling group or website, please visit the [Contact Us](https://fleetmuckymayhem.co.uk#contact-us) section on the website.

---

Made with ❤️ for the Fleet Mucky Mayhem cycling community