-- Migration: 002_create_signups
-- Stores customer application submissions from the Checkout form.
-- PII table: anon INSERT only. No read access for anon or authenticated by default.
-- If Frank needs to view signups via dashboard, add a separate read policy then.

CREATE TABLE IF NOT EXISTS signups (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name  text        NOT NULL,
  last_name   text        NOT NULL,
  email       text        NOT NULL,
  phone       text,
  profile     text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Anon role may INSERT only. No SELECT, UPDATE, or DELETE.
CREATE POLICY "anon_insert"
  ON signups
  FOR INSERT
  TO anon
  WITH CHECK (true);
