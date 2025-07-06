 ENTNT Dental Center Management Dashboard

This project is a frontend-only dental management dashboard built using React. It includes login functionality for Admin and Patient roles, along with features like patient management, appointment scheduling, calendar view, and dashboard KPIs. All data is stored and managed using localStorage only.

Login Credentials

Admin:
- Email: admin@entnt.in
- Password: admin123

Patient:
- Email: john@entnt.in
- Password: patient123

Live Demo

The project is deployed and can be accessed here:  
https://entnt-dental-dashboard-nine.vercel.app

Technologies Used

- React (Functional components)
- React Router
- Tailwind CSS
- Context API
- localStorage (No backend or APIs used)

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

- Role-based login for Admin and Patient
- Add, view, and delete patients (admin only)
- Appointment management
- Simple calendar view
- Dashboard KPIs: total revenue, appointment stats, upcoming appointments
- Data persistence using localStorage
- Fully responsive and mobile-friendly UI

Project Highlights

- No backend or external APIs
- No third-party auth or database
- Entirely frontend-based with realistic workflows
- Built as per ENTNT’s technical assessment requirements

GitHub Repository

https://github.com/Ravikishore2003v/entnt-dental-dashboard

Live App Link

https://entnt-dental-dashboard-nine.vercel.app
