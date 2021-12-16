const router = require('express').Router();
const notesRoutes = require('../apiRoutes/routes');

router.use(notesRoutes);

module.exports = router;