-- Fix RLS policies for remaining tables

-- Enable RLS on junction and supporting tables
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_platforms ENABLE ROW LEVEL SECURITY;

-- Public read policies for supporting tables
-- These should be readable if their parent tool is approved

CREATE POLICY "Allow public read on screenshots for approved tools"
ON screenshots FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM tools
    WHERE tools.id = screenshots.tool_id
    AND tools.status = 'approved'
  )
);

CREATE POLICY "Allow public read on pricing_tiers for approved tools"
ON pricing_tiers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM tools
    WHERE tools.id = pricing_tiers.tool_id
    AND tools.status = 'approved'
  )
);

CREATE POLICY "Allow public read on features for approved tools"
ON features FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM tools
    WHERE tools.id = features.tool_id
    AND tools.status = 'approved'
  )
);

CREATE POLICY "Allow public read on tool_tags for approved tools"
ON tool_tags FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM tools
    WHERE tools.id = tool_tags.tool_id
    AND tools.status = 'approved'
  )
);

CREATE POLICY "Allow public read on tool_platforms for approved tools"
ON tool_platforms FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM tools
    WHERE tools.id = tool_platforms.tool_id
    AND tools.status = 'approved'
  )
);

-- Analytics should be write-only for public
CREATE POLICY "Allow public insert on analytics"
ON analytics FOR INSERT
WITH CHECK (true);

-- Only allow reading analytics in authenticated/admin contexts (handled by service role)
CREATE POLICY "Restrict analytics reads"
ON analytics FOR SELECT
USING (false);
