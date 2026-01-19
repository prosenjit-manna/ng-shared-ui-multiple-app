## Project Structure

```
ng-shared-ui-multiple-app/
├── projects/
│   ├── home/           # Home application
│   ├── profile/        # Profile application
│   └── shared-ui/      # Shared UI library
└── website/            # .NET Core website
```

## Available Commands

### Development Mode

- **Compile all applications in watch mode**

  ```bash
  npm run dev:all
  ```

- **Compile .NET website in watch mode**
  ```bash
  docker compose -f docker-compose-website.yml up
  ```

### Production Build

- **Build all applications once**

  ```bash
  npm run build:all
  ```

- **Build and transfer assets to .NET website**

  ```bash
  npm run build:transfer
  ```

- **Serve production build**
  ```bash
  npm run serve:all
  ```

## Creating a New Application

### 1. Generate a New Angular App

Run the automated script to create a new application:

```bash
node create-app.js <app-name>
```

This script will:

- Create a new Angular application in the `projects/` directory
- Set up the necessary configuration files
- Configure Tailwind CSS
- Add build configurations to `angular.json`
- Create a basic component structure

### 2. Add .NET View for the New App

Create a new controller in `website/Controllers/`:

```csharp
// website/Controllers/YourAppController.cs
public class YourAppController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

Create a view in `website/Views/YourApp/`:

```cshtml
@{
    ViewData["Title"] = "Your App";
}

<script>
 window.user = {
    name: 'User Name',
    role: 'admin',
    email: 'user@example.com'
 };

 // Add any additional data your app needs
</script>

<app-root></app-root>

@section Styles {
    <link rel="stylesheet" href="/Views/YourApp/index.css" />
}

@section Scripts {
    <script src="/Views/YourApp/index.js" type="module"></script>
}
```

### 3. Update Build Configuration

The build scripts will automatically handle asset transfer. After building, run:

```bash
npm run build:transfer
```

This copies the built files from `dist/<app-name>/browser/` to `website/wwwroot/Views/<app-name>/`.

## Working with Shared UI Library

### Using Shared Components

Import components from the shared-ui library:

```typescript
import { Navbar, Footer, Button } from '../../../shared-ui/src/public-api';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Button],
  templateUrl: './app.html',
})
export class App {
  // ...
}
```

### Adding New Shared Components

1. Create the component in `projects/shared-ui/src/lib/`
2. Export it from `projects/shared-ui/src/public-api.ts`
3. Build the shared-ui library:
   ```bash
   npm run build:shared-ui
   ```

## Data Management

### Development Mode

Data is defined in `data.ts` file within each application:

```typescript
// projects/your-app/src/app/data.ts
export const yourData = {
  // Your data structure
};
```

### Production Mode

Data is injected via the window object in the .NET view:

```cshtml
<script>
 window.yourData = {
    // Data from backend
 };
</script>
```

The Angular application checks for window data first, then falls back to imported data:

```typescript
constructor() {
  const windowData = window as any;

  if (windowData.yourData) {
    this.data = windowData.yourData;
  }
  // Otherwise uses imported data from data.ts
}
```

## Styling with Tailwind CSS

Each application has its own Tailwind configuration. Global styles and the shared-ui library styles are automatically included.

To customize Tailwind for a specific app:

1. Edit `projects/<app-name>/tailwind.config.js`
2. Add custom styles in `projects/<app-name>/src/styles.scss`

## Running the Full Stack

1. Start the .NET website:

   ```bash
   docker compose -f docker-compose-website.yml up
   ```

2. In development mode, start Angular apps:

   ```bash
   npm run dev:all
   ```

3. For production, build and transfer:

   ```bash
   npm run build:all
   npm run build:transfer
   ```

4. Access the applications:
   - Home: `http://localhost:5000/Home`
   - Profile: `http://localhost:5000/Profile`

## Tips

- Always run `npm run build:transfer` after building to ensure the .NET website has the latest assets
- Use the shared-ui library for common components to maintain consistency
- Keep data structures in `data.ts` files synchronized with production data shapes
- Use Angular standalone components for better tree-shaking and performance
