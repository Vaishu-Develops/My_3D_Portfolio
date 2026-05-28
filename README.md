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

## 🎮 Key Sections

| Section | Description |
|---------|-------------|
| **Hero** | Eye-catching landing section with 3D background and call-to-action |
| **About** | Personal introduction with animated text reveals |
| **Experience** | Timeline of professional experience |
| **Skills** | Interactive skill showcase with categorized tech stack |
| **Projects** | Portfolio projects with descriptions and links |
| **Gallery** | 3D image showcase and visual gallery |
| **Education** | Academic background and certifications |
| **Contact** | Contact form and social links |

---

## 🔧 Available Scripts

```bash
pnpm run dev        # Start development server with HMR
pnpm run build      # Build for production
pnpm run preview    # Preview production build locally
pnpm run lint       # Run ESLint to check code quality
```

---

## 🎨 Customization

### Change Colors & Theme
Edit `tailwind.config.js` to customize your color scheme and theme settings.

### Modify Animations
Animation configurations can be adjusted in component files using GSAP and Framer Motion settings.

### Update Content
Edit section components in `src/components/layout/` to personalize with your own content.

---

## 📊 Performance

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
