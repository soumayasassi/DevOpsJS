const express = require('express');
const Product = require('./product');

const app = express();
app.use(express.json());



app.get('/', async (req, res) => {

        res.send("Hello UP Web");
    
    
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/products/:id', async (req, res) => {    
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new Error('Product not found');
        res.json(product);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});



app.post('/products', async (req, res) => {   
    try {
        const {name, price, quantity} = req.body;
        const product = new Product({name, price, quantity});
        await product.save();
        res.status(201).json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.put('/products/:id', async (req, res) => {  
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) throw new Error('Product not found');
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.delete('/products/:id', async (req, res) => {   
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) throw new Error('Product not found');
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = app;