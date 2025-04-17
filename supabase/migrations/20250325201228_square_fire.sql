/*
  # Create jobs table

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text)
      - `channel` (text)
      - `description` (text)
      - `deadline` (date)
      - `credits` (integer)
      - `status` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
      - `business_id` (uuid, foreign key to users)
      - `editor_id` (uuid, foreign key to users, nullable)

  2. Security
    - Enable RLS on `jobs` table
    - Add policies for business owners and editors
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  channel text NOT NULL,
  description text NOT NULL,
  deadline date NOT NULL,
  credits integer NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  business_id uuid REFERENCES auth.users(id),
  editor_id uuid REFERENCES auth.users(id)
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Business owners can read and write their own jobs
CREATE POLICY "Business owners can manage their jobs"
  ON jobs
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id);

-- Editors can read all jobs and update jobs assigned to them
CREATE POLICY "Editors can read all jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Editors can update their assigned jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = editor_id);