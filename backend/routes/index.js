const dataRoutes = require('./data');
const authRoutes = require('./auth');

module.exports = (app, passport) => {
  app.use('/auth', authRoutes);
  app.use('/api/data', dataRoutes);
};


