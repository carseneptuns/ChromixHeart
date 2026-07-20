const cartModel = require("../models/cartModel");

const addToCart = async (req,res) =>{

    console.log(req.body);

    try{

        const{
            user_id,
            produk_id,
            quantity

        }=req.body;

        await cartModel.addToCart(

            user_id,
            produk_id,
            quantity
        );

        res.json({

            success:true,
            message:"Produk berhasil ditambahkan ke cart"
        });
    }catch(err){

        console.log(err);
        res.status(500).json({

            success:false, 
            message:err.message
        });
    }
};

const getCart = async (req,res)=>{

    try{

        const data = await cartModel.getCart(
            req.params.user_id
        );

        res.json({

            success:true,
            data
        });
    }catch(err){

        console.log(err);

        res.status(500).json({

            success:false,
            message:err.message
        });
    }
};
const updateQuantity = async (req, res) => {

    try {

        await cartModel.updateQuantity(
            req.params.id,
            req.body.quantity
        );

        res.json({
            success: true,
            message: "Quantity berhasil diupdate"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

const deleteCart = async (req, res) => {

    try {

        await cartModel.deleteCart(req.params.id);

        res.json({
            success: true,
            message: "Produk dihapus"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports={
    addToCart,
    getCart,
    updateQuantity,
    deleteCart
};
