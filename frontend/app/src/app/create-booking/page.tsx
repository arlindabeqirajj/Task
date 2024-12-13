'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    doctor_name: '',
    service: '',
    end_time: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Basic validation (client-side)
    if (!formData.date || !formData.start_time || !formData.doctor_name || !formData.service || !formData.end_time) {
      setErrors(['All fields are required']);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/'); // Redirect to the home page
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || ['An unknown error occurred']);
      }
    } catch (error) {
      console.error('Error:', error);  // Log error for debugging
      setErrors(['Failed to connect to the server.']);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Doctor Name</label>
          <input
            type="text"
            name="doctor_name"
            placeholder="Doctor Name"
            value={formData.doctor_name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Service</label>
          <input
            type="text"
            name="service"
            placeholder="Service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {errors.length > 0 && (
        <div className="mt-4 text-red-500">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateBooking;