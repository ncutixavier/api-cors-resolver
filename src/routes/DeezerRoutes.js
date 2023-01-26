import express from "express";
import DeezerControllers from '../controllers/DeezerControllers'
const router = express.Router()

router.get('/', DeezerControllers.login)
router.get('/auth', DeezerControllers.auth)
router.get('/search', DeezerControllers.search)
router.get('/profile', DeezerControllers.getUser)
router.post('/playlist', DeezerControllers.createPlaylist)

export default router
