import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file and directory paths in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to process all files in a directory
async function processDirectory(directory) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        await processDirectory(fullPath);
      } else if (file.name.match(/\.(jsx?|tsx?)$/)) {
        await processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
  }
}

// Function to process a single file
async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let updated = false;
    
    // Replace @/assets/ with relative paths
    const importRegex = /from ['"]@\/assets\/([^'"]+)['"]/g;
    const matches = [...content.matchAll(importRegex)];
    
    for (const match of matches) {
      const fullMatch = match[0];
      const assetPath = match[1];
      
      // Calculate relative path
      const relativePath = path.relative(
        path.dirname(filePath),
        path.join(process.cwd(), 'src/assets')
      ).replace(/\\/g, '/');
      
      const newImport = `from '${relativePath ? relativePath + '/' : ''}${assetPath}'`;
      content = content.replace(fullMatch, newImport);
      updated = true;
    }
    
    // Write back if changes were made
    if (updated) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`Updated imports in ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Start processing from the src directory
const srcDir = path.join(process.cwd(), 'src');
processDirectory(srcDir).then(() => {
  console.log('Import updates complete!');  
}).catch(console.error);
