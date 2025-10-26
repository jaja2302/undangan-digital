// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server";

// JSONBin.io configuration
const JSONBIN_API_URL = "https://api.jsonbin.io/v3/b";
const JSONBIN_BIN_ID = "68fe03f543b1c97be9820c82";
const JSONBIN_API_KEY =
  "$2a$10$./rPUX5Zis/LoMEn.PxvZOoe7zbWTM0pQGmGpxLVRlB1d7.Rosj1K";

// Type definitions
interface Attendee {
  id: string;
  name: string;
  attendance: string;
  guestCount: string;
  message: string;
  submittedAt: string;
}

interface IpRecord {
  ip: string;
  timestamp: number;
  attendeeId: string;
}

interface AttendanceData {
  attendees: Attendee[];
  ipRecords: IpRecord[];
}

// Fetch data from JSONBin.io
async function fetchData(): Promise<AttendanceData> {
  try {
    const response = await fetch(
      `${JSONBIN_API_URL}/${JSONBIN_BIN_ID}/latest`,
      {
        headers: {
          "X-Master-Key": JSONBIN_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const result = await response.json();
    return result.record || { attendees: [], ipRecords: [] };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { attendees: [], ipRecords: [] };
  }
}

// Save data to JSONBin.io
async function saveData(data: AttendanceData): Promise<boolean> {
  try {
    console.log("Attempting to save to JSONBin.io...");
    console.log("API URL:", `${JSONBIN_API_URL}/${JSONBIN_BIN_ID}`);
    console.log("API Key exists:", !!JSONBIN_API_KEY);
    console.log(
      "API Key (first 20 chars):",
      JSONBIN_API_KEY.substring(0, 20) + "..."
    );
    console.log("Full API Key:", JSONBIN_API_KEY);
    console.log("Bin ID:", JSONBIN_BIN_ID);
    console.log("Environment check - NODE_ENV:", process.env.NODE_ENV);

    const response = await fetch(`${JSONBIN_API_URL}/${JSONBIN_BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_API_KEY,
      },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from JSONBin:", errorText);
    } else {
      const responseData = await response.json();
      console.log("Successfully saved to JSONBin:", responseData);
    }

    return response.ok;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
}

// Get client IP address
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

// GET - Fetch all attendees
export async function GET() {
  try {
    const data = await fetchData();

    // Only return attendees, not IP records for privacy
    return NextResponse.json({
      attendees: data.attendees || [],
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST - Add new attendee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp = getClientIp(request);

    // Read current data from JSONBin.io
    const data = await fetchData();

    // Initialize arrays if they don't exist
    if (!data.attendees) data.attendees = [];
    if (!data.ipRecords) data.ipRecords = [];

    // Check if IP already submitted (within last 24 hours)
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const recentSubmission = data.ipRecords.find(
      (record: IpRecord) =>
        record.ip === clientIp && record.timestamp > oneDayAgo
    );

    if (recentSubmission) {
      const timeLeft = Math.ceil(
        (recentSubmission.timestamp + 24 * 60 * 60 * 1000 - now) /
          (60 * 60 * 1000)
      );
      return NextResponse.json(
        {
          error: `Anda sudah mengirim RSVP. Silakan coba lagi dalam ${timeLeft} jam.`,
          code: "RATE_LIMIT",
        },
        { status: 429 }
      );
    }

    // Add new attendee with timestamp
    const newAttendee: Attendee = {
      id: Date.now().toString(),
      ...body,
      submittedAt: new Date().toISOString(),
    };

    data.attendees.push(newAttendee);

    // Record IP with timestamp
    data.ipRecords.push({
      ip: clientIp,
      timestamp: now,
      attendeeId: newAttendee.id,
    });

    // Clean up old IP records (older than 30 days)
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    data.ipRecords = data.ipRecords.filter(
      (record: IpRecord) => record.timestamp > thirtyDaysAgo
    );

    // Save data to JSONBin.io
    const saveSuccess = await saveData(data);

    if (!saveSuccess) {
      throw new Error("Failed to save data to external storage");
    }

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully",
      data: newAttendee,
    });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
