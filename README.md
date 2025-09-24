# Brokerage Networking & Recruiting Engine

A plug-and-play platform that unifies networking, referral management, and recruiting workflows for real-estate brokerages and their extended business ecosystem. The service exposes a modular REST API backed by MongoDB so you can plug it into existing CRMs, automation tools, or future UI layers.

## Features

### Networking Rolodex
- Store and tag contacts across brokers, vendors, sponsors, investors, and family members.
- Query by categories, tags, or text search for fast lookup.
- Extend contacts with custom metadata for niche workflows.

### Event Tracking
- Create TopGolf outings, wine tastings, retreats, or custom events.
- Log RSVPs, attendance, follow-ups, and sponsorship contributions.
- Maintain a single view of engagement history for every contact.

### Referral & Pipeline Tracking
- Record inbound/outbound referrals tied to contact categories (CPA, contractor, etc.).
- Auto-generate Codex-ready agreement prompts whenever a referral is created.
- Track referral status from initiation through close.

### Recruitment Funnel Automation
- Visualize the agent journey (Invite → Event → 1-on-1 → Paperwork → Onboarding → Active).
- Store action plans for each stage and push notes as a candidate advances.
- Automate next steps like handwritten card prompts or coffee meetings.

### Faith & Family Layer (Optional)
- Capture Mass/confession schedules, prayer groups, and devotionals.
- Maintain a private journal and virtue tracker for holistic growth.

## Project Structure

```
src/
  app.ts                 # Express app wiring & route registration
  server.ts              # Server bootstrap & Mongo connection
  config/
    database.ts          # MongoDB connection helpers
  controllers/           # REST controllers for each module
  models/                # Mongoose schemas (contacts, events, referrals, etc.)
  modules/
    networking/          # Contact, event, and referral services
    recruitment/         # Recruitment funnel logic & action plans
    faith/               # Faith/family journaling services
  routes/                # Express routers per module
  utils/
    referralAgreement.ts # Generates Codex prompts for referral agreements
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Provision MongoDB**
   - Use MongoDB Atlas or a local instance.
   - Grab the connection string (e.g., `mongodb://localhost:27017/brokerage`).

3. **Configure environment**
   Create a `.env` file:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/brokerage
   PORT=4000
   ```

4. **Run the service**
   ```bash
   npm run dev
   # or build & run
   npm run build
   npm start
   ```

5. **Hit the health check**
   ```bash
   curl http://localhost:4000/health
   ```

## API Overview

### Contacts (`/contacts`)
- `POST /` – create a contact
- `GET /` – list contacts with optional `categories`, `tags`, and `search` query params
- `PUT /:id` – update a contact
- `DELETE /:id` – delete a contact

### Events (`/events`)
- `POST /` – create an event
- `POST /:id/rsvps` – add RSVP with status & guest count
- `POST /:id/attendance` – mark attendees
- `POST /:id/follow-ups` – schedule follow-up actions
- `POST /:id/sponsors` – log sponsor contributions

### Referrals (`/referrals`)
- `POST /` – create referral (returns Codex prompt for agreement generation)
- `PATCH /:id/status` – update referral status
- `GET /category/:category` – list referrals by category with contact context

### Recruitment (`/recruitment`)
- `POST /` – create a recruitment pipeline for a candidate
- `POST /:id/advance` – advance candidate to the next stage & log touchpoint
- `GET /actions/:stage` – fetch automated action plan for a stage

### Faith & Family (`/faith`)
- `PUT /:ownerId` – upsert routines & virtue dashboard for the owner
- `POST /:ownerId/journal` – add journal entries
- `POST /:ownerId/virtues` – add virtue metrics

## Automation Hooks & Integrations

- **Codex Agreement Prompts:** Each referral includes a `agreementPrompt` payload you can feed into OpenAI Codex / GPT actions to generate ready-to-sign agreements.
- **Action Plans:** The recruitment module exposes recommended actions per stage; use webhooks or workflow engines (Zapier, Make.com) to automate reminders, handwritten card prompts, or scheduling nudges.
- **Metadata Fields:** Contacts, events, and faith practices store flexible `metadata` objects so you can overlay sponsor tiers, family notes, or spiritual goals without schema migrations.

## Development Notes

- The project uses modern ECMAScript modules with TypeScript. Build via `npm run build` to emit JS in `dist/`.
- Add validation, authentication, or UI layers as needed; the services are intentionally thin for easy extension.
- Remember to build compound indexes in MongoDB to optimize frequent queries (already defined in the schemas).

## Testing

Automated tests are not included yet. Use the provided REST endpoints with tools like Postman or curl, and extend with unit tests as you evolve the platform.

## License

MIT
