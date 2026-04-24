# 🛠️ Developer Productivity Tool

A full-stack web application designed to help **engineering managers** and **individual contributors (ICs)** track, visualize, and improve developer productivity metrics. The tool surfaces key performance indicators, auto-generates insights, and provides actionable suggestions based on each developer's data.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#api-reference)
- [Key Metrics Tracked](#key-metrics-tracked)
- [Views](#views)
- [Components](#components)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## Overview

The Developer Productivity Tool is a dashboard-style application that allows teams to:

- Browse a list of developers and their profiles
- Drill down into individual developer metrics
- View auto-generated insights about performance bottlenecks
- Receive tailored suggestions for improvement

It is built with a clean separation between the **Node.js/Express backend** (serving metrics and insights) and a **React + TailwindCSS frontend** (rendering the dashboard UI).

---

## Features

- 📊 **Metrics Dashboard** — Visual display of key developer productivity metrics with color-coded status indicators (green/red)
- 👤 **Developer Selector** — Browse and select individual developers from a list
- 💡 **AI-style Insight Engine** — Rule-based backend service that generates insights and suggestions per developer
- 🧑‍💼 **Dual Views** — Separate views for Managers and Individual Contributors (ICs)
- 🔗 **REST API** — Clean Express.js API with versioned routes
- 🌐 **CORS Support** — Configurable cross-origin support for local development

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js v5 | HTTP server and routing |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |
| ES Modules (`type: module`) | Modern JS module syntax |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| React Router DOM v7 | Client-side routing |
| Vite 8 | Build tool and dev server |
| TailwindCSS v4 | Utility-first styling |
| Axios | HTTP client for API calls |
| Lucide React | Icon library |

---

## Project Structure

```
Developer-Productivity-Tool/
│
├── backend/
│   ├── app.js                          # Express app entry point
│   ├── package.json
│   └── src/
│       ├── controllers/
│       │   └── developer.controller.js # Request handlers
│       ├── routers/
│       │   └── developer.routes.js     # Route definitions
│       └── services/
│           ├── insight.service.js      # Insight & suggestion generation
│           └── metricsStatus.service.js# Metric health status logic
│
├── data/
│   └── mockData.js                     # Mock developer & metrics data
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx                     # Root component with routing
        ├── main.jsx                    # React entry point
        ├── pages/
        │   ├── ManagerView.jsx         # Manager dashboard page
        │   └── ICView.jsx              # Individual Contributor page
        └── components/
            ├── Navbar.jsx              # Top navigation bar
            ├── DeveloperSelector.jsx   # Developer list and selection
            ├── MetricsDashboard.jsx    # Metrics overview grid
            ├── MetrticsCard.jsx        # Individual metric card
            └── DeveloperInsightsPanel.jsx # Insights & suggestions panel
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   ORIGIN=http://localhost:5173
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

The backend will be running at `http://localhost:3000`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

---

## API Reference

All routes are prefixed with `/api/v1/developer`.

### `GET /api/v1/developer/get-developers`

Returns the full list of developers.

**Response:**
```json
[
  {
    "id": "dev-001",
    "name": "Alice Johnson",
    "role": "Senior Engineer",
    ...
  }
]
```

---

### `GET /api/v1/developer/get-dev-metrics/:dev_id`

Returns detailed metrics, insights, and suggestions for a specific developer.

**URL Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `dev_id` | string | The unique ID of the developer |

**Response:**
```json
{
  "developer": { "id": "dev-001", "name": "Alice Johnson", ... },
  "metrics": [ ... ],
  "insights": [ "Lead time is significantly high..." ],
  "suggestions": [ "Break PRs into smaller chunks..." ]
}
```

**Error Response (404):**
```json
{ "message": "Developer not found" }
```

---

## Key Metrics Tracked

| Metric ID | Name | Description |
|---|---|---|
| `lead-time` | Lead Time | Time from code commit to production deployment |
| `bug-rate` | Bug Rate | Frequency of bugs introduced in released code |
| `pr-throughput` | PR Throughput | Number of pull requests merged per period |
| `deploy-freq` | Deploy Frequency | How often code is deployed to production |

Each metric is evaluated as **green** (healthy) or **red** (needs attention) by the `metricsStatus.service.js`. The insight engine then generates human-readable observations and improvement suggestions based on those statuses.

---

## Views

### Manager View (`/manager`)
Provides a high-level overview for engineering managers. Allows browsing all developers and viewing their productivity metrics and generated insights side by side.

### IC View (`/ic`)
Tailored for Individual Contributors to view their own metrics and receive personal improvement suggestions.

---

## Components

| Component | Description |
|---|---|
| `Navbar` | Top navigation bar with links to Manager and IC views |
| `DeveloperSelector` | Lists all developers; handles selection state |
| `MetricsDashboard` | Renders a grid of metric cards for the selected developer |
| `MetrticsCard` | Displays a single metric with its value and health status indicator |
| `DeveloperInsightsPanel` | Shows the generated insights and suggestions for the selected developer |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the Express server listens on |
| `ORIGIN` | `http://localhost:5173` | Allowed CORS origin (your frontend URL) |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## Author

**RohitBCA456** — [GitHub Profile](https://github.com/RohitBCA456)

---

> Built with ❤️ to help engineering teams ship better, faster.