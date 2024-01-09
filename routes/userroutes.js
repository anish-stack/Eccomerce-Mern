const express = require('express')
const { RegisterUser, LogginUser, LogoutUser } = require('../controllers/usercontroller')
const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { protect } = require('../middleware/authmiddlleware')
const { CreateOrder, orderForMe, orderForAdmin, UpdateOrderStatus } = require('../controllers/orderController')
const router  =express.Router()


router.post('/Register',RegisterUser)
router.post('/Login',LogginUser)
router.get('/Logout',protect,LogoutUser)

router.post('/create-product',protect,createProduct)
router.get('/all-product',getAllProducts)
router.post('/single-product/:id',getOneProduct)
router.patch('/update-product/:id',protect,updateProduct)
router.delete('/delete-product/:id',protect,deleteProduct)

router.post('/create-order/:productId',protect,CreateOrder)
router.get('/my-order',protect,orderForMe)
router.get('/admin-order',protect,orderForAdmin)

router.get('/update-order/:orderId',protect,UpdateOrderStatus)

module.exports=router 