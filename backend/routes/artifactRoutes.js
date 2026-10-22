const express = require('express');
const {
  listArtifacts,
  getArtifactById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
} = require('../controllers/artifactController');

const router = express.Router();

router.route('/').get(listArtifacts).post(createArtifact);
router
  .route('/:id')
  .get(getArtifactById)
  .put(updateArtifact)
  .delete(deleteArtifact);

module.exports = router;
