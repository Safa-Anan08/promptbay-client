# PromptBay – AI Prompt Marketplace Platform

## Project Overview

PromptBay is a full-stack AI Prompt Marketplace platform where users can discover, save, review, copy, and share AI prompts while creators can publish and manage prompts and admins can moderate the entire platform.

The platform supports role-based access control, premium subscriptions, prompt analytics, bookmarking, reviews, reporting, and secure authentication.

---

# Live Links

### Frontend

https://promptbay-client.vercel.app


### Backend

 https://promptbay-server.vercel.app

---

# Repository Links

### Client Repository

https://github.com/Safa-Anan08/promptbay-client/tree/main/src/app/dashboard

### Server Repository

https://github.com/Safa-Anan08/promtbay-server

---

# Technologies Used

## Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Axios
* Framer Motion
* Recharts
* React OAuth Google
* Sonner Toast
* Stripe

## Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Multer
* Cloudinary
* Google Auth Library
* Stripe API

---

# Key Features

## Authentication System

* Email + Password Registration
* JWT Authentication
* Google Login
* Persistent Session Management
* Protected Routes

---

## Role Based Access

### User

* Browse prompts
* Bookmark prompts
* Copy prompts
* Review prompts
* Upgrade subscription

### Creator

* Add prompts
* Track analytics
* Manage prompts

### Admin

* Manage users
* Moderate prompts
* View payments
* Manage reports

---

# Home Page

### Navbar

* Home
* All Prompts
* Login
* Register
* Dashboard
* Logout

### Hero Section

* AI-themed modern banner
* Search system
* Trending tags

### Featured Prompts

* Dynamic top prompts

### Top Creators

### Customer Reviews

### Extra Sections

* AI Productivity
* Premium Benefits

---

# Prompt Marketplace

## All Prompts

Features:

* Search
* Server-side filtering
* Pagination
* Sorting

Filters:

* Category
* AI Tool
* Difficulty

Sort:

* Most Popular
* Most Copied
* Latest

---

# Prompt Details

Display:

* Title
* Description
* Prompt Content
* Category
* Tool
* Tags
* Difficulty
* Creator
* Reviews
* Copy Count

Premium prompts:

* Locked content
* Stripe subscription access

---

# User Dashboard

## Add Prompt

Fields:

* Title
* Description
* Content
* Category
* Tool
* Tags
* Difficulty
* Thumbnail
* Visibility

Free users:

* Maximum 3 prompts

---

## My Prompts

* Update
* Delete

---

## Saved Prompts

* View bookmarked prompts
* Remove bookmark

---

## Reviews

* Review history

---

## Profile

* Update profile
* Upload avatar
* Change password
* Subscription management

---

# Creator Dashboard

Analytics:

* Total Prompts
* Copies
* Growth Chart

---

# Admin Dashboard

## Users

* Change role
* Delete user

## Prompts

* Approve
* Reject
* Delete
* Feature prompt

## Payments

* Payment history

## Reports

* Remove prompt
* Warn creator

---

# Payment System

Stripe Integration

Features:

* One-time premium purchase
* Secure checkout
* Transaction history
* Premium unlock

---

# Database Collections

users

prompts

bookmarks

reviews

payments

reports

---

# Security

* JWT Authentication
* Protected APIs
* Cookie Authentication
* Role Verification
* Input Validation

---

# Additional Functionalities

* Bookmark Toggle
* Copy Counter
* Review System
* Prompt Reporting
* Premium Access
* Cloudinary Upload
* Responsive Design

---

# Installation

## Client

```bash
npm install
npm run dev
```

## Server

```bash
npm install
npm run dev
```

---

# Future Improvements

* AI Prompt Testing
* Dynamic Notification System
* Infinite Scroll
* Rich Text Editor

---

Developed for Assignment Submission.
