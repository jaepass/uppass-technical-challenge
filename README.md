# Dynamic Form Builder and Renderer

A modern, type-safe form builder and renderer built with Vue 3, TypeScript, and Tailwind CSS. This project allows users to create, customize, and preview dynamic forms through a user-friendly interface.

## 🎨 Design Concepts

### Architecture and Directory Structure

```
src/
├── components/         # Reusable UI components
│   ├── base/          # Base/common components
│   ├── fields/        # Form field components
│   ├── navigation/    # Navigation components
│   └── schema/        # Schema-related components
├── layouts/           # Page layouts
├── router/            # Vue Router configuration
├── stores/            # Pinia state management
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── views/             # Page components
```

### UI/UX Design Decisions

- **Clean Interface**: Minimalist design focusing on content and functionality
- **Responsive Layout**: Mobile-first approach with adaptive views
- **Visual Feedback**: Loading states, validation feedback, and smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Component Isolation**: Each form field is a self-contained component
- **Consistent Styling**: Unified design system using Tailwind CSS

## 🛠 Technical Decisions

1. **Vue 3 + TypeScript**
   - Type safety and better developer experience
   - Composition API for better code organization
   - Script setup syntax for concise component logic

2. **State Management**
   - Pinia for predictable state management
   - Form builder state with undo/redo capability
   - Persistent form data across preview/edit modes

3. **Form Field Components**
   - Modular field components with consistent API
   - Prop-based configuration
   - Event-driven validation
   - Support for different input types (Text, Number, Radio)

4. **Schema System**
   - JSON-based schema definition
   - Validation rules support
   - Import/Export functionality
   - Runtime schema validation

5. **Build and Development**
   - Vite for fast development and optimized builds
   - TypeScript for type safety
   - ESLint + Prettier for code quality
   - Tailwind CSS for utility-first styling

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Testing the Form Builder

A sample schema file (`test-schema.json`) is included in the repository that demonstrates form fields for a sample leave request form. You can use this to explore the form builder's features and validate the implementation.

To import the test schema from the repository:
1. Opening the form builder
2. Clicking the menu button (three dots)
3. Selecting "Import Schema"
4. Click "Upload File" and select the `test-schema.json` file

## 🌟 Features

- [x] Dynamic form building and rendering
- [x] Drag-and-drop form field organization
- [x] Real-time form preview
- [x] Form validation
- [x] Schema import/export
- [x] Responsive design
- [x] Form field configuration
- [x] Theme customization

## 🔨 Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run type-check`: Check TypeScript types
- `npm run lint`: Lint code

## 🌐 Deployment

This project is deployed on [Vercel](https://vercel.com/) and can be accessed at [uppass-technical-challenge.vercel.app](https://uppass-technical-challenge.vercel.app/).
