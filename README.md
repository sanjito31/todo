# To Do List App

> A sleek, calendar-centric task manager designed to help you organize, prioritize, and conquer your day.

<br />

## 🚀 Live Demo

Check out the live version: [todo-xi-vert.vercel.app](https://todo-xi-vert.vercel.app)

<br />

## 📋 Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Configuration](#configuration)
* [Available Scripts](#available-scripts)
* [Folder Structure](#folder-structure)
* [Future Enhancements](#future-enhancements)
* [Contributing](#contributing)
* [License](#license)

<br />

## 🌟 Overview

This To Do List App is a minimal yet powerful task management tool built with modern web technologies. It integrates a calendar-based interface to give you an at-a-glance view of your tasks for any day. Whether you’re juggling personal errands or planning a complex project at work, this app helps you stay on top of your schedule with ease.

<br />

## 🔑 Key Features

* **Next.js & React with TypeScript**: Robust foundation for server-side rendering, static optimization, and type-safe components.
* **Calendar-Centric UI**: Quickly navigate between days to see and manage your tasks in a date-focused layout.
* **Modern Styling**: Utilizes shadcn/ui components for a polished, responsive design out of the box.
* **Persistent Storage**: Tasks are stored in a PostgreSQL database via Prisma ORM for reliable, scalable data management.
* **Secure Auth**: User authentication and authorization implemented with AuthJS:

  * Social logins via Google and GitHub
  * Traditional email/password registration (passwords hashed and never stored in plaintext)
  * Protected routes for private pages
* **Seamless Deployment**: Hosted on Vercel for fast global delivery and automatic CI/CD.

<br />

## 🛠️ Tech Stack

* **Framework**: Next.js
* **Library**: React
* **Language**: TypeScript
* **UI Components**: shadcn/ui
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Auth**: AuthJS
* **Deployment**: Vercel

<br />

## 🏁 Getting Started

### Prerequisites

* Node.js (v16 or later)
* PostgreSQL (local or hosted)

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/sanjito31/todo.git 
   cd todo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Configure environment variables**

   Follow the AuthJS getting started instructions at https://authjs.dev/getting-started/installation?framework=Next.js


   Create a `.env.local` file with the following variables:

   ```ini
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   AUTH_URL=http://localhost:3000
   AUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

   Generate the ```AUTH_SECRET``` by running:
   ```bash
   npx auth secret
   ```

   More information on setting up AuthJS can be found [here] (https://authjs.dev)  

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your app in action.

<br />

## 📦 Available Scripts

In the project directory, you can run:

* `npm run dev` — Starts the development server
* `npm run build` — Builds the application for production
* `npm start` — Runs the production build
* `npm run lint` — Lints the codebase
* `npm run prisma:studio` — Opens Prisma Studio to view and manage data

<br />

## 📁 Folder Structure

```
├── /app         # Next.js App directory (pages, api routes, layouts)
├── /components  # Reusable React components (shadcn/ui wrappers)
├── /lib         # Utilities and helper functions
├── /prisma      # Prisma schema & migrations
├── /styles      # Global CSS and Tailwind config
└── next.config.js
```

<br />

## 🔮 Future Enhancements

* **Recurring Tasks**: Schedule tasks to repeat daily, weekly, or custom intervals.
* **Drag & Drop**: Reorder tasks via intuitive drag-and-drop interactions.
* **Notifications**: Email or in-app reminders for upcoming deadlines.
* **Mobile App**: React Native companion app for on-the-go task management.

<br />

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit a pull request.

1. Fork it ([https://github.com/yourusername/todo-xi/fork](https://github.com/yourusername/todo-xi/fork))
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

<br />

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<br />

## ⚠️ Disclaimer

General Notice: This project is provided "as-is" without any warranties. Use at your own risk. The authors and contributors are not liable for any data loss, security breaches, or other issues that may arise from using this software.

Custom Auth Workflow: Please note that the credentials-based login implementation deviates from the official AuthJS documentation. A custom user authentication workflow has been implemented for this project that is used to email/password login sessions via session-token instead of JWT. Ensure you understand its operation and security implications before deploying in production by reviewing the ```/lib/auth.ts``` file in its entirety.

---

<sup>Built by Sanjay Kumar on July 14th, 2025 (v1)</sup>
