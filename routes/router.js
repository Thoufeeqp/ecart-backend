const express=require('express')
const controller=require('../controllers/productscontroller')

const router=new express.Router()

router.get('/products/getallproducts',controller.getallproduct)
router.get('/products/view/:id',controller.view)
router.delete('/wishlist/remove/:id',controller.removewish)
router.post('/wishlist/add',controller.addwish)
router.get('/wishlist',controller.getwish)
router.post('/products/cart',controller.addcart)
router.get('/cart',controller.getcart)
router.delete('/cart/delete/:id',controller.cartitemdelete)
router.get('/cart/increment/:id',controller.increment)
router.get('/cart/decrement/:id',controller.decrement)
router.delete('/cart/empty',controller.empty)

module.exports=router