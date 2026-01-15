#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const WEBSITE_VIEWS_DIR = path.join(__dirname, 'website', 'Views');

/**
 * Capitalizes the first letter of a string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Gets the first file matching a pattern in a directory
 */
function getFirstFile(dir, extension) {
  if (!fs.existsSync(dir)) {
    return null;
  }
  
  const files = fs.readdirSync(dir).filter(file => file.endsWith(extension));
  return files.length > 0 ? path.join(dir, files[0]) : null;
}

/**
 * Transfers assets from dist to website Views
 */
function transferAssets() {
  console.log('Starting asset transfer...\n');
  
  // Check if dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Error: dist directory not found at ${DIST_DIR}`);
    console.error('Please build the Angular apps first using: npm run build:all');
    process.exit(1);
  }
  
  // Get all app directories in dist
  const apps = fs.readdirSync(DIST_DIR).filter(item => {
    const itemPath = path.join(DIST_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  if (apps.length === 0) {
    console.warn('No apps found in dist directory');
    return;
  }
  
  console.log(`Found ${apps.length} app(s): ${apps.join(', ')}\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  // Process each app
  apps.forEach(app => {
    console.log(`Processing: ${app}`);
    
    const browserDir = path.join(DIST_DIR, app, 'browser');
    const viewDir = path.join(WEBSITE_VIEWS_DIR, capitalize(app));
    
    // Check if browser directory exists
    if (!fs.existsSync(browserDir)) {
      console.error(`  ✗ Browser directory not found: ${browserDir}`);
      errorCount++;
      return;
    }
    
    // Check if view directory exists
    if (!fs.existsSync(viewDir)) {
      console.warn(`  ⚠ View directory not found: ${viewDir}`);
      console.warn(`  Creating directory...`);
      fs.mkdirSync(viewDir, { recursive: true });
    }
    
    // Find and transfer JS file
    const jsFile = getFirstFile(browserDir, '.js');
    if (jsFile) {
      try {
        const jsContent = fs.readFileSync(jsFile, 'utf8');
        const targetJsPath = path.join(viewDir, 'index.js');
        fs.writeFileSync(targetJsPath, jsContent, 'utf8');
        console.log(`  ✓ Transferred JS: ${path.basename(jsFile)} → ${targetJsPath}`);
      } catch (error) {
        console.error(`  ✗ Error transferring JS: ${error.message}`);
        errorCount++;
      }
    } else {
      console.warn(`  ⚠ No JS file found in ${browserDir}`);
    }
    
    // Find and transfer CSS file
    const cssFile = getFirstFile(browserDir, '.css');
    if (cssFile) {
      try {
        const cssContent = fs.readFileSync(cssFile, 'utf8');
        const targetCssPath = path.join(viewDir, 'index.css');
        fs.writeFileSync(targetCssPath, cssContent, 'utf8');
        console.log(`  ✓ Transferred CSS: ${path.basename(cssFile)} → ${targetCssPath}`);
      } catch (error) {
        console.error(`  ✗ Error transferring CSS: ${error.message}`);
        errorCount++;
      }
    } else {
      console.warn(`  ⚠ No CSS file found in ${browserDir}`);
    }
    
    successCount++;
    console.log();
  });
  
  // Summary
  console.log('─────────────────────────────');
  console.log(`Transfer complete!`);
  console.log(`  Apps processed: ${successCount}`);
  if (errorCount > 0) {
    console.log(`  Errors: ${errorCount}`);
  }
}

// Run the transfer
try {
  transferAssets();
} catch (error) {
  console.error('Fatal error:', error.message);
  process.exit(1);
}
