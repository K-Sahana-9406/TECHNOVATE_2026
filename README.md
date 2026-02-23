# Technovate 2026 - Intercollege IT Event Management System

A full-featured MERN stack application for managing the Technovate 2026 intercollege IT department event.

## 🚀 Features

### Frontend (React + Vite)

- **Responsive Design** - Premium dark theme with glassmorphism effects
- **Multi-page Application** - Home, Events, Registration, About, Admin Dashboard, Attendance
- **Modern UI** - Tailwind CSS with custom animations and transitions
- **QR Code Scanning** - For attendance marking
- **Form Validation** - Real-time validation with error handling
- **Mobile First** - Fully responsive design

### Backend (Node.js + Express)

- **RESTful API** - Complete CRUD operations for events and registrations
- **JWT Authentication** - Secure admin authentication
- **MongoDB Integration** - Database models for Events, Registrations, Admins
- **Email Notifications** - Automatic confirmation emails with QR codes
- **Payment Integration** - Razorpay test mode integration
- **QR Code Generation** - Unique QR codes for each registration
- **Attendance System** - QR-based attendance marking
- **Google Sheets Sync** - Event-wise data synchronization

## 📁 Project Structure

```
technovate-2026/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── tailwind.config.js
│
├── server/                 # Node.js Backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - Component-based UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Heroicons** - Beautiful SVG icons
- **Axios** - HTTP client
- **react-qr-scanner** - QR code scanning

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email sending
- **Razorpay** - Payment processing
- **QRCode** - QR code generation
- **Google APIs** - Google Sheets integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd technovate-2026
```

2. **Install backend dependencies:**

```bash
cd server
npm install
```

3. **Install frontend dependencies:**

```bash
cd ../client
npm install
```

4. **Configure environment variables:**

```bash
# Copy the example env file
cp server/.env.example server/.env

# Edit server/.env with your configuration
```

### Environment Variables Setup

Update `server/.env` with your actual values:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password

# Razorpay Configuration (Test Mode)
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret

# Google Sheets API Configuration
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_SHEET_ID=your_google_sheet_id

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Running the Application

1. **Start MongoDB** (if using local MongoDB)

2. **Run backend server:**

```bash
cd server
npm run dev
```

3. **Run frontend development server:**

```bash
cd client
npm run dev
```

4. **Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔐 Admin Setup

To create an admin account:

1. **Using MongoDB Compass or mongo shell:**

```javascript
// Connect to your MongoDB database
use technovate2026

// Insert admin user
db.admins.insertOne({
  username: "admin",
  password: "$2b$10$your_hashed_password_here", // Use bcrypt to hash
  role: "admin",
  createdAt: new Date()
})
```

2. **Or use the API endpoint:**

```bash
# First login with super admin to create other admins
POST /api/admin/create
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
```

**Default Demo Credentials:**

- Username: `admin`
- Password: `admin123`

## 💳 Payment Integration (Razorpay)

1. **Create Razorpay Account:**

   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Create a test account
   - Get your API keys from Settings > API Keys

2. **Update .env file:**

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```

3. **Test Payments:**
   - Use test cards provided by Razorpay
   - All payments are in test mode

## 📧 Email Configuration

1. **Gmail Setup:**

   - Enable 2-factor authentication
   - Generate App Password
   - Use App Password in EMAIL_PASS

2. **Alternative Email Services:**
   - Update nodemailer configuration in `server/utils/email.js`
   - Supported services: Gmail, Outlook, Yahoo, etc.

## 📊 Google Sheets Integration

1. **Create Google Service Account:**

   - Go to Google Cloud Console
   - Create a new project
   - Enable Google Sheets API
   - Create service account credentials
   - Download JSON key file

2. **Share Google Sheet:**

   - Create Google Sheet
   - Share with service account email
   - Grant Editor access

3. **Update .env:**

```env
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour_key_here\n-----END PRIVATE KEY-----\n
GOOGLE_SHEET_ID=your_sheet_id_from_url
```

## 🚀 Deployment

### Backend Deployment (Render/Heroku)

1. **Prepare for deployment:**

```bash
# In server directory
npm install
```

2. **Create deployment configuration:**

```javascript
// server.js - Update for production
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
```

3. **Environment variables on platform:**
   - Add all .env variables to deployment platform
   - Update MONGODB_URI to production database
   - Update FRONTEND_URL to production frontend URL

### Frontend Deployment (Vercel/Netlify)

1. **Build for production:**

```bash
cd client
npm run build
```

2. **Update API URL:**

```javascript
// In your API service files
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-url.com/api"
    : "http://localhost:5000/api";
```

3. **Deploy build folder:**
   - Upload `dist` folder to hosting platform
   - Configure environment variables if needed

### Production Checklist

- [ ] Update all environment variables
- [ ] Use production MongoDB database
- [ ] Configure proper email service
- [ ] Set up SSL/HTTPS
- [ ] Configure domain names
- [ ] Set up monitoring and logging
- [ ] Test all features in production
- [ ] Set up backup strategies

## 📱 API Endpoints

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### Registrations

- `POST /api/registrations` - Create registration
- `GET /api/registrations` - Get all registrations (admin)
- `GET /api/registrations/:id` - Get registration by ID
- `GET /api/registrations/reg/:regId` - Get by registration ID
- `PUT /api/registrations/:id/payment` - Update payment status
- `GET /api/registrations/export/csv` - Export to CSV (admin)

### Admin

- `POST /api/admin/login` - Admin login
- `POST /api/admin/create` - Create admin (super admin)
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/registrations/recent` - Get recent registrations
- `PUT /api/admin/registrations/:id/verify-payment` - Verify manual payment

### Attendance

- `POST /api/attendance/mark` - Mark attendance
- `GET /api/attendance/stats` - Get attendance statistics
- `GET /api/attendance/registrations` - Get attendance records

## 🎨 Customization

### Theme Colors

Modify `client/src/index.css` and `tailwind.config.js`:

```css
/* Update color palette */
:root {
  --primary: #8a2be2; /* Purple */
  --secondary: #ff1493; /* Pink */
  --accent: #00ffff; /* Cyan */
}
```

### Event Data

Update mock data in:

- `client/src/pages/Events.jsx`
- `client/src/pages/Home.jsx`

### Email Templates

Modify HTML templates in:

- `server/utils/email.js`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@technovate2026.com or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Event organizers and participants
- Open source community
- All contributors and supporters

---

**Technovate 2026** - Where Innovation Meets Excellence 🚀
