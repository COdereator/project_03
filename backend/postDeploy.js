import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

/**
 * This script runs necessary seeding operations after deployment
 * It will:
 * 1. Run the regular seed script (only if DB is empty)
 * 2. Run the saree seed script (only adds sarees if they don't exist)
 */
async function postDeploy() {
  console.log('Starting post-deployment process...');
  
  try {
    // Run standard seed (only works if DB is empty)
    console.log('Running standard seed...');
    await execPromise('node seedData.js');
    
    // Run saree seed (adds sarees without affecting existing data)
    console.log('Running saree seed...');
    await execPromise('node seedSarees.js');
    
    console.log('Post-deployment process completed successfully!');
  } catch (error) {
    console.error('Error during post-deployment process:', error);
    process.exit(1);
  }
}

postDeploy(); 