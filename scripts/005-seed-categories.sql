-- Seed initial categories for Digital Blueprint

INSERT INTO categories (slug, name, description, icon, color) VALUES
('bim-software', 'BIM Software', 'Building Information Modeling tools for design, documentation, and collaboration', 'Building2', 'bg-blue-500'),
('drone-mapping', 'Drone Mapping', 'Aerial surveying and mapping solutions for construction sites', 'Drone', 'bg-green-500'),
('ar-vr', 'AR/VR', 'Augmented and Virtual Reality tools for construction visualization', 'Glasses', 'bg-purple-500'),
('estimating', 'Estimating', 'Cost estimation and bidding tools for construction projects', 'Calculator', 'bg-orange-500'),
('project-management', 'Project Management', 'Construction project management platforms and collaboration tools', 'FileText', 'bg-red-500'),
('field-tools', 'Field Tools', 'On-site construction tools and mobile apps for field workers', 'Wrench', 'bg-teal-500')
ON CONFLICT (slug) DO NOTHING;

-- Seed initial platforms
INSERT INTO platforms (name, icon) VALUES
('Web', 'Globe'),
('iOS', 'Smartphone'),
('Android', 'Smartphone'),
('Windows', 'Monitor'),
('Mac', 'Monitor'),
('Linux', 'Monitor')
ON CONFLICT (name) DO NOTHING;

-- Seed common tags
INSERT INTO tags (name, slug) VALUES
('BIM', 'bim'),
('Architecture', 'architecture'),
('MEP', 'mep'),
('Structural', 'structural'),
('Design', 'design'),
('Documentation', 'documentation'),
('Collaboration', 'collaboration'),
('Mobile', 'mobile'),
('Cloud', 'cloud'),
('3D Modeling', '3d-modeling'),
('Reality Capture', 'reality-capture'),
('Photogrammetry', 'photogrammetry'),
('Surveying', 'surveying'),
('Estimating', 'estimating'),
('Scheduling', 'scheduling'),
('Safety', 'safety'),
('Quality Control', 'quality-control'),
('Open Source', 'open-source')
ON CONFLICT (slug) DO NOTHING;
