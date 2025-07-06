 // src/pages/PatientDashboard.jsx
import React, { useEffect, useState } from "react";
import { getFromStorage } from "../utils/localStorageUtils";
import { useAuth } from "../App";

const PatientDashboard = () => {
  const { logout, user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allAppointments = getFromStorage("appointments") || [];
    const patientAppointments = allAppointments.filter(
      (a) => a.patientId === user.patientId
    );
    setAppointments(patientAppointments);
  }, [user]);

  const upcoming = appointments.filter(
    (a) => new Date(a.date) > new Date()
  );
  const past = appointments.filter(
    (a) => new Date(a.date) <= new Date()
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🗓️ Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          upcoming.map((a) => (
            <div key={a.id} className="border p-3 mb-2 rounded">
              <p><strong>Title:</strong> {a.title}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Notes:</strong> {a.notes}</p>
            </div>
          ))
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">🧾 Past Treatments</h2>
        {past.length === 0 ? (
          <p>No past treatments found.</p>
        ) : (
          past.map((a) => (
            <div key={a.id} className="border p-3 mb-2 rounded">
              <p><strong>Title:</strong> {a.title}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Cost:</strong> ₹{a.cost}</p>
              <p><strong>Status:</strong> {a.status || "N/A"}</p>
              {a.fileName && (
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={a.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {a.fileName}
                  </a>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
