# PromptBay 🚀

PromptBay is a full-stack AI prompt marketplace and management platform where users can discover, save, copy, purchase, and manage high-quality AI prompts. The platform supports role-based access for users, creators, and administrators, along with secure authentication, payments, bookmarks, analytics, and prompt management tools.

## 🌐 Live Demo

Frontend:https://promptbay-client.vercel.app

Backend API: https://promptbay-server.vercel.app

---

## ✨ Features

### 👤 Authentication & Authorization

- Email & password authentication
- Google social login with Better Auth
- JWT-based authentication
- Role-based access control
- Protected routes
- User session management

### 📝 Prompt Management

- Browse AI prompts
- Search prompts
- Filter by category
- View prompt details
- Copy prompts instantly
- Bookmark favorite prompts
- Track prompt usage

### 🎨 Creator Dashboard

- Create prompts
- Edit prompts
- Delete prompts
- Upload prompt thumbnails
- Track prompt performance
- Manage prompt inventory

### 💳 Premium Membership

- Stripe payment integration
- Multiple subscription plans
- Premium content access
- Membership management

### 📊 Dashboard Analytics

#### User Dashboard

- Saved prompts
- Bookmarked prompts
- Purchase history
- Profile management

#### Creator Dashboard

- Prompt statistics
- Earnings overview
- Prompt performance tracking

#### Admin Dashboard

- User management
- Creator management
- Prompt moderation
- Platform analytics

### 📬 Contact System

- Contact form
- User inquiries management

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- Tailwind CSS 4
- React Hook Form
- Zod Validation
- Axios
- Framer Motion
- Recharts
- Sonner
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT
- Cloudinary
- Stripe
- Nodemailer

### Database

- MongoDB Atlas

### Deployment

- Vercel (Frontend)
- Render / Railway (Backend)

---

## 📂 Project Structure

```bash
promptbay-client/
├── src/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   └── providers/
│
promptbay-server/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── lib/
│   └── utils/