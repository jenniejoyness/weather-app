# Weather App

A modern React-based weather application with real-time alerts and predictions. This client-side application provides weather information, customizable weather alerts, and weather predictions.

## Features

- **Current Weather Display**: View real-time weather information for any location
- **Weather Alerts**: Create and manage custom weather alerts based on various parameters (temperature, humidity, wind speed, etc.)
- **Weather Predictions**: Get weather forecasts and predictions
- **Real-time Notifications**: Receive instant toast notifications when weather alerts are triggered via WebSocket connection

## Technology Stack

- **Frontend**: React 19 with Vite for fast development and building
- **WebSocket**: Real-time communication for alert notifications
- **Build Tool**: Vite with React plugin

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application in dev mode will be available at `http://localhost:3000`

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

The application in production mode will be available at `http://localhost:4173`

## WebSocket Configuration

The application connects to a WebSocket server at `ws://localhost:4000` for real-time alert notifications. Ensure your WebSocket server is running on this port to receive live weather alerts.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # React components
│   ├── AddAlertForm/    # Form for creating weather alerts
│   ├── AlertCard/       # Individual alert display
│   ├── AlertsDisplay/   # Alerts management page
│   ├── SearchBar/       # Location search functionality
│   ├── ToastContainer/  # Notification system
│   ├── WeatherDisplay/  # Current weather display
│   └── Predictions/     # Weather predictions
├── hooks/               # Custom React hooks
│   └── useWebSocket.js  # WebSocket connection management
├── services/            # External service integrations
│   └── websocketService.js
└── App.jsx              # Main application component
```