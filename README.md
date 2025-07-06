 ENTNT Dental Center Management Dashboard

This project is a frontend-only dental management dashboard built using React. It includes login functionality for Admin and Patient roles, patient management, appointment scheduling, calendar view, and dashboard KPIs. All data is stored using localStorage. No backend or external APIs were used as per the assignment requirements.

Login Credentials

Admin:
Email: admin@entnt.in
Password: admin123

Patient:
Email: john@entnt.in
Password: patient123

Live Demo

https://entnt-dental-dashboard-nine.vercel.app

Technologies Used

React (functional components)
React Router
Context API
Tailwind CSS
localStorage only (no APIs, no backend)

Folder Structure

src/
  pages/
    LoginPage.jsx
    AdminDashboard.jsx
    PatientDashboard.jsx
    PatientList.jsx
    AppointmentList.jsx
    CalendarView.jsx
    DashboardKPIs.jsx
  utils/
    localStorageUtils.js
    roleUtils.js
  styles/
    main.css
  App.js
  index.js

Features

- Admin and Patient role-based login
- View and manage patient data (admin only)
- Add and track appointments
- Simple calendar view for scheduling
- KPI dashboard showing revenue and stats
- Fully simulated frontend (no server)
- Responsive design

GitHub Repository

https://github.com/Ravikishore2003v/entnt-dental-dashboard

Live App Link

https://entnt-dental-dashboard-nine.vercel.app
