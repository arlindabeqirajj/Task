"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  id: number;
  date: string;
  start_time: string;
  doctor_name: string;
  service: string;
  end_time: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const BookingDetails = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://host.docker.internal:5000/api/bookings/${id}`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch booking details.");
        }
        return response.json();
      })
      .then((data) => setBooking(data))
      .catch((error) => {
        console.error("Error fetching booking:", error);
        setError(error.message || "An error occurred while fetching booking details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading booking details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!booking) {
    return <div>No booking details available.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <p className="mb-4">
        This Booking is with <strong>{booking.doctor_name}</strong> for{" "}
        <strong>{booking.service}</strong>. It ends at{" "}
        <strong>{booking.end_time}</strong>.
      </p>
      <Link href="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Bookings List
        </button>
      </Link>
    </div>
  );
};

export default BookingDetails;