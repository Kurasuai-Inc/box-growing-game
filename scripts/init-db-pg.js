const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function initDatabase() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    // Connect to database
    await client.connect();
    console.log('✅ Connected to database');

    // Read SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, '../lib/db.sql'), 'utf8');
    
    // Execute SQL
    console.log('Creating tables...');
    await client.query(sqlFile);
    
    console.log('✅ Database initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initDatabase();