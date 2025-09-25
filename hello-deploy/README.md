# hello-deploy

A minimal Next.js 14 + TypeScript starter optimized for Vercel deployments.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

## Production Build

```bash
npm run build
npm start
```

The production server listens on port 3000 by default.

## Deploying to Vercel

1. Push or import this repository into Vercel.
2. Set the **Root Directory** to `hello-deploy`.
3. Leave **Build Command** as `npm run build`.
4. Leave **Output Directory** as `.next`.

## Troubleshooting

- Ensure dependencies are installed with `npm install` before building.
- Confirm the Node.js version matches `.nvmrc` (LTS v20) locally and in CI.
- If the build output directory is incorrect, verify the Root Directory is set to `hello-deploy`.
- Delete `.next` and `node_modules` if incremental builds behave unexpectedly, then reinstall.

## Acceptance Criteria

- `npm run dev` starts the local development server and `/api/health` returns `{ ok: true }`.
- `npm run build` completes successfully.
- Deploying with Root Directory `hello-deploy` serves the app and the refresh button updates the timestamp.
