 import React, { useEffect, useState } from "react";
import { getFromStorage } from "../utils/localStorageUtils";

const DashboardKPIs = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const apps = getFromStorage("appointments");
    const pats = getFromStorage("patients");

    setAppointments(Array.isArray(apps) ? apps : []);
    setPatients(Array.isArray(pats) ? pats : []);
  }, []);

  const totalRevenue = appointments.reduce((sum, a) => sum + Number(a.cost || 0), 0);

  const topPatients = (() => {
    const countMap = {};
    appointments.forEach((a) => {
      if (a.patientId) {
        countMap[a.patientId] = (countMap[a.patientId] || 0) + 1;
      }
    });
    const sorted = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3).map(([id, count]) => {
      const patient = patients.find((p) => p.id === id);
      return { name: patient?.name || "Unknown", count };
    });
  })();

  const pending = appointments.filter((a) => a.status !== "Completed").length;
  const completed = appointments.filter((a) => a.status === "Completed").length;

  const nextAppointments = appointments
    .filter((a) => new Date(a.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-semibold">💰 Total Revenue</h3>
        <p className="text-xl font-bold">₹ {totalRevenue}</p>
      </div>

      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-semibold">⏳ Pending / ✅ Completed</h3>
        <p className="text-lg">Pending: {pending}</p>
        <p className="text-lg">Completed: {completed}</p>
      </div>

      <div className="p-4 border rounded shadow col-span-2">
        <h3 className="text-lg font-semibold">🔝 Top Patients</h3>
        {topPatients.length === 0 ? (
          <p>No data yet</p>
        ) : (
          topPatients.map((p, idx) => (
            <p key={idx}>
              {idx + 1}. {p.name} – {p.count} visits
            </p>
          ))
        )}
      </div>

      <div className="p-4 border rounded shadow col-span-4">
        <h3 className="text-lg font-semibold mb-2">🗓️ Next 10 Appointments</h3>
        {nextAppointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          nextAppointments.map((a, i) => {
            const patient = patients.find((p) => p.id === a.patientId);
            return (
              <div key={i} className="border-b py-1">
                <strong>{a.title}</strong> with {patient?.name || "Unknown"} on {a.date}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashboardKPIs;
