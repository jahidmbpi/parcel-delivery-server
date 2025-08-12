# 📦 Parcel Delivery API

**Project Name:** Parcel Delivery API (হোস্টেল / Parcel Delivery সিস্টেম)  
**Author:** [Your Name]  
**Version:** 1.0.0

---

## 📖 Overview

**Parcel Delivery API** একটি সম্পূর্ণ **backend** সিস্টেম যা **Node.js**, **Express.js** এবং **MongoDB** ব্যবহার করে তৈরি।  
এতে রয়েছে:

- Role-Based Access Control
- JWT Authentication
- Parcel Tracking ও Status History
- নিরাপদ Data Handling

📌 এই সিস্টেম কুরিয়ার সার্ভিস, হোস্টেল ডেলিভারি ম্যানেজমেন্ট বা যেকোনো ডেলিভারি সিস্টেমের জন্য উপযুক্ত।

---

## ✨ Features

- 🔑 **JWT Authentication** সহ ইউজার রেজিস্ট্রেশন ও লগইন
- 👥 **Role-based Access:** `admin`, `sender`, `receiver`
- 📦 Parcel তৈরি, আপডেট, ক্যান্সেল, ট্র্যাকিং এবং **status** পরিবর্তন
- 🕒 Tracking events সহ **timestamps** এবং **updatedBy**
- 🔍 Parcel filter ও pagination (status, তারিখ, sender, receiver অনুসারে)
- ✅ Strong validation এবং custom error handling

---

## 🔒 Security

| বিষয়                      | বর্ণনা                                                             |
| ------------------------- | ------------------------------------------------------------------ |
| **Authentication**        | JWT ভিত্তিক token authentication                                   |
| **Authorization**         | Role-based route protection                                        |
| **Password Security**     | bcrypt দিয়ে hashing                                                |
| **Data Validation**       | Joi / express-validator দিয়ে ইনপুট যাচাই                           |
| **Environment Variables** | `.env` ফাইলে সংরক্ষিত secret key, database URI, এবং sensitive তথ্য |
| **Error Handling**        | Centralized error handler ও HTTP status code স্ট্যান্ডার্ডাইজেশন   |

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** (`jsonwebtoken`)
- **bcrypt**
- **dotenv**
- **http-status-codes**

---

## 📌 Requirements

- **Node.js** (v16+)
- **npm** বা **yarn**
- **MongoDB** (লোকাল বা Atlas)

---

## ⚙️ Setup

```bash
# রিপো ক্লোন করুন
git clone <repo-url>
cd <repo-folder>

# Dependencies ইনস্টল করুন
npm install
```
