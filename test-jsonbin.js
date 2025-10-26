// test-jsonbin.js
// Script testing untuk JSONBin.io

const JSONBIN_API_URL = "https://api.jsonbin.io/v3/b";
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || "68fe03f543b1c97be9820c82";
const JSONBIN_API_KEY =
  process.env.JSONBIN_API_KEY ||
  "$2a$10$JlQIfQidL6uR0Or4pSDDweDi48ntr3veYERyu9AN/uwklBgtI26fG";

console.log("=== JSONBin.io Test Script ===\n");
console.log("Bin ID:", JSONBIN_BIN_ID);
console.log("API Key:", JSONBIN_API_KEY.substring(0, 20) + "...");
console.log("");

// Test data
const testData = {
  attendees: [],
  ipRecords: [],
};

// Test 1: Fetch data
async function testFetch() {
  console.log("1. Testing FETCH (GET)...");
  try {
    const response = await fetch(
      `${JSONBIN_API_URL}/${JSONBIN_BIN_ID}/latest`,
      {
        headers: {
          "X-Master-Key": JSONBIN_API_KEY,
        },
      }
    );

    console.log("   Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("   ✅ Success! Data:", JSON.stringify(data.record, null, 2));
    } else {
      const error = await response.text();
      console.log("   ❌ Error:", error);
    }
  } catch (error) {
    console.log("   ❌ Exception:", error.message);
  }
  console.log("");
}

// Test 2: Create/Update data
async function testCreate() {
  console.log("2. Testing CREATE/UPDATE (PUT)...");
  try {
    const response = await fetch(`${JSONBIN_API_URL}/${JSONBIN_BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_API_KEY,
      },
      body: JSON.stringify(testData),
    });

    console.log("   Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("   ✅ Success! Response:", JSON.stringify(data, null, 2));
    } else {
      const error = await response.text();
      console.log("   ❌ Error:", error);
    }
  } catch (error) {
    console.log("   ❌ Exception:", error.message);
  }
  console.log("");
}

// Test 3: Insert test RSVP
async function testInsertRSVP() {
  console.log("3. Testing INSERT RSVP...");

  // First fetch current data
  try {
    const fetchResponse = await fetch(
      `${JSONBIN_API_URL}/${JSONBIN_BIN_ID}/latest`,
      {
        headers: {
          "X-Master-Key": JSONBIN_API_KEY,
        },
      }
    );

    if (!fetchResponse.ok) {
      console.log("   ❌ Cannot fetch existing data");
      return;
    }

    const existing = await fetchResponse.json();
    let data = existing.record || { attendees: [], ipRecords: [] };

    // Add test attendee
    const newAttendee = {
      id: Date.now().toString(),
      name: "Test User",
      attendance: "yes",
      guestCount: "2",
      message: "This is a test RSVP",
      submittedAt: new Date().toISOString(),
    };

    if (!data.attendees) data.attendees = [];
    data.attendees.push(newAttendee);

    // Save back
    const putResponse = await fetch(`${JSONBIN_API_URL}/${JSONBIN_BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (putResponse.ok) {
      console.log("   ✅ Test RSVP inserted successfully!");
      console.log("   Attendee:", JSON.stringify(newAttendee, null, 2));
    } else {
      const error = await putResponse.text();
      console.log("   ❌ Error:", error);
    }
  } catch (error) {
    console.log("   ❌ Exception:", error.message);
  }
  console.log("");
}

// Run all tests
async function runTests() {
  await testFetch();
  await testCreate();
  await testInsertRSVP();
  console.log("=== Test Complete ===");
}

runTests();
