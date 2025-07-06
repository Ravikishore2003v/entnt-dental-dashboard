import React, { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/localStorageUtils";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dob: "",
    contact: "",
    healthInfo: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Load saved patients when page opens
  useEffect(() => {
    const data = getFromStorage("patients");
    setPatients(data);
  }, []);

  // For input box changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingId) {
      // update existing patient
      updated = patients.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p));
      setEditingId(null);
    } else {
      // add new patient
      updated = [...patients, { ...formData, id: Date.now().toString() }];
    }

    setPatients(updated);
    saveToStorage("patients", updated);
    setFormData({ id: "", name: "", dob: "", contact: "", healthInfo: "" });
  };

  const handleEdit = (id) => {
    const patient = patients.find((p) => p.id === id);
    setFormData(patient);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    saveToStorage("patients", updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient Management</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6 max-w-md">
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded w-full" />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="p-2 border rounded w-full" />
        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required className="p-2 border rounded w-full" />
        <textarea name="healthInfo" placeholder="Health Info" value={formData.healthInfo} onChange={handleChange} className="p-2 border rounded w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <div key={patient.id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>DOB:</strong> {patient.dob}</p>
            <p><strong>Contact:</strong> {patient.contact}</p>
            <p><strong>Health Info:</strong> {patient.healthInfo}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(patient.id)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(patient.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
