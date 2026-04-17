# Thanveer Ahammed N — Portfolio

A premium, high-performance portfolio website built with **React**, **Vite**, and **Tailwind CSS**. Designed with a "DOPA-inspired" aesthetic featuring dark mode, glassmorphism, 3D backgrounds, and smooth motion patterns.

## 🚀 Optimized Web Development
- **Framework:** React 18
- **Build Tool:** Vite (for near-instant HMR)
- **Styling:** Tailwind CSS (Custom Design System)
- **Animations:** Framer Motion (for fluid, high-end transitions)
- **3D Graphics:** React Three Fiber / Three.js
- **Icons:** React Icons (FontAwesome)
- **Form Handling:** EmailJS Integration

## 🛠 Design System
This portfolio uses a strict, curated color palette and typography system:
- **Charcoal:** `#0a0a0a` (Main background)
- **Yellow:** `#EFB909` (Primary accent)
- **Surface:** `#111111` (Component backgrounds)
- **Light:** `#EFEFEF` (Main text)
- **Gray:** `#666666` (Subtext)
- **Typography:** *Display* — Oswald | *Sans* — Inter

## 📂 Project Structure
```text
src/
├── components/          # Reusable UI components
│   ├── canvas/          # 3D/Canvas elements
│   └── ...
├── assets/              # Static assets
├── index.css            # Global styles & design tokens
└── App.jsx              # Main routing and layout
```

## 🛠 Setup & Deployment
### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

### Environment Variables
To enable the contact form, create a `.env` file with:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Build for Production
```bash
npm run build
```

## 👤 Author
**Thanveer Ahammed N**  
*MERN Full Stack Developer & AI Automation Enthusiast*  
[GitHub](https://github.com/thanveer006) | [LinkedIn](https://www.linkedin.com/in/thanveer-ahammed-dev)
