CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  venue TEXT,
  address TEXT,
  category TEXT,
  place_type TEXT,
  price TEXT,
  currency TEXT,
  source_name TEXT,
  source_url TEXT,
  tickets_url TEXT,
  image_url TEXT,
  reliability_score NUMERIC,
  verified BOOLEAN DEFAULT FALSE,
  tags JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscribers (
  chat_id TEXT PRIMARY KEY,
  first_name TEXT,
  username TEXT,
  weekly_digest BOOLEAN DEFAULT TRUE,
  monthly_digest BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);
