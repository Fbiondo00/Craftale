#!/bin/bash

echo "🔍 Verifying comprehensive views migration..."
echo "============================================"

MIGRATION_FILE="supabase/migrations/20240724030000_comprehensive_pricing_views.sql"

# Check if file exists
if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Migration file not found at: $MIGRATION_FILE"
    exit 1
fi

# Check for problematic patterns
echo "Checking for known issues..."

# Check for ANY() operator
if grep -n "ANY(" "$MIGRATION_FILE" > /dev/null; then
    echo "❌ Found ANY() operator (should be ? operator):"
    grep -n "ANY(" "$MIGRATION_FILE"
else
    echo "✅ No ANY() operators found (correct)"
fi

# Check for double ->> operator
if grep -n -E "->>'[^']*'->>" "$MIGRATION_FILE" > /dev/null 2>&1; then
    echo "❌ Found double ->> operators (should be -> then ->>):"
    grep -n -E "->>'[^']*'->>" "$MIGRATION_FILE"
else
    echo "✅ No double ->> operators found (correct)"
fi

# Check for array_length with JSONB columns
if grep -n "array_length.*selected_services\|array_length.*questions" "$MIGRATION_FILE" > /dev/null; then
    echo "❌ Found array_length() with JSONB columns (should be jsonb_array_length()):"
    grep -n "array_length.*selected_services\|array_length.*questions" "$MIGRATION_FILE"
else
    echo "✅ No array_length() with JSONB columns found (correct)"
fi

# Show specific lines mentioned in errors
echo ""
echo "Line 80 content:"
sed -n '80p' "$MIGRATION_FILE"

echo ""
echo "Line 132 content:"
sed -n '132p' "$MIGRATION_FILE"

# Calculate file hash for verification
echo ""
echo "File hash (for verification):"
shasum -a 256 "$MIGRATION_FILE" | cut -d' ' -f1

echo ""
echo "If the above checks show ✅ for both, the file is correct."
echo "Clear your Supabase SQL editor and paste the migration fresh."