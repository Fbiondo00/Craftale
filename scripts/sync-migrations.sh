#!/bin/bash

# =====================================================
# Supabase Migration Sync Script
# =====================================================
# This script helps synchronize migrations that were
# manually executed with Supabase's migration tracking
# =====================================================

echo "🔄 Supabase Migration Sync Tool"
echo "================================"

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "   brew install supabase/tap/supabase"
    exit 1
fi

# Function to check migration status
check_migration_status() {
    echo -e "\n📋 Current Migration Status:"
    echo "----------------------------"
    
    # List local migrations
    echo -e "\n📁 Local migration files:"
    ls -la supabase/migrations/*.sql 2>/dev/null || echo "No migration files found"
    
    # Check if we can connect to the database
    echo -e "\n🔍 Checking database connection..."
    supabase db remote list 2>/dev/null || {
        echo "⚠️  Cannot connect to remote database. Make sure you're linked to a project:"
        echo "   supabase link --project-ref YOUR_PROJECT_REF"
        return 1
    }
}

# Function to mark migrations as applied
mark_migrations_applied() {
    echo -e "\n🏷️  Marking migrations as applied..."
    
    # Run the marking migration
    supabase db push --dry-run || {
        echo "❌ Dry run failed. Please check your migrations."
        return 1
    }
    
    read -p "Do you want to apply the migration marking? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        supabase db push
        echo "✅ Migrations marked as applied"
    else
        echo "❌ Cancelled"
    fi
}

# Function to create migration from existing SQL
create_migration_from_sql() {
    local sql_file=$1
    local migration_name=$2
    
    if [ -z "$sql_file" ] || [ -z "$migration_name" ]; then
        echo "Usage: create_migration_from_sql <sql_file> <migration_name>"
        return 1
    fi
    
    # Create new migration
    supabase migration new "$migration_name"
    
    # Find the newly created migration file
    newest_migration=$(ls -t supabase/migrations/*.sql | head -1)
    
    # Copy content
    cp "$sql_file" "$newest_migration"
    echo "✅ Created migration: $newest_migration"
}

# Main menu
show_menu() {
    echo -e "\n🛠️  What would you like to do?"
    echo "1. Check migration status"
    echo "2. Mark already-executed migrations as applied"
    echo "3. Create migration from existing SQL file"
    echo "4. Push all pending migrations"
    echo "5. Show migration history from database"
    echo "6. Exit"
    
    read -p "Select option (1-6): " choice
    
    case $choice in
        1)
            check_migration_status
            show_menu
            ;;
        2)
            mark_migrations_applied
            show_menu
            ;;
        3)
            read -p "Enter SQL file path: " sql_file
            read -p "Enter migration name: " migration_name
            create_migration_from_sql "$sql_file" "$migration_name"
            show_menu
            ;;
        4)
            echo -e "\n📤 Pushing migrations..."
            supabase db push
            show_menu
            ;;
        5)
            echo -e "\n📜 Migration history:"
            supabase db remote query "SELECT version, inserted_at FROM supabase_migrations.schema_migrations ORDER BY version DESC LIMIT 10;"
            show_menu
            ;;
        6)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option"
            show_menu
            ;;
    esac
}

# Start the script
check_migration_status
show_menu