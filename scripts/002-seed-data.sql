-- Seed data for ConstructTech Directory

-- Insert categories
INSERT INTO categories (slug, name, description, icon, color) VALUES
('bim-software', 'BIM Software', 'Building Information Modeling tools for design, documentation, and collaboration', 'Building2', 'bg-blue-500'),
('drone-mapping', 'Drone Mapping', 'Aerial surveying and mapping solutions for construction sites', 'Drone', 'bg-green-500'),
('ar-vr', 'AR/VR', 'Augmented and Virtual Reality tools for construction visualization', 'Glasses', 'bg-purple-500'),
('estimating', 'Estimating', 'Cost estimation and bidding tools for construction projects', 'Calculator', 'bg-orange-500'),
('project-management', 'Project Management', 'Construction project management platforms and collaboration tools', 'FileText', 'bg-red-500'),
('field-tools', 'Field Tools', 'On-site construction tools and mobile applications', 'Wrench', 'bg-teal-500'),
('reality-capture', 'Reality Capture', '3D scanning and photogrammetry solutions', 'Camera', 'bg-indigo-500'),
('cad-software', 'CAD Software', 'Computer-Aided Design tools for construction and architecture', 'Drafting', 'bg-yellow-500');

-- Insert platforms
INSERT INTO platforms (name, icon) VALUES
('Windows', 'Monitor'),
('Mac', 'Monitor'),
('Linux', 'Monitor'),
('Web Browser', 'Globe'),
('iOS', 'Smartphone'),
('Android', 'Smartphone');

-- Insert companies
INSERT INTO companies (name, website, founded_year, employees, headquarters) VALUES
('Autodesk', 'https://www.autodesk.com', 1982, '10,000+', 'San Rafael, California'),
('Trimble', 'https://www.trimble.com', 1978, '11,000+', 'Sunnyvale, California'),
('Bentley Systems', 'https://www.bentley.com', 1984, '4,000+', 'Exton, Pennsylvania'),
('Procore', 'https://www.procore.com', 2002, '2,000+', 'Carpinteria, California'),
('Pix4D', 'https://www.pix4d.com', 2011, '300+', 'Lausanne, Switzerland');

-- Insert sample tools
INSERT INTO tools (slug, name, tagline, description, short_description, website_url, category_id, pricing_type, pricing_details, rating, review_count, verified, sponsored, featured, status, company_id) VALUES
('revit', 'Autodesk Revit', 'Industry-leading BIM software for architectural design and documentation', 'Autodesk Revit is a building information modeling (BIM) software for architects, landscape architects, structural engineers, mechanical, electrical, and plumbing (MEP) engineers, designers and contractors. The original software was developed by Charles River Software, founded in 1997, renamed Revit Technology Corporation in 2000, and acquired by Autodesk in 2002.', 'Industry-leading BIM software for architectural design, MEP engineering, and structural engineering.', 'https://www.autodesk.com/products/revit', 1, 'paid', 'From $290/month', 4.5, 1250, true, true, true, 'approved', 1),
('procore', 'Procore', 'All-in-one construction management platform', 'Procore is a cloud-based construction management software that connects project teams and stakeholders from design through completion. It provides real-time access to project information, streamlines communication, and improves project visibility.', 'All-in-one construction management platform for project teams and stakeholders.', 'https://www.procore.com', 5, 'paid', 'Custom pricing', 4.3, 890, true, true, true, 'approved', 4),
('pix4d', 'Pix4D', 'Professional drone mapping and photogrammetry software', 'Pix4D develops a suite of software products that use images taken by hand, by drone, or by plane and transforms them into highly-precise, georeferenced 2D maps and 3D models.', 'Professional drone mapping and photogrammetry software for surveying and inspection.', 'https://www.pix4d.com', 2, 'paid', 'From $350/month', 4.4, 650, true, false, true, 'approved', 5);

-- Insert tool platforms relationships
INSERT INTO tool_platforms (tool_id, platform_id) VALUES
(1, 1), -- Revit - Windows
(2, 1), (2, 2), (2, 4), (2, 5), (2, 6), -- Procore - Multi-platform
(3, 1), (3, 2); -- Pix4D - Windows, Mac

