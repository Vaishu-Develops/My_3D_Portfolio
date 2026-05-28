# 🚀 My 3D Portfolio

> A stunning, interactive 3D portfolio website showcasing modern web technologies and creative design. Built with React, TypeScript, Three.js, and cutting-edge animations.

![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=flat-square&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-183.2-000000?style=flat-square&logo=threedotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac?style=flat-square&logo=tailwind-css)

---

## ✨ Features

- 🎨 **3D Graphics & Animations** – Powered by Three.js and React Three Fiber for immersive visuals
- 🌊 **Smooth Scrolling** – Enhanced UX with Lenis smooth scroll integration
- ⚡ **Lightning Fast** – Built with Vite for instant HMR and optimized production builds
- 📱 **Fully Responsive** – Looks perfect on desktop, tablet, and mobile devices
- 🎭 **Advanced Animations** – GSAP, Framer Motion, and Lottie for smooth transitions
- 🎯 **Interactive Components** – Custom UI elements with click effects and visual feedback
- 🔥 **Modern Stack** – React 19, TypeScript, Tailwind CSS for maintainability
- 📦 **Modular Architecture** – Clean component structure for easy customization

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React 19, TypeScript, Vite |
| **3D & Graphics** | Three.js, React Three Fiber, Drei, Spline |
| **Animations** | Framer Motion, GSAP, Lottie |
| **Styling** | Tailwind CSS, PostCSS |
| **Routing** | React Router v7 |
| **UI Libraries** | Lucide Icons, Custom Components |
| **Build Tools** | Vite, ESLint, TypeScript Compiler |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Vaishu-Develops/My_3D_Portfolio.git
cd My_3D_Portfolio

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
pnpm run build

# Preview production build
pnpm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/                    # Three.js 3D components
│   │   └── Background3D.tsx
│   ├── layout/                # Main page sections
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── EducationSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/                    # Reusable UI components
│       ├── ScrollStack.tsx
│       ├── LoadingScreen.tsx
│       ├── 3d-card.tsx
│       ├── AnimatedMacbook.tsx
│       ├── ClickSpark.tsx
│       ├── Plasma.tsx
│       └── More...
├── animation/                 # Lottie animation files
├── assets/                    # Images and static assets
├── App.tsx                    # Main app component
└── main.tsx                   # Entry point
```

---

## � Animations & Effects Showcase

This portfolio features cutting-edge visual effects and smooth animations:

### ✨ Global Effects
- **3D Starfield Background** – Animated stars with parallax depth using Three.js
- **Film Grain Overlay** – Cinematic grain effect across the entire viewport
- **Smooth Scroll** – Lenis integration for buttery-smooth scrolling experience
- **Page Transitions** – Framer Motion page switches with AnimatePresence

### 🎨 Interactive Components
- **Click Sparks** – Particle effects on mouse clicks
- **Plasma Effect** – Animated plasma waves and gradients
- **Logo Loop** – Rotating brand/logo animations
- **Scroll Stack** – Parallax stacking effect as you scroll
- **Threads** – Animated thread/line connections between elements
- **Splash Cursor** – Dynamic cursor trail with fade effects

### 🖼️ 3D Showcase
- **3D Cards** – Interactive cards with 3D rotation and depth
- **3D Image Gallery** – Scrollable 3D carousel with perspective transforms
- **Animated Macbook** – Responsive 3D MacBook display component
- **Background3D** – Immersive Three.js background with custom geometries

### 📱 Motion & Dynamics
- **Lottie Animations** – Smooth SVG animations (Loading screens, transitions)
- **GSAP Tweens** – High-performance animations and morphing effects
- **Framer Motion** – Spring physics and gesture-based interactions
- **Loading Screen** – Animated splash screen with staggered elements

---

## 🎮 Key Sections

| Section | Description | Effects |
|---------|-------------|---------|
| **Hero** | Eye-catching landing with 3D background | Starfield, text reveals, click sparks |
| **About** | Personal introduction with animations | Scroll reveals, fade-in text, GSAP tweens |
| **Experience** | Timeline of professional journey | Staggered animations, scroll triggers |
| **Skills** | Interactive categorized tech stack | Hover effects, progress bars, animations |
| **Projects** | Portfolio showcase with descriptions | 3D cards, hover rotations, link effects |
| **Gallery** | 3D image showcase and visual gallery | 3D carousel, parallax, smooth transitions |
| **Education** | Academic background and certifications | Timeline animations, icon reveals |
| **Contact** | Contact form and social connections | Form interactions, button effects, links |

---

## 🔧 Available Scripts

```bash
pnpm run dev        # Start development server with HMR
pnpm run build      # Build for production
pnpm run preview    # Preview production build locally
pnpm run lint       # Run ESLint to check code quality
```

---

## 🎨 Customization & Personalization

This is an **open-source template**—customize it with your own information and branding:

### Update Personal Content
Edit these files to replace example content with your own:

```bash
src/components/layout/HeroSection.tsx         # Update hero title, subtitle, CTA
src/components/layout/AboutSection.tsx        # Replace with your bio
src/components/layout/ExperienceSection.tsx   # Add your work experience
src/components/layout/SkillsSection.tsx       # List your technical skills
src/components/layout/ProjectsSection.tsx     # Showcase your projects
src/components/layout/EducationSection.tsx    # Add your education details
src/components/layout/ContactSection.tsx      # Update contact info
src/components/layout/Navbar.tsx              # Customize navigation and branding
```

### Customize Colors & Theme
Edit `tailwind.config.js` to change:
- Primary and secondary colors
- Font families and typography
- Border radius and spacing
- Dark mode settings

### Modify Animations
All animation configurations are in individual component files using:
- **GSAP** – Edit timing, duration, and easing
- **Framer Motion** – Modify transition types and variants
- **Three.js** – Adjust camera, lighting, and geometry properties

### Replace Assets
Update these directories with your own content:
```bash
src/assets/            # Replace images, logos, and SVGs
src/animation/         # Add custom Lottie animations
public/                # Update favicon and metadata
```

---

##  Performance

- ⚡ **Fast Build**: Vite delivers instant HMR in development
- 📉 **Small Bundle**: ~200KB gzipped with code splitting enabled
- 🎯 **Optimized Images**: Automatic WebP conversion and lazy loading
- 🚀 **Tree-Shaking**: Unused code automatically removed in production

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes with clear messages (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📝 License

This project is open-source and available for public use. Feel free to fork, modify, and build upon it!

---

## 👨‍💻 Author

**Vaishu-Develops**
- GitHub: [@Vaishu-Develops](https://github.com/Vaishu-Develops)
- Portfolio: [My_3D_Portfolio](https://github.com/Vaishu-Develops/My_3D_Portfolio)

---

## 🙌 Acknowledgments

- Three.js & React Three Fiber community
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- All contributors and supporters

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [GSAP Animation Library](https://gsap.com)

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star!**

Made with ❤️ by Vaishu-Develops

</div>
