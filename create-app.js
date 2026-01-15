#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PROJECTS_DIR = path.join(__dirname, 'projects');
const WEBSITE_DIR = path.join(__dirname, 'website');
const ANGULAR_JSON = path.join(__dirname, 'angular.json');

/**
 * Capitalizes the first letter of a string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts string to PascalCase
 */
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(word => capitalize(word.toLowerCase()))
    .join('');
}

/**
 * Asks a question and returns the answer
 */
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer);
  }));
}

/**
 * Creates Angular app structure
 */
function createAngularApp(appName) {
  const appDir = path.join(PROJECTS_DIR, appName);
  
  console.log(`\n📦 Creating Angular app: ${appName}`);
  
  if (fs.existsSync(appDir)) {
    console.error(`❌ Error: App directory already exists: ${appDir}`);
    return false;
  }

  try {
    // Create directory structure
    const dirs = [
      appDir,
      path.join(appDir, 'public'),
      path.join(appDir, 'src'),
      path.join(appDir, 'src', 'app'),
    ];

    dirs.forEach(dir => {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`  ✓ Created: ${path.relative(__dirname, dir)}`);
    });

    // Create files
    createAngularFiles(appName, appDir);
    
    // Update angular.json
    updateAngularJson(appName);
    
    console.log(`✅ Angular app "${appName}" created successfully!`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating Angular app: ${error.message}`);
    return false;
  }
}

/**
 * Creates Angular app files
 */
function createAngularFiles(appName, appDir) {
  const componentName = toPascalCase(appName);
  
  // tsconfig.app.json
  const tsconfigApp = {
    extends: "../../tsconfig.json",
    compilerOptions: {
      outDir: "../../out-tsc/app",
      types: []
    },
    files: [
      "src/main.ts"
    ],
    include: [
      "src/**/*.d.ts"
    ]
  };
  fs.writeFileSync(
    path.join(appDir, 'tsconfig.app.json'),
    JSON.stringify(tsconfigApp, null, 2)
  );

  // tsconfig.spec.json
  const tsconfigSpec = {
    extends: "../../tsconfig.json",
    compilerOptions: {
      outDir: "../../out-tsc/spec",
      types: [
        "jest"
      ]
    },
    include: [
      "src/**/*.spec.ts",
      "src/**/*.d.ts"
    ]
  };
  fs.writeFileSync(
    path.join(appDir, 'tsconfig.spec.json'),
    JSON.stringify(tsconfigSpec, null, 2)
  );

  // src/index.html
  const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${componentName}</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
`;
  fs.writeFileSync(path.join(appDir, 'src', 'index.html'), indexHtml);

  // src/main.ts
  const mainTs = `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
`;
  fs.writeFileSync(path.join(appDir, 'src', 'main.ts'), mainTs);

  // src/styles.scss
  const stylesScss = `/* You can add global styles to this file, and also import other style files */
`;
  fs.writeFileSync(path.join(appDir, 'src', 'styles.scss'), stylesScss);

  // src/app/app.config.ts
  const appConfigTs = `import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    
  ]
};
`;
  fs.writeFileSync(path.join(appDir, 'src', 'app', 'app.config.ts'), appConfigTs);

  // src/app/app.ts
  const appTs = `import { Component, signal, isDevMode } from '@angular/core';
import { Button } from '../../../shared-ui/src/public-api';
import { userData } from './data';

@Component({
  selector: 'app-root',
  imports: [Button],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('${appName}');
  user: any = (window as any).user;

  constructor() {
    // If dev mode is enabled, set user data
    if (isDevMode()) {
      this.user = userData;
      console.log('Dev mode enabled - using mock user data:', this.user);
    }

    console.log('${componentName} App component initialized.');
    console.log('Global Variable User:', this.user);
  }

  log() {
    console.log('Button clicked from ${componentName} App component!');
    console.log('Global Variable User:', this.user);
  }
}
`;
  fs.writeFileSync(path.join(appDir, 'src', 'app', 'app.ts'), appTs);

  // src/app/app.html
  const appHtml = `<h1>{{ title() }}</h1>
<p>Welcome to ${componentName}!</p>

<div class="user-info">
  <h2>User Information</h2>
  <p><strong>Name:</strong> {{ user?.name }}</p>
  <p><strong>Email:</strong> {{ user?.email }}</p>
  <p><strong>Role:</strong> {{ user?.role }}</p>
</div>

<lib-button text="Click Me" (clicked)="log()" />
`;
  fs.writeFileSync(path.join(appDir, 'src', 'app', 'app.html'), appHtml);

  // src/app/app.scss
  const appScss = `:host {
  display: block;
  padding: 20px;
}

h1 {
  color: #333;
}

.user-info {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
`;
  fs.writeFileSync(path.join(appDir, 'src', 'app', 'app.scss'), appScss);

  // src/app/app.spec.ts
  const appSpecTs = `import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(\`should have the '${appName}' title\`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('${appName}');
  });
});
`;
  fs.writeFileSync(path.join(appDir, 'src', 'app', 'app.spec.ts'), appSpecTs);

  // src/app/data.ts
  const dataTs = `export const userData: any = {
    name: 'John Doe',
    email: 'example@example.com',
    role: 'admin',
}
`;
  fs.writeFileSync(path.join(appDir, 'src', 'app', 'data.ts'), dataTs);

  console.log(`  ✓ Created all Angular app files`);
}

/**
 * Updates angular.json with new project
 */
function updateAngularJson(appName) {
  try {
    const angularJson = JSON.parse(fs.readFileSync(ANGULAR_JSON, 'utf8'));
    
    angularJson.projects[appName] = {
      projectType: "application",
      schematics: {
        "@schematics/angular:component": {
          style: "scss"
        }
      },
      root: `projects/${appName}`,
      sourceRoot: `projects/${appName}/src`,
      prefix: "app",
      architect: {
        build: {
          builder: "@angular/build:application",
          options: {
            browser: `projects/${appName}/src/main.ts`,
            tsConfig: `projects/${appName}/tsconfig.app.json`,
            inlineStyleLanguage: "scss",
            assets: [
              {
                glob: "**/*",
                input: `projects/${appName}/public`
              }
            ],
            styles: [
              `projects/${appName}/src/styles.scss`
            ]
          },
          configurations: {
            production: {
              budgets: [
                {
                  type: "initial",
                  maximumWarning: "500kB",
                  maximumError: "1MB"
                },
                {
                  type: "anyComponentStyle",
                  maximumWarning: "4kB",
                  maximumError: "8kB"
                }
              ],
              outputHashing: "all"
            },
            development: {
              optimization: false,
              extractLicenses: false,
              sourceMap: true
            }
          },
          defaultConfiguration: "production"
        },
        serve: {
          builder: "@angular/build:dev-server",
          configurations: {
            production: {
              buildTarget: `${appName}:build:production`
            },
            development: {
              buildTarget: `${appName}:build:development`
            }
          },
          defaultConfiguration: "development"
        },
        test: {
          builder: "@angular/build:unit-test",
          options: {
            tsConfig: `projects/${appName}/tsconfig.spec.json`
          }
        }
      }
    };

    fs.writeFileSync(ANGULAR_JSON, JSON.stringify(angularJson, null, 2));
    console.log(`  ✓ Updated angular.json`);
  } catch (error) {
    console.error(`❌ Error updating angular.json: ${error.message}`);
  }
}

/**
 * Creates ASP.NET Core controller and views
 */
function createWebsiteRoute(appName) {
  const componentName = toPascalCase(appName);
  
  console.log(`\n🌐 Creating website route: ${componentName}`);
  
  try {
    // Create controller
    createController(componentName);
    
    // Create views
    createViews(componentName, appName);
    
    console.log(`✅ Website route "${componentName}" created successfully!`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating website route: ${error.message}`);
    return false;
  }
}

/**
 * Creates controller file
 */
function createController(componentName) {
  const controllersDir = path.join(WEBSITE_DIR, 'Controllers');
  const controllerFile = path.join(controllersDir, `${componentName}Controller.cs`);
  
  if (fs.existsSync(controllerFile)) {
    console.warn(`  ⚠ Controller already exists: ${controllerFile}`);
    return;
  }

  const controllerContent = `using Microsoft.AspNetCore.Mvc;

namespace MyWebsite.Controllers;

public class ${componentName}Controller : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
`;

  fs.writeFileSync(controllerFile, controllerContent);
  console.log(`  ✓ Created: Controllers/${componentName}Controller.cs`);
}

/**
 * Creates view files
 */
function createViews(componentName, appName) {
  const viewsDir = path.join(WEBSITE_DIR, 'Views', componentName);
  
  // Create view directory
  if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true });
    console.log(`  ✓ Created: Views/${componentName}/`);
  }

  // Create Index.cshtml
  const indexCshtml = `<h2>${componentName}</h2>
<script>
 window.user = {
    name: 'Sam Smith',
    role: 'Administrator'
 };
</script>

<app-root></app-root>

@section Scripts {
    <script src="/Views/${componentName}/index.js" type="module"></script>
}
`;
  fs.writeFileSync(path.join(viewsDir, 'Index.cshtml'), indexCshtml);
  console.log(`  ✓ Created: Views/${componentName}/Index.cshtml`);

  // Create index.css (placeholder)
  const indexCss = `/* Styles for ${componentName} */
`;
  fs.writeFileSync(path.join(viewsDir, 'index.css'), indexCss);
  console.log(`  ✓ Created: Views/${componentName}/index.css`);

  // Create index.js (placeholder)
  const indexJs = `// JavaScript for ${componentName}
// This file will be replaced by the built Angular app
console.log('${componentName} page loaded');
`;
  fs.writeFileSync(path.join(viewsDir, 'index.js'), indexJs);
  console.log(`  ✓ Created: Views/${componentName}/index.js`);
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Angular App & Website Route Creator\n');
  console.log('This script will:');
  console.log('  1. Create a new Angular app under projects/');
  console.log('  2. Create a new route in website/ with controller and views\n');

  // Ask for app name
  const appName = await askQuestion('Enter app name (lowercase, e.g., "dashboard", "settings"): ');
  
  if (!appName || appName.trim() === '') {
    console.error('❌ Error: App name cannot be empty');
    process.exit(1);
  }

  const normalizedAppName = appName.trim().toLowerCase().replace(/\s+/g, '-');
  
  console.log(`\n📋 Creating app: "${normalizedAppName}"`);
  
  // Create Angular app
  const angularSuccess = createAngularApp(normalizedAppName);
  
  // Create website route
  const websiteSuccess = createWebsiteRoute(normalizedAppName);
  
  if (angularSuccess && websiteSuccess) {
    console.log('\n✨ All done! Next steps:');
    console.log(`  1. Build the Angular app: npm run build:${normalizedAppName}`);
    console.log('  2. Transfer assets: npm run build:transfer');
    console.log('  3. Start the website: docker compose -f docker-compose-website.yml up --build');
    console.log(`  4. Visit: http://localhost:8080/${toPascalCase(normalizedAppName)}`);
  } else {
    console.log('\n⚠️  Some steps failed. Please check the errors above.');
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
