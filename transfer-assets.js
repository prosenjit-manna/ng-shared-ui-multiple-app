#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.join(__dirname, 'dist');
const WEBSITE_VIEWS_DIR = path.join(__dirname, 'website', 'Views');
const ANGULAR_JSON_PATH = path.join(__dirname, 'angular.json');

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
 * Scans angular.json to find all Angular application projects
 */
function getAngularApps() {
  if (!fs.existsSync(ANGULAR_JSON_PATH)) {
    console.error(`Error: angular.json not found at ${ANGULAR_JSON_PATH}`);
    process.exit(1);
  }

  const angularJson = JSON.parse(fs.readFileSync(ANGULAR_JSON_PATH, 'utf8'));
  const apps = [];

  if (angularJson.projects) {
    for (const [projectName, projectConfig] of Object.entries(angularJson.projects)) {
      if (projectConfig.projectType === 'application') {
        apps.push(projectName);
      }
    }
  }

  return apps;
}

/**
 * Builds an Angular app using Angular CLI
 */
function buildApp(appName) {
  console.log(`Building ${appName}...`);
  try {
    execSync(`ng build ${appName}`, { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    console.log(`✓ Successfully built ${appName}\n`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to build ${appName}:`, error.message);
    return false;
  }
}

/**
 * Transfers assets for a single app from dist to website Views
 */
function transferAppAssets(appName) {
  console.log(`Transferring assets for: ${appName}`);
  
  const browserDir = path.join(DIST_DIR, appName, 'browser');
  const viewDir = path.join(WEBSITE_VIEWS_DIR, capitalize(appName));
  
  let hasErrors = false;
  
  // Check if browser directory exists
  if (!fs.existsSync(browserDir)) {
    console.error(`  ✗ Browser directory not found: ${browserDir}`);
    return false;
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
      hasErrors = true;
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
      hasErrors = true;
    }
  } else {
    console.warn(`  ⚠ No CSS file found in ${browserDir}`);
  }
  
  console.log();
  return !hasErrors;
}

/**
 * Main function to build and transfer all Angular apps
 */
function buildAndTransferApps() {
  console.log('═════════════════════════════════════════════════');
  console.log('Starting Dynamic Build and Transfer Process');
  console.log('═════════════════════════════════════════════════\n');
  
  // Step 1: Scan for Angular apps
  console.log('📂 Scanning for Angular applications...');
  const apps = getAngularApps();
  
  if (apps.length === 0) {
    console.warn('⚠ No Angular applications found in angular.json');
    console.warn('Make sure your projects have "projectType": "application"');
    process.exit(1);
  }
  
  console.log(`✓ Found ${apps.length} Angular application(s):`);
  apps.forEach(app => console.log(`  - ${app}`));
  console.log();
  
  // Step 2: Build each app one by one
  console.log('🔨 Building applications...');
  console.log('─────────────────────────────────────────────────\n');
  
  const buildResults = {};
  apps.forEach(app => {
    buildResults[app] = buildApp(app);
  });
  
  // Check build results
  const failedBuilds = Object.entries(buildResults)
    .filter(([_, success]) => !success)
    .map(([app, _]) => app);
  
  if (failedBuilds.length > 0) {
    console.error(`\n❌ Build failed for: ${failedBuilds.join(', ')}`);
    console.error('Aborting transfer process.');
    process.exit(1);
  }
  
  // Step 3: Transfer assets for each app
  console.log('📦 Transferring assets...');
  console.log('─────────────────────────────────────────────────\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  apps.forEach(app => {
    const success = transferAppAssets(app);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  });
  
  // Summary
  console.log('═════════════════════════════════════════════════');
  console.log('✅ Process Complete!');
  console.log('═════════════════════════════════════════════════');
  console.log(`  Total apps: ${apps.length}`);
  console.log(`  Successfully transferred: ${successCount}`);
  if (errorCount > 0) {
    console.log(`  ⚠ Errors: ${errorCount}`);
  }
  console.log('═════════════════════════════════════════════════\n');
}

// Run the build and transfer process
try {
  buildAndTransferApps();
} catch (error) {
  console.error('❌ Fatal error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
