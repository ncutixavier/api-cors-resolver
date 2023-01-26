import express from "express";
import CoinMarketControllers from '../controllers/CoinMarketControllers'
const router = express.Router()

router.get('/', CoinMarketControllers.getAllCryptocurrencies);

export default router
