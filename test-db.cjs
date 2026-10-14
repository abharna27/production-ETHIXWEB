const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://placeholder:placeholder@localhost:5432/placeholder');
sql`SELECT 1;`.then(r => console.log('Result:', r)).catch(err => console.log('Query error:', err.message));
