const express = require('express');
const router = express.Router();
const pipelinesController = require('../controllers/pipelinesController');

router.get('/', pipelinesController.listPipelines);
router.post('/', pipelinesController.createPipeline);
router.post('/:pipelineId/stage', pipelinesController.updateStage);
router.post('/:pipelineId/steps/:stepId', pipelinesController.updateStep);

module.exports = router;
