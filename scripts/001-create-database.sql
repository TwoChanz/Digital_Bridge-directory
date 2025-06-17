-- Create database schema for ConstructTech Directory

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    description TEXT,
    short_description VARCHAR(500),
    website_url VARCHAR(500),
    logo_url VARCHAR(500),
    hero_image_url VARCHAR(500),
    category_id INTEGER REFERENCES categories(id),
    pricing_type VARCHAR(50), -- free, freemium, paid, custom
    pricing_details VARCHAR(200),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    sponsored BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platforms table
CREATE TABLE IF NOT EXISTS platforms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(50)
);

-- Tool platforms junction table
CREATE TABLE IF NOT EXISTS tool_platforms (
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, platform_id)
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- Tool tags junction table
CREATE TABLE IF NOT EXISTS tool_tags (
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, tag_id)
);

-- Features table
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Screenshots table
CREATE TABLE IF NOT EXISTS screenshots (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(200),
    sort_order INTEGER DEFAULT 0
);

-- Pricing tiers table
CREATE TABLE IF NOT EXISTS pricing_tiers (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price VARCHAR(50),
    period VARCHAR(50),
    features TEXT[], -- Array of features
    popular BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    website VARCHAR(500),
    founded_year INTEGER,
    employees VARCHAR(50),
    headquarters VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update tools table to reference companies
ALTER TABLE tools ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id);

-- Tool submissions table (for pending submissions)
CREATE TABLE IF NOT EXISTS tool_submissions (
    id SERIAL PRIMARY KEY,
    tool_name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    website_url VARCHAR(500),
    description TEXT,
    short_description VARCHAR(500),
    pricing_type VARCHAR(50),
    pricing_details VARCHAR(200),
    platforms TEXT[], -- Array of platform names
    tags TEXT[], -- Array of tag names
    features TEXT[], -- Array of features
    company_name VARCHAR(200),
    contact_email VARCHAR(200),
    logo_file_path VARCHAR(500),
    screenshot_file_paths TEXT[], -- Array of file paths
    status VARCHAR(20) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewer_notes TEXT
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(300) NOT NULL,
    excerpt TEXT,
    content TEXT,
    category VARCHAR(100),
    author VARCHAR(100),
    author_bio TEXT,
    featured_image_url VARCHAR(500),
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    read_time_minutes INTEGER,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table for tracking clicks and views
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- view, click, demo_request, etc.
    user_agent TEXT,
    ip_address INET,
    referrer VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON tools(featured);
CREATE INDEX IF NOT EXISTS idx_tools_sponsored ON tools(sponsored);
CREATE INDEX IF NOT EXISTS idx_tool_tags_tool ON tool_tags(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_tags_tag ON tool_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_analytics_tool ON analytics(tool_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
