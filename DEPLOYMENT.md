# Technovate 2026 - Deployment Guide

## 🚀 Deployment Instructions

### 1. Local Development Setup

**Prerequisites:**

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

**Setup Steps:**

1. **Clone and Install Dependencies:**

```bash
git clone <repository-url>
cd technovate-2026

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

2. **Configure Environment Variables:**

```bash
# Copy environment file
cp server/.env.example server/.env

# Edit server/.env with your configuration
```

3. **Seed Database:**

```bash
# From project root
npm run seed
```

4. **Start Development Servers:**

```bash
# Start both frontend and backend
npm run dev

# Or start separately:
# Backend: cd server && npm run dev
# Frontend: cd client && npm run dev
```

**Access URLs:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 2. Production Deployment

#### Backend Deployment (Render/Heroku)

**Steps:**

1. **Prepare Application:**

```bash
# In server directory
npm install
```

2. **Create Deployment Configuration:**

```javascript
// server.js - Ensure production-ready configuration
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Add CORS for production
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
```

3. **Environment Variables (Platform Settings):**

```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_production_jwt_secret
EMAIL_USER=your_production_email@gmail.com
EMAIL_PASS=your_production_email_app_password
RAZORPAY_KEY_ID=your_production_razorpay_key_id
RAZORPAY_KEY_SECRET=your_production_razorpay_key_secret
GOOGLE_CLIENT_EMAIL=your_production_service_account_email
GOOGLE_PRIVATE_KEY=your_production_private_key
GOOGLE_SHEET_ID=your_production_sheet_id
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

4. **Deployment Platforms:**

- **Render**: Connect GitHub repo → Auto-deploy
- **Heroku**: `git push heroku main`
- **Railway**: Import from GitHub

#### Frontend Deployment (Vercel/Netlify)

**Steps:**

1. **Build Production Version:**

```bash
cd client
npm run build
```

2. **Configure Environment Variables:**

```env
VITE_API_URL=https://your-backend-domain.com/api
```

3. **Update API Configuration:**

```javascript
// In your API service files
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

4. **Deployment Platforms:**

- **Vercel**: Connect GitHub repo → Auto-deploy
- **Netlify**: Drag and drop `dist` folder or connect to Git

### 3. Database Setup

#### MongoDB Atlas (Recommended for Production)

1. **Create Atlas Account:**

   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Get connection string

2. **Configure Database:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/technovate2026
```

3. **Seed Production Database:**

```bash
# Update seed.js with production connection
node server/seed.js
```

### 4. Email Configuration

#### Gmail Setup (Production)

1. **Enable App Passwords:**

   - Enable 2-factor authentication
   - Generate App Password
   - Use 16-character app password

2. **Environment Configuration:**

```env
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

#### Alternative Email Services

**SendGrid:**

```javascript
// server/utils/email.js
const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### 5. Payment Integration (Razorpay)

#### Production Setup

1. **Create Razorpay Account:**

   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Activate live mode
   - Get live API keys

2. **Update Configuration:**

```env
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
```

3. **Webhook Configuration:**
   - Set webhook URL: `https://your-backend.com/api/razorpay/webhook`
   - Enable payment events
   - Generate webhook secret

### 6. Google Sheets Integration

#### Production Setup

1. **Create Service Account:**

   - Google Cloud Console → IAM & Admin
   - Create service account
   - Download JSON key
   - Enable Google Sheets API

2. **Share Google Sheet:**

   - Create spreadsheet
   - Share with service account email
   - Grant Editor permissions

3. **Environment Configuration:**

```env
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour_key_here\n-----END PRIVATE KEY-----\n
GOOGLE_SHEET_ID=your_sheet_id_from_url
```

### 7. Domain and SSL

#### Custom Domain Setup

1. **Frontend Domain:**

   - Vercel/Netlify domain settings
   - Add custom domain
   - Configure DNS records

2. **Backend Domain:**

   - Render/Heroku custom domains
   - SSL certificate (auto-provisioned)
   - Update CORS configuration

3. **Environment Updates:**

```env
FRONTEND_URL=https://your-custom-domain.com
```

### 8. Monitoring and Maintenance

#### Essential Monitoring

1. **Application Monitoring:**

   - Log errors and exceptions
   - Monitor API response times
   - Track user registrations

2. **Database Monitoring:**

   - Connection pool monitoring
   - Query performance
   - Storage usage

3. **Payment Monitoring:**
   - Failed payment tracking
   - Refund processing
   - Revenue reporting

#### Backup Strategy

1. **Database Backups:**

   - MongoDB Atlas automated backups
   - Daily backup schedule
   - Point-in-time recovery

2. **File Backups:**
   - QR codes and generated files
   - Email templates
   - Configuration files

### 9. Security Considerations

#### Production Security

1. **Environment Variables:**

   - Never commit .env files
   - Use platform secrets management
   - Rotate secrets regularly

2. **API Security:**

   - Rate limiting
   - Input validation
   - Authentication middleware

3. **Data Protection:**
   - HTTPS everywhere
   - Secure headers
   - CORS configuration

### 10. Testing Checklist

#### Pre-Deployment Testing

- [ ] All pages load correctly
- [ ] Registration form validation works
- [ ] Payment integration tested
- [ ] Email notifications received
- [ ] QR code generation working
- [ ] Admin login functional
- [ ] Attendance marking works
- [ ] Database connections stable
- [ ] API endpoints responding
- [ ] Mobile responsiveness tested

#### Post-Deployment Testing

- [ ] Production URLs accessible
- [ ] SSL certificates valid
- [ ] Database connectivity
- [ ] Email delivery working
- [ ] Payment processing live
- [ ] Analytics tracking
- [ ] Error logging configured

### 11. Troubleshooting

#### Common Issues

1. **CORS Errors:**

   - Check FRONTEND_URL configuration
   - Verify CORS middleware setup

2. **Database Connection:**

   - Check MONGODB_URI format
   - Verify network access
   - Test connection string

3. **Email Delivery:**

   - Verify app password
   - Check spam folder
   - Test with different email

4. **Payment Failures:**
   - Check Razorpay keys
   - Verify webhook configuration
   - Test with test cards

### 12. Support and Maintenance

#### Ongoing Maintenance

1. **Regular Updates:**

   - Security patches
   - Dependency updates
   - Performance optimizations

2. **User Support:**

   - Registration issues
   - Payment problems
   - Technical assistance

3. **Event Management:**
   - Database cleanup
   - Report generation
   - Attendance tracking

---

**Need Help?** Contact: support@technovate2026.com

**Happy Deploying!** 🚀
