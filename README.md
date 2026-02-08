# ✈️ BearFlights

BearFlights is a fullstack project built to strengthen my understanding of **backend-to-frontend data flow**, data enrichment, and real-world API integration.

The project collects live flight data from the OpenSky Network, processes and enriches it using Python, stores it in Supabase, and presents it in a Next.js frontend in a clear and engaging way.

---

## 🎯 Purpose of the Project:

The goal of BearFlights was not just to “make something work”, but to deeply understand:

- how backend data flows all the way to the UI
- how Supabase can act as a bridge between backend and frontend
- how to work with real, imperfect API data
- how structured data can be transformed into something understandable and fun to explore

This project helped solidify my mental model of how:

> Python → Database → Frontend → UI  

works in practice.

---

## ✈️ Personal Motivation

I have always found it fun to watch aircraft and wonder where they are going.  
Over time, that curiosity turned into an interest in tracking flights and understanding the data behind them.

With BearFlights, that interest became more automated — instead of physically watching the sky to see if an aircraft passed by, I can now let the system do the observing and tell me what happened.

This made the project both technically educational and genuinely enjoyable to build.

---

## 🏗️ Architecture & Design Decisions

### From a Single Next.js Project to a Split Architecture

The project initially started as a single Next.js application, handling both frontend rendering and backend ingestion logic.

As ingestion, enrichment, and scheduling logic grew, this approach became increasingly hard to reason about. Backend concerns and UI concerns began to overlap, increasing cognitive load and making further changes riskier.

To improve clarity and maintainability, the backend ingestion and data processing logic was moved to a dedicated **Python backend**, while Next.js was kept focused purely on data presentation and consumption.

This separation made it significantly easier to:
- reason about where changes belong
- evolve backend logic independently of the UI
- clearly understand how backend changes should be reflected in the frontend

---

### Ingestion Runtime & Scheduling

Early experiments were done using **Supabase Functions** for data ingestion.  
While convenient, this approach introduced limitations around execution time, rate limiting, and overall flexibility as the ingestion pipeline became more complex.

To gain full control over execution, logging, and scheduling, the ingestion pipeline was moved to **GitHub Actions**.

Running ingestion via GitHub Actions provides:
- fewer platform-imposed limits
- explicit, versioned execution
- better observability during ingestion
- more room to evolve the pipeline over time

Supabase remains the shared data layer between backend and frontend, acting as a stable data contract rather than an execution environment.

## 🧠 What the Project Does:

### Backend (Python)
- Authenticates with the OpenSky Network using OAuth2
- Fetches live aircraft state data
- Filters aircraft within a defined geographic radius
- Enriches data by:
  - calculating distance using the Haversine formula
  - identifying nearest and farthest aircraft
  - attempting to infer departure country
- Stores and updates enriched data in Supabase
- Uses **strict typing** to improve reliability, clarity, and maintainability

This significantly improved my understanding of Python, especially around:
- type safety
- defensive programming
- explicit data validation
- clean function boundaries

---

### Database (Supabase)
- Acts as the central data layer
- Stores:
  - individual flight observations
  - enriched flight metadata
  - daily flight summaries
- Makes it easy to share the same dataset between:
  - backend ingestion scripts
  - frontend Server Components

---

### Frontend (Next.js)
- Built using the App Router and Server Components
- Fetches data directly from Supabase
- Displays:
  - a flight overview table
  - a detailed view for each flight via dynamic routes
- Focuses on:
  - clarity
  - structure
  - readable data presentation

---

### Frontend Quality & Performance

The frontend is validated using Lighthouse to ensure consistently high standards for:

- Performance
- Accessibility
- Best practices
- SEO

This helps prevent silent regressions and keeps the UI fast, accessible, and search-friendly.

![Lighthouse Desktop Results](/docs/lighthouse.png)

---

## 🧩 Key Learnings:

Through this project I gained:

- a stronger understanding of fullstack data flow
- hands-on experience with real API integrations
- practical experience using Supabase in production-like scenarios
- improved confidence with Python strict typing
- a deeper understanding of Next.js routing and Server Components
- experience turning raw data into meaningful UI

---

## 🟢 Working on now:

- AI description in integrated into frontend.

---

## 🚀 Future Ideas:

- Additional data enrichment over time
- Polyline w/ full route on map
- Intergrate a AI to either further explain about the flights or the company.

---

## ▶️ Running the Project Locally

This project consists of two main parts:

- a Python backend responsible for ingestion and data enrichment
- a Next.js frontend responsible for presenting the data

Prerequisites:

- Node.js (18+ recommended)
- npm / pnpm / yarn
- Python 3.11+
- Supabase project (URL + anon key)

### Frontend (Next.js)

Install dependencies:

- npm install
- Create a .env.local file:
- NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
- NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

Start the development server:

- npm run dev

Open the app in your browser:

- 👉 http://localhost:3000

---

Built to understand how data survives the journey from Python to pixels.

---

## 📜 License:
- MIT
