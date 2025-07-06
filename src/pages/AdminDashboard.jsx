import React from "react";
import { useAuth } from "../App";
import PatientList from "./PatientList";
import AppointmentList from "./AppointmentList";
import CalendarView from "./CalendarView";
import DashboardKPIs from "./DashboardKPIs";



const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <DashboardKPIs />
        
      </div>

      {/* Show the patient list */}
      <PatientList />
      <AppointmentList />
      <CalendarView />
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
    
  );
};

export default AdminDashboard;
