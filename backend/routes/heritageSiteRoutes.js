const express = require('express');
const {
  listHeritageSites,
  getHeritageSiteById,
  createHeritageSite,
  updateHeritageSite,
  deleteHeritageSite,
} = require('../controllers/heritageSiteController');

const router = express.Router();

router.route('/').get(listHeritageSites).post(createHeritageSite);
router
  .route('/:id')
  .get(getHeritageSiteById)
  .put(updateHeritageSite)
  .delete(deleteHeritageSite);

module.exports = router;
