import express from 'express';
import OrderItem from '../pages/api/admin/view-orders'
const router = express.Router();


router.get("/view-order", OrderItem);


module.exports = router;