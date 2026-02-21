import { Pool } from 'pg';

let pool;

export function getPool(databaseUrl) {
  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl });
  }
  return pool;
}

export async function ensureSchema(databaseUrl) {
  const db = getPool(databaseUrl);
  await db.query(`
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

    ALTER TABLE events ADD COLUMN IF NOT EXISTS place_type TEXT;
    ALTER TABLE events ADD COLUMN IF NOT EXISTS image_url TEXT;

    CREATE TABLE IF NOT EXISTS subscribers (
      chat_id TEXT PRIMARY KEY,
      first_name TEXT,
      username TEXT,
      weekly_digest BOOLEAN DEFAULT TRUE,
      monthly_digest BOOLEAN DEFAULT TRUE,
      subscribed_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

export async function pgGetEvents(databaseUrl) {
  const db = getPool(databaseUrl);
  const { rows } = await db.query('SELECT * FROM events ORDER BY start_at ASC');
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    startAt: row.start_at,
    endAt: row.end_at,
    venue: row.venue,
    address: row.address,
    category: row.category,
    placeType: row.place_type,
    price: row.price,
    currency: row.currency,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    ticketsUrl: row.tickets_url,
    imageUrl: row.image_url,
    reliabilityScore: Number(row.reliability_score || 0),
    verified: Boolean(row.verified),
    tags: row.tags || [],
    updatedAt: row.updated_at
  }));
}

export async function pgUpsertEvents(databaseUrl, events) {
  const db = getPool(databaseUrl);
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    for (const event of events) {
      await client.query(
        `INSERT INTO events (
          id, title, description, start_at, end_at, venue, address, category, place_type, price, currency,
          source_name, source_url, tickets_url, image_url, reliability_score, verified, tags, updated_at
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,$16,$17,$18,NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          start_at = EXCLUDED.start_at,
          end_at = EXCLUDED.end_at,
          venue = EXCLUDED.venue,
          address = EXCLUDED.address,
          category = EXCLUDED.category,
          place_type = EXCLUDED.place_type,
          price = EXCLUDED.price,
          currency = EXCLUDED.currency,
          source_name = EXCLUDED.source_name,
          source_url = EXCLUDED.source_url,
          tickets_url = EXCLUDED.tickets_url,
          image_url = EXCLUDED.image_url,
          reliability_score = EXCLUDED.reliability_score,
          verified = EXCLUDED.verified,
          tags = EXCLUDED.tags,
          updated_at = NOW()`,
        [
          event.id,
          event.title,
          event.description || null,
          event.startAt,
          event.endAt || null,
          event.venue || null,
          event.address || null,
          event.category || null,
          event.placeType || null,
          event.price || null,
          event.currency || null,
          event.sourceName || null,
          event.sourceUrl || null,
          event.ticketsUrl || null,
          event.imageUrl || null,
          event.reliabilityScore || 0,
          event.verified || false,
          JSON.stringify(event.tags || [])
        ]
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function pgReplaceEvents(databaseUrl, events) {
  const db = getPool(databaseUrl);
  await db.query('DELETE FROM events');
  await pgUpsertEvents(databaseUrl, events);
}

export async function pgGetSubscribers(databaseUrl) {
  const db = getPool(databaseUrl);
  const { rows } = await db.query('SELECT * FROM subscribers');
  return rows.map((row) => ({
    chatId: row.chat_id,
    firstName: row.first_name,
    username: row.username,
    weeklyDigest: row.weekly_digest,
    monthlyDigest: row.monthly_digest,
    subscribedAt: row.subscribed_at
  }));
}

export async function pgAddSubscriber(databaseUrl, subscriber) {
  const db = getPool(databaseUrl);
  await db.query(
    `INSERT INTO subscribers (chat_id, first_name, username, weekly_digest, monthly_digest, subscribed_at)
     VALUES ($1, $2, $3, TRUE, TRUE, NOW())
     ON CONFLICT (chat_id) DO UPDATE SET
       first_name = EXCLUDED.first_name,
       username = EXCLUDED.username`,
    [String(subscriber.chatId), subscriber.firstName || null, subscriber.username || null]
  );
}

export async function pgRemoveSubscriber(databaseUrl, chatId) {
  const db = getPool(databaseUrl);
  await db.query('DELETE FROM subscribers WHERE chat_id = $1', [String(chatId)]);
}
