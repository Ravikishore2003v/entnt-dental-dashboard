// src/pages/AppointmentList.jsx
import React, { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/localStorageUtils";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    patientId: "",
    title: "",
    date: "",
    notes: "",
    cost: "",
    file: null,
    fileName: "",
    fileUrl: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setAppointments(getFromStorage("appointments"));
    setPatients(getFromStorage("patients"));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, fileName: file.name, fileUrl: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingId) {
      updated = appointments.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a));
      setEditingId(null);
    } else {
      const newApp = { ...formData, id: Date.now().toString() };
      updated = [...appointments, newApp];
    }
    setAppointments(updated);
    saveToStorage("appointments", updated);
    setFormData({
      id: "",
      patientId: "",
      title: "",
      date: "",
      notes: "",
      cost: "",
      file: null,
      fileName: "",
      fileUrl: ""
    });
  };

  const handleEdit = (id) => {
    const app = appointments.find((a) => a.id === id);
    setFormData(app);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    saveToStorage("appointments", updated);
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Appointment Management</h2>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md mb-8">
        <select name="patientId" value={formData.patientId} onChange={handleChange} required className="p-2 border rounded w-full">
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input name="title" placeholder="Appointment Title" value={formData.title} onChange={handleChange} required className="p-2 border rounded w-full" />
        <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} required className="p-2 border rounded w-full" />
        <textarea name="notes" placeholder="Notes or Comments" value={formData.notes} onChange={handleChange} className="p-2 border rounded w-full" />
        <input name="cost" type="number" placeholder="Cost" value={formData.cost} onChange={handleChange} className="p-2 border rounded w-full" />
        <input name="file" type="file" onChange={handleChange} className="p-2 border rounded w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Appointment" : "Add Appointment"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">All Appointments</h3>
      <div className="grid gap-4">
        {appointments.map((a) => {
          const patient = patients.find((p) => p.id === a.patientId);
          return (
            <div key={a.id} className="border p-4 rounded shadow">
              <p><strong>Patient:</strong> {patient?.name}</p>
              <p><strong>Title:</strong> {a.title}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Notes:</strong> {a.notes}</p>
              <p><strong>Cost:</strong> ₹{a.cost}</p>
              {a.fileName && (
                <p><strong>File:</strong> <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{a.fileName}</a></p>
              )}
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEdit(a.id)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(a.id)} className="text-red-600">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentList;
