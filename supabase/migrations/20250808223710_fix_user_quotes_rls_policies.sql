-- Fix RLS policies for user_quotes table to allow status transitions
-- This migration addresses the issue where users cannot submit their draft quotes

-- Drop existing policies
DROP POLICY IF EXISTS "Combined update policy for quotes" ON user_quotes;
DROP POLICY IF EXISTS "Users can create quotes" ON user_quotes;
DROP POLICY IF EXISTS "Combined select policy for quotes" ON user_quotes;

-- Policy 1: Users can view their own quotes (or admins can view all)
CREATE POLICY "Users can view their own quotes"
ON user_quotes FOR SELECT
TO authenticated
USING (
  is_admin() OR 
  auth.uid() = user_id
);

-- Policy 2: Users can insert their own quotes
CREATE POLICY "Users can insert their own quotes"
ON user_quotes FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

-- Policy 3: Users can update fields in their draft quotes (but not change status)
CREATE POLICY "Users can update their draft quotes fields"
ON user_quotes FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id
  AND status = 'draft'
)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'draft'
);

-- Policy 4: Users can submit their draft quotes (change status from draft to submitted)
CREATE POLICY "Users can submit their draft quotes"
ON user_quotes FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id
  AND status = 'draft'
)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'submitted'
);

-- Policy 5: Admin can update any quote
CREATE POLICY "Admin can update any quote"
ON user_quotes FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Policy 6: Admin can delete any quote (optional, for cleanup)
CREATE POLICY "Admin can delete any quote"
ON user_quotes FOR DELETE
TO authenticated
USING (is_admin());

-- Add comment explaining the policies
COMMENT ON TABLE user_quotes IS 'User quotes table with RLS policies that allow:
1. Users to view their own quotes
2. Users to create new quotes
3. Users to update their draft quotes
4. Users to submit (transition from draft to submitted) their quotes
5. Users cannot modify quotes after submission
6. Admins have full access to all quotes';