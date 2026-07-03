-- Migration: 001_create_page_sections
-- Creates the page_sections table with RLS for public read / authenticated write.

CREATE TABLE IF NOT EXISTS page_sections (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text        NOT NULL UNIQUE,
  content     jsonb       NOT NULL,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER page_sections_updated_at
BEFORE UPDATE ON page_sections
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Row Level Security
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Public (anon) can read any row — site renders content publicly
CREATE POLICY "public_select"
  ON page_sections
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated role may write (INSERT / UPDATE / DELETE)
CREATE POLICY "auth_insert"
  ON page_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "auth_update"
  ON page_sections
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_delete"
  ON page_sections
  FOR DELETE
  TO authenticated
  USING (true);
