import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import recruitmentRoutes from './routes/recruitmentRoutes.js';
import faithRoutes from './routes/faithRoutes.js';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/contacts', contactRoutes);
app.use('/events', eventRoutes);
app.use('/referrals', referralRoutes);
app.use('/recruitment', recruitmentRoutes);
app.use('/faith', faithRoutes);

export default app;
