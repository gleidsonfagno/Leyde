-- V3: Add indexes to support pagination and queries

CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- Consider adding GIN index for full-text search later
-- CREATE INDEX idx_products_search ON products USING GIN (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(description,'')));