-- Insert tags
INSERT INTO tags (name, slug) VALUES
('BIM', 'bim'),
('Architecture', 'architecture'),
('MEP', 'mep'),
('Structural', 'structural'),
('3D Modeling', '3d-modeling'),
('Project Management', 'project-management'),
('Collaboration', 'collaboration'),
('Mobile', 'mobile'),
('Photogrammetry', 'photogrammetry'),
('Surveying', 'surveying'),
('3D Mapping', '3d-mapping'),
('Drone', 'drone'),
('Cloud', 'cloud');

-- Insert tool tags relationships
INSERT INTO tool_tags (tool_id, tag_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), -- Revit tags
(2, 6), (2, 7), (2, 8), (2, 13), -- Procore tags
(3, 9), (3, 10), (3, 11), (3, 12); -- Pix4D tags

-- Insert features for tools
INSERT INTO features (tool_id, description, sort_order) VALUES
(1, '3D architectural design and modeling', 1),
(1, 'MEP (Mechanical, Electrical, Plumbing) design', 2),
(1, 'Structural engineering tools', 3),
(1, 'Collaborative design workflows', 4),
(1, 'Parametric modeling capabilities', 5),
(1, 'Construction documentation', 6),
(1, 'Rendering and visualization', 7),
(1, 'Cloud collaboration with BIM 360', 8),
(2, 'Project management and scheduling', 1),
(2, 'Document management and collaboration', 2),
(2, 'Budget tracking and cost management', 3),
(2, 'Quality and safety management', 4),
(2, 'Mobile field management', 5),
(2, 'Real-time reporting and analytics', 6),
(3, 'Drone flight planning and control', 1),
(3, 'Photogrammetry processing', 2),
(3, '3D mapping and modeling', 3),
(3, 'Volume calculations', 4),
(3, 'Progress monitoring', 5),
(3, 'Survey-grade accuracy', 6);

-- Insert pricing tiers
INSERT INTO pricing_tiers (tool_id, name, price, period, features, popular, sort_order) VALUES
(1, 'Monthly', '$290', 'per month', ARRAY['Full Revit access', 'Cloud storage', 'Support'], false, 1),
(1, 'Annual', '$2,310', 'per year', ARRAY['Full Revit access', 'Cloud storage', 'Priority support', 'Save 33%'], true, 2),
(1, '3-Year', '$6,235', '3 years', ARRAY['Full Revit access', 'Cloud storage', 'Priority support', 'Best value'], false, 3);

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, category, author, author_bio, published, featured, read_time_minutes, published_at) VALUES
('top-scan-to-bim-platforms-2025', 'Top 5 Scan-to-BIM Platforms for 2025', 'Compare the leading reality capture to BIM conversion tools and find the best fit for your workflow. We analyze features, pricing, and real-world performance.', 'Full blog content would go here...', 'BIM Software', 'Mike Rodriguez', 'Senior BIM Consultant with 15+ years of experience in construction technology.', true, false, 8, '2025-01-12 10:00:00'),
('best-bim-tools-small-firms', 'Best BIM Tools for Small Architecture Firms', 'Affordable BIM solutions that don''t compromise on features. Perfect for smaller teams looking to implement BIM workflows without breaking the budget.', 'Full blog content would go here...', 'BIM Software', 'Lisa Park', 'Architect and BIM specialist helping small firms adopt new technologies.', true, false, 6, '2025-01-10 14:30:00'),
('future-construction-technology-2025', 'The Future of Construction Technology: 2025 Trends and Predictions', 'Explore the cutting-edge technologies that will reshape the construction industry in 2025, from AI-powered project management to advanced reality capture solutions.', 'Full blog content would go here...', 'Industry Insights', 'Sarah Chen', 'Construction technology analyst and industry researcher.', true, true, 12, '2025-01-15 09:00:00');

-- Update view counts and other metrics
UPDATE tools SET view_count = 15420 WHERE slug = 'revit';
UPDATE tools SET view_count = 12350 WHERE slug = 'procore';
UPDATE tools SET view_count = 8930 WHERE slug = 'pix4d';

UPDATE blog_posts SET view_count = 2450 WHERE slug = 'future-construction-technology-2025';
UPDATE blog_posts SET view_count = 1890 WHERE slug = 'top-scan-to-bim-platforms-2025';
UPDATE blog_posts SET view_count = 1650 WHERE slug = 'best-bim-tools-small-firms';
