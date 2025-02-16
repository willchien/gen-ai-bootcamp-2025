const db = require('../../config/database');
const fs = require('fs').promises;
const path = require('path');

async function runSeeds() {
  try {
    const seedFiles = await fs.readdir(__dirname);
    const jsonFiles = seedFiles
      .filter(file => file.endsWith('.json'))
      .sort();
    
    console.log('Found seed files:', jsonFiles);
    
    for (const file of jsonFiles) {
      console.log(`Processing seed file: ${file}`);
      const data = await fs.readFile(path.join(__dirname, file), 'utf8');
      const words = JSON.parse(data);
      
      // Extract group name from filename
      const groupName = path.basename(file, '.json');
      
      // Insert group
      const groupId = await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO groups (name) VALUES (?)',
          [groupName],
          function(err) {
            if (err) reject(err);
            resolve(this.lastID);
          }
        );
      });
      
      // Insert words and create word-group relationships
      for (const word of words) {
        const wordId = await new Promise((resolve, reject) => {
          db.run(
            'INSERT INTO words (French, English, parts) VALUES (?, ?, ?)',
            [word.french, word.english, JSON.stringify(word.parts)],
            function(err) {
              if (err) reject(err);
              resolve(this.lastID);
            }
          );
        });
        
        // Create word-group relationship
        await new Promise((resolve, reject) => {
          db.run(
            'INSERT INTO words_groups (word_id, group_id) VALUES (?, ?)',
            [wordId, groupId],
            (err) => {
              if (err) reject(err);
              resolve();
            }
          );
        });
      }
      
      console.log(`Successfully processed: ${file}`);
    }
    
    console.log('All seeds completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

runSeeds();