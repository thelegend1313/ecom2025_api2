const express = require('express')
const router = express.Router()
const { create, list, remove } = require('../controllers/category')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// @ENDPOINT http://localhost:5001/api/category
//router.post('/category', authCheck, adminCheck, create)
router.post('/category', authCheck, create)
router.get('/category', list)
//router.delete('/category/:id', authCheck, adminCheck, remove)
router.delete('/category/:id', authCheck, remove)






module.exports = router