const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    // Read SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, '../lib/db.sql'), 'utf8');
    
    // Execute SQL
    console.log('Creating tables...');
    await sql.query(sqlFile);
    
    console.log('✅ Database initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();