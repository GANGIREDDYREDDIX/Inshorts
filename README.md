# Inshorts University Announcement Platform 📢

A modern MERN stack application for managing university announcements with AI-powered content generation. Teachers can create and manage announcements while students can view them in a beautifully designed feed with category filters.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)

## ✨ Features

- 🤖 **AI-Powered Content**: Automatic 60-word summaries generated using Google Gemini 2.0 Flash
- 🖼️ **Smart Image Selection**: Auto-generates relevant images using Pexels API with fallback
- 👥 **Role-Based Access**: Separate dashboards for teachers (CRUD) and students (view-only)
- 🎨 **Modern UI**: React 19 + Tailwind CSS v4 with Framer Motion animations
- 📱 **Responsive Design**: Mobile-first approach with optimized layouts
- 🏷️ **Category System**: Academic, Administrative, Co-curricular, and Placement categories
- 🔍 **Smart Filtering**: Filter announcements by category with animated transitions
- 📦 **Monorepo Structure**: Organized workspace with concurrent dev servers

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with new rendering patterns
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first styling with Vite plugin
- **Framer Motion** - Smooth animations and transitions
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js + Express 5** - Server framework
- **MongoDB + Mongoose** - Database and ODM
- **Google Gemini AI** - Content summarization
- **Pexels API** - Image search and selection
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Pexels API key ([Get one here](https://www.pexels.com/api/)) - Optional

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/Parvaggarwal01/Inshorts.git
cd Inshorts
```

### 2. Install all dependencies
```bash
npm run install:all
```
This command installs dependencies for root, server, and client.

### 3. Configure environment variables

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5001
PEXELS_API_KEY=your_pexels_api_key  # Optional, falls back to Picsum
```

See `.env.example` for reference.

### 4. Start the application

```bash
npm start
```

This runs both client and server concurrently:
- **Client**: http://localhost:3000 (or next available port)
- **Server**: http://localhost:5001

### Alternative: Run separately

```bash
# Terminal 1 - Server
cd server
npm start

# Terminal 2 - Client  
cd client
npm run dev
```

## 👤 Default Users

The database auto-seeds with default credentials:

**Teacher Account:**
- Registration ID: `teacher1`
- Password: `pass123`

**Student Account:**
- Registration ID: `student1`
- Password: `pass123`

## 📁 Project Structure

```
Inshorts/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Route components
│   │   │   ├── Login.jsx
│   │   │   ├── TeacherDashboard.jsx
│   │   │   └── StudentFeed.jsx
│   │   ├── App.jsx        # Main app with routing
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Express backend
│   ├── models/           # Mongoose schemas
│   │   ├── User.js
│   │   └── Announcement.js
│   ├── routes/           # API endpoints
│   │   ├── auth.js       # Login/authentication
│   │   └── announcements.js  # CRUD operations
│   ├── services/         # Business logic
│   │   └── ai.js         # Gemini & Pexels integration
│   ├── server.js         # Entry point
│   └── package.json
│
└── package.json          # Root scripts
```

## 🔑 Key Features Explained

### AI Content Generation

When a teacher creates an announcement:
1. **Summary Generation**: Gemini AI creates a 60-word summary from the description
2. **Image Selection**: Pexels API searches for relevant images based on title and tags
3. **Fallback Handling**: Uses Picsum Lorem if Pexels API is unavailable

Teachers can manually provide a summary to skip AI generation.

### Role-Based Access

- **Teachers** (`/dashboard`): 
  - Create, edit, and delete announcements
  - Auto-generate or manually enter summaries
  - Add up to 3 tags for better image generation
  
- **Students** (`/feed`):
  - View all announcements in a beautiful feed
  - Filter by categories
  - Mobile-optimized card layout with animations

### Update Behavior

When editing an announcement:
- AI regenerates summary ONLY if `title` or `description` changes
- Images regenerate ONLY if `title` or `tags` change
- Provide existing summary to prevent regeneration

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/login
  Body: { regId, password }
  Returns: { id, regId, role }
```

### Announcements
```
GET    /api/announcements              # Get all
GET    /api/announcements/:id          # Get single
POST   /api/announcements              # Create (Teacher only)
  Body: { title, description, category, tags[], authorId, summary? }
PUT    /api/announcements/:id          # Update (Teacher only)
DELETE /api/announcements/:id          # Delete (Teacher only)
```

## 🎨 Categories

- **All** - View all announcements
- **Academic** - Classes, exams, results
- **Administrative/Misc** - General notices
- **Co-curricular/Sports/Cultural** - Events and activities  
- **Placement** - Job opportunities and campus recruitment

## 🚦 Common Issues

### API URL Hardcoded
The client uses `http://localhost:5001/api` directly. For production, update this in relevant components.

### No JWT Authentication
Uses simple localStorage-based auth. Consider implementing JWT for production.

### Environment Variables
Ensure `.env` file is in the `server/` directory, not root.

### Port Conflicts
If port 5001 is busy, change `PORT` in `.env` and update client API calls.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Parvaggarwal01** - [GitHub Profile](https://github.com/Parvaggarwal01)

## 🙏 Acknowledgments

- Google Gemini AI for content generation
- Pexels for beautiful stock photos
- React and Vite communities for amazing tools
- Tailwind CSS for the utility-first approach

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ using MERN Stack**
