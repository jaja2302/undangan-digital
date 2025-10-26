// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "attendance.json");

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

// Ensure file exists
function ensureFileExists() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          attendees: [],
          ipRecords: [],
        },
        null,
        2
      )
    );
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
    ensureFileExists();
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Only return attendees, not IP records for privacy
    return NextResponse.json({
      attendees: data.attendees || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST - Add new attendee
export async function POST(request: NextRequest) {
  try {
    ensureFileExists();
    const body = await request.json();
    const clientIp = getClientIp(request);

    // Read current data
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data: AttendanceData = JSON.parse(fileData);

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

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

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
