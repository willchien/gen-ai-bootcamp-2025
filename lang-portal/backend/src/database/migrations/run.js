const db = require('../../config/database');
const fs = require('fs').promises;
const path = require('path');

async function runMigrations() {
  try {
    const migrationFiles = await fs.readdir(__dirname);
    const sqlFiles = migrationFiles
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    console.log('Found migration files:', sqlFiles);
    
    for (const file of sqlFiles) {
      console.log(`Running migration: ${file}`);
      const sql = await fs.readFile(path.join(__dirname, file), 'utf8');
      await new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
          if (err) {
            console.error(`Error running migration ${file}:`, err);
            reject(err);
          } else {
            console.log(`Successfully ran migration: ${file}`);
            resolve();
          }
        });
      });
    }
    
    console.log('All migrations completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigrations();