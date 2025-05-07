# FinTrack - Finance Tracking App

FinTrack is a mobile application built with React Native and Expo that helps users track their finances, analyze spending patterns, and set budgets.

![FinTrack App](https://images.pexels.com/photos/3943727/pexels-photo-3943727.jpeg?auto=compress&cs=tinysrgb&w=400)

## Features

- **Dashboard**: Overview of financial status with charts and insights
- **Transaction Management**: View, search and filter transactions
- **Budget Tracking**: Create and manage category-based budgets
- **Statement Upload**: Import bank statements via PDF
- **Data Visualization**: Pie charts and line graphs to visualize spending

## Tech Stack

- React Native (using Expo)
- TypeScript
- React Navigation
- Expo Router
- React Native Paper (UI Components)
- React Native Chart Kit (Visualizations)
- Reanimated (Animations)
- Lucide React Native (Icons)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) (v8 or newer) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- iOS Simulator (for Mac users) or Android Emulator
- For physical device testing: Expo Go app ([iOS](https://apps.apple.com/app/apple-store/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Getting Started

Follow these steps to get the project running on your local machine:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd finance
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This command starts the Expo development server.

4. **Run on device/simulator:**
   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS)
   - Press 'i' to open in iOS simulator
   - Press 'a' to open in Android emulator
   - Press 'w' to open in web browser

## Project Structure

```
finance/
├── app/                   # Application screens using Expo Router
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── index.tsx          # Entry/welcome screen
│   └── processing.tsx     # Processing screen for uploads
├── assets/                # Static assets like images
├── components/            # Reusable UI components
│   ├── budget/            # Budget-related components
│   ├── transactions/      # Transaction-related components
│   └── upload/            # Upload-related components
├── data/                  # Sample data for development
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions and helpers
    ├── colors.ts          # Color theme definitions
    └── formatters.ts      # Formatting helper functions
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev` - Starts the development server
- `npm run build:web` or `yarn build:web` - Builds the app for web deployment
- `npm run lint` or `yarn lint` - Runs the linter to check for code issues

## Development

### Environment Setup

The app uses Expo's default environment configuration. For custom environment variables, you can create a `.env` file (which is already gitignored).

### Adding New Features

When adding new features, please follow the existing component structure and naming conventions:
- Place screens in the appropriate directory under `app/`
- Add reusable components to the `components/` directory
- Update types in the `types/` directory as needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.