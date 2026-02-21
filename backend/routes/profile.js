const express = require('express');
const profileControllers = require('../controllers/profile')
const fileExtract = require('../middleware/video_file')
const imageExtract = require('../middleware/file')

const router = express.Router()

router.put(
    "",
    fileExtract,
    profileControllers.testRouting2
)
router.patch(
    "",
    imageExtract,
    profileControllers.testRouting
)

module.exports = router;