# 🚀 GitHub Integration Dashboard

A modern Angular 19 application for integrating with GitHub using OAuth2 authentication. View and manage your GitHub data with a beautiful, responsive interface powered by Angular Material and AG Grid.

## ✨ Features

- **🔐 OAuth2 GitHub Authentication** - Secure connection to your GitHub account
- **📊 Dynamic Data Visualization** - View repositories, issues, pull requests, commits, organizations, and users
- **🔍 Advanced Search & Filtering** - Real-time search across all data columns
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **⚡ Real-time Status Updates** - Live connection status monitoring
- **🎨 Material Design** - Beautiful UI with Angular Material components

## 🛠️ Tech Stack

- **Angular 19** - Latest Angular framework with standalone components
- **Angular Material** - Material Design components
- **AG Grid** - Enterprise-grade data grid with advanced features
- **TypeScript** - Type-safe development
- **SCSS** - Enhanced styling capabilities
- **RxJS** - Reactive programming for data streams

## 📁 Project Structure

```
src/app/
├── github/                    # Lazy-loaded GitHub module
│   ├── connect/              # OAuth connection component
│   ├── view/                 # Data visualization component
│   ├── models/               # TypeScript interfaces
│   ├── services/             # HTTP services
│   └── github.module.ts      # Feature module
├── shared/                   # Shared components
│   └── navbar/              # Navigation component
└── app.component.ts         # Root component
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.19.1+
- npm 8.0.0+
- Angular CLI 19+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-integration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 🔧 Backend Requirements

This frontend assumes a backend server running at `http://localhost:3000` with the following endpoints:

### Authentication
- `GET /auth/github` - Initiates GitHub OAuth flow
- `GET /github/status` - Returns connection status
- `DELETE /github/disconnect` - Removes GitHub connection

### Data Endpoints
- `GET /github/data/organizations` - Fetch organizations
- `GET /github/data/repos` - Fetch repositories
- `GET /github/data/commits` - Fetch commits
- `GET /github/data/pulls` - Fetch pull requests
- `GET /github/data/issues` - Fetch issues
- `GET /github/data/users` - Fetch users

### Expected Response Formats

**Status Response:**
```json
{
  "connected": true,
  "connectedAt": "2025-01-01T12:00:00Z",
  "user": {
    "login": "username",
    "name": "User Name",
    "avatar_url": "https://github.com/avatar.jpg"
  }
}
```

**Data Response:**
```json
[
  {
    "id": 1,
    "name": "repository-name",
    "description": "Repository description",
    "created_at": "2025-01-01T12:00:00Z",
    "updated_at": "2025-01-01T12:00:00Z"
  }
]
```

## 🎯 Usage Guide

### 1. Connect to GitHub
- Navigate to the **Connect** page
- Click "Connect to GitHub" button
- Complete OAuth authentication in the popup/redirect
- Return to see your connection status

### 2. View GitHub Data
- Go to the **View Data** page
- Select a data type from the dropdown (Organizations, Repos, Commits, etc.)
- Use the search box to filter results across all columns
- Click column headers to sort data
- Use AG Grid's built-in filtering on individual columns

### 3. Manage Connection
- On the Connect page, expand the "Manage Integration" panel
- Click "Remove Integration" to disconnect your GitHub account

## 🔧 Development

### Available Scripts

```bash
# Development server
ng serve

# Build for production
ng build

# Run unit tests
ng test

# Run linting
ng lint

# Generate component
ng generate component component-name

# Generate service
ng generate service service-name
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Angular Style Guide** - Following official Angular conventions

### Component Architecture

- **Standalone Components** - Using Angular 19's standalone component architecture
- **Reactive Forms** - For form handling and validation
- **OnPush Change Detection** - For optimal performance
- **RxJS Observables** - For reactive data management

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 Theming

The app uses Angular Material's theming system:
- **Primary Color** - Material Blue
- **Accent Color** - Material Pink
- **Warn Color** - Material Red
- **Typography** - Roboto font family

## 🔒 Security Features

- **CORS Protection** - Proper CORS configuration
- **OAuth2 Flow** - Secure GitHub authentication
- **HTTP Interceptors** - Request/response handling
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Build for Production

```bash
ng build --configuration production
```

### Deploy to Static Hosting

The built files in `dist/` can be deployed to:
- **Netlify**
- **Vercel**
- **GitHub Pages**
- **AWS S3**
- **Firebase Hosting**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **Angular Material** - For beautiful UI components
- **AG Grid** - For the powerful data grid
- **GitHub** - For the excellent API

---

**Built with ❤️ using Angular 19**
