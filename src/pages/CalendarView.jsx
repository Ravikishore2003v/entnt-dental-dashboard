// src/pages/CalendarView.jsx
import React, { useEffect, useState } from "react";
import { getFromStorage } from "../utils/localStorageUtils";

const CalendarView = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [appointmentsForDay, setAppointmentsForDay] = useState([]);

  useEffect(() => {
    const stored = getFromStorage("appointments");
    setAppointments(stored);
  }, []);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    const filtered = appointments.filter((app) =>
      app.date.startsWith(selected)
    );
    setAppointmentsForDay(filtered);
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">📅 Calendar View</h2>

      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="p-2 border rounded mb-4"
      />

      {appointmentsForDay.length === 0 ? (
        <p>No appointments for this date.</p>
      ) : (
        <div className="grid gap-4">
          {appointmentsForDay.map((a) => (
            <div key={a.id} className="border p-4 rounded shadow">
              <p><strong>Patient:</strong> {a.patientId}</p>
              <p><strong>Title:</strong> {a.title}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Cost:</strong> ₹{a.cost}</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
