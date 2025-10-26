#!/bin/bash

BIN_ID="68fe03f543b1c97be9820c82"
API_KEY="$2a$10$JlQIfQidL6uR0Or4pSDDweDi48ntr3veYERyu9AN/uwklBgtI26fG"
API_URL="https://api.jsonbin.io/v3/b"

echo "=== JSONBin.io Test Script ==="
echo ""
echo "Bin ID: $BIN_ID"
echo "API URL: $API_URL/$BIN_ID"
echo ""

# Test 1: Fetch data
echo "1. Testing FETCH (GET)..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$API_URL/$BIN_ID/latest" \
  -H "X-Master-Key: $API_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "   HTTP Status: $HTTP_CODE"
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Success!"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo "   ❌ Error:"
    echo "$BODY"
fi
echo ""

# Test 2: Create/Update data
echo "2. Testing CREATE/UPDATE (PUT)..."
TEST_DATA='{"attendees":[],"ipRecords":[]}'

RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "$API_URL/$BIN_ID" \
  -H "Content-Type: application/json" \
  -H "X-Master-Key: $API_KEY" \
  -d "$TEST_DATA")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "   HTTP Status: $HTTP_CODE"
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Success!"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo "   ❌ Error:"
    echo "$BODY"
fi
echo ""

echo "=== Test Complete ==="
