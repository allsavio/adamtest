const express = require('express');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./config/database');
const contactsRouter = require('./routes/contacts');
const eventsRouter = require('./routes/events');
const referralsRouter = require('./routes/referrals');
const pipelinesRouter = require('./routes/pipelines');
const faithRouter = require('./routes/faith');
const errorHandler = require('./middleware/errorHandler');
const publicGuard = require('./middleware/publicGuard');

dotenv.config();

const app = express();
app.use(express.json());
app.use(publicGuard);

app.use('/api/contacts', contactsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/referrals', referralsRouter);
app.use('/api/pipelines', pipelinesRouter);
app.use('/api/faith', faithRouter);

app.use(errorHandler);

const port = process.env.PORT || 4000;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Networking engine API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });

module.exports = app;
