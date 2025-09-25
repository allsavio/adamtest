# Networking & Recruiting Engine

A plug-and-play networking, referral, and recruiting engine tailored for real estate brokerages and allied business ecosystems. The application is designed around MongoDB for flexible schemas and provides modules for:

- Rolodex-style contact management with tagging and metadata.
- Event tracking for experiences such as TopGolf, poker nights, wine tastings, and retreats.
- Referral tracking with auto-generated agreement prompts for Codex or other AI assistants.
- Recruitment pipeline automation specific to real estate agent funnels.
- Optional faith and family routines to integrate spiritual rhythms alongside business operations.

> **Note on deployment targets**: The API defaults to private/local usage. Leave the `PUBLIC_OUTPUT_ENABLED` flag unset or `false` to reject any request that carries the `x-delivery-visibility: public` header. Flip it to `true` only when you intentionally want to expose read-only endpoints.

## Project structure

```
src/
  config/           # MongoDB connection helpers
  controllers/      # Request handlers for each module
  middleware/       # Error handling
  models/           # Mongoose models (Contacts, Events, Referrals, Pipelines, Faith)
  routes/           # Express routers mounted under /api
  services/         # Automation + agreement prompt generators
  server.js         # Application bootstrap
```

## Core data models

### Contact
- Supports contact typing (broker, sponsor, vendor, investor, family, etc.)
- Flexible tags, categories, and metadata map to extend profile attributes
- Virtual `displayName` for quick list rendering

### Event
- Logs RSVPs, attendance, follow-up tasks, and sponsorship contributions
- Event categories capture repeatable brokerage experiences (TopGolf, retreats, etc.)
- Automations generate default follow-up actions when attendees are checked in

### Referral
- Tracks referrer/referee relationships and categorizes professional specialties
- Automatically generates a Codex-ready agreement prompt whenever a referral is created or closed without a prompt
- Stores both expected and actual deal values for ROI measurement

### RecruitmentPipeline
- Designed for agent lifecycle: invite → event → 1:1 → onboarding → closed
- Generates recommended next steps per stage (handwritten card reminders, coffee scheduling, onboarding tasks)
- Steps retain completion history when stages advance so you never lose context

### FaithRoutine (optional)
- Stores recurring spiritual routines (Mass, confession, prayer groups)
- Embedded journal entries enable virtue tracking and personal reflections tied to your brokerage relationships

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Provide environment variables**
   Create a `.env` file at the project root:
   ```env
   MONGO_URI=mongodb://localhost:27017/networking-engine
   PORT=4000
   PUBLIC_OUTPUT_ENABLED=false
   ```

3. **Run the API**
   ```bash
   npm start
   ```

   The API listens on `http://localhost:4000` by default.

## API overview

| Module      | Method | Endpoint                                 | Purpose                                  |
|-------------|--------|-------------------------------------------|------------------------------------------|
| Contacts    | GET    | `/api/contacts`                           | List contacts with optional filters      |
|             | POST   | `/api/contacts`                           | Create a new contact                     |
|             | GET    | `/api/contacts/:contactId`                | Fetch single contact                     |
|             | PUT    | `/api/contacts/:contactId`                | Update a contact                         |
|             | DELETE | `/api/contacts/:contactId`                | Delete a contact                         |
| Events      | GET    | `/api/events`                             | List events (filter by category)         |
|             | POST   | `/api/events`                             | Create event                             |
|             | POST   | `/api/events/:eventId/rsvp`               | Upsert RSVP for a contact                |
|             | POST   | `/api/events/:eventId/attendance`         | Log attendee check-in & follow-ups       |
|             | POST   | `/api/events/:eventId/sponsorships`       | Track sponsorship contribution           |
| Referrals   | GET    | `/api/referrals`                          | List referrals (filter by category/status)|
|             | POST   | `/api/referrals`                          | Create referral + auto agreement prompt  |
|             | PUT    | `/api/referrals/:referralId`              | Update referral & regenerate prompt      |
| Pipelines   | GET    | `/api/pipelines`                          | List recruitment pipelines               |
|             | POST   | `/api/pipelines`                          | Create pipeline (auto next steps)        |
|             | POST   | `/api/pipelines/:pipelineId/stage`        | Advance agent to next stage              |
|             | POST   | `/api/pipelines/:pipelineId/steps/:stepId`| Update individual pipeline step          |
| Faith       | GET    | `/api/faith`                              | List faith routines                      |
|             | POST   | `/api/faith`                              | Create routine                           |
|             | POST   | `/api/faith/:routineId/journal`           | Append journal entry                     |

## Automation hooks

- **Follow-up generation**: `automationService.generateFollowUpTasks` can be extended per event category.
- **Stage playbooks**: `automationService.deriveNextSteps` controls pipeline task templates.
- **Referral agreements**: `agreementService.buildReferralAgreementPrompt` returns the payload to send to OpenAI/Codex or your document automation stack.

## Security & privacy

- Keep `PUBLIC_OUTPUT_ENABLED=false` unless exposing a sanitized public API. Use middleware or API gateway rules to enforce this flag downstream.
- The built-in `publicGuard` middleware blocks requests that advertise `x-delivery-visibility: public` unless `PUBLIC_OUTPUT_ENABLED=true`.
- MongoDB schemas use flexible `metadata` maps so sensitive data can be segregated without schema rewrites.
- Integrate with your auth provider (e.g., Auth0, Cognito) by adding authorization middleware before the route registrations in `src/server.js`.

## Future enhancements

- Add GraphQL gateway for partner integrations
- Webhook automations for referral status changes
- Calendar integrations (Google/Microsoft) for follow-up scheduling
- SMS/email automation to operationalize pipeline tasks
- UI layer (React/Next.js) for team dashboards and journaling

