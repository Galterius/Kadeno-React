const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser')

const expressError = require('./utils/ExpressError');
const catchAsync = require('./utils/CatchAsync');
const { listingSchima } = require('./schemas.js')

const Listing = require('./models/listings')
const path = require('path');

mongoose.connect('mongodb://localhost:27017/Sell_It', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected successfuly")
})

const app = express();

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(bodyParser.json());

const validateListing = (req, res, next)=>{
    const { error } = listingSchima.validate(req.body);
    if(error){
        const msg = error.details.map(elements => elements.message).join(',')
        throw new expressError(msg, 400)
    }else{
        next();
    }
}

app.get('/', (req, res)=>{
    //res.render('home')
});

app.get('/api/listings', catchAsync(async (req, res) => {
    const listings = await Listing.find({})
    res.json(listings);
}));

app.get('/listings/new', (req, res)=>{
    //res.render('listings/new')
});


app.post('/api/listings',cors() ,catchAsync(async (req,res) =>{
    const listing = new Listing(req.body);
    await listing.save();
    //res.redirect(`/listings/${listing._id}`)
}));

app.get('/api/listings/:id', catchAsync(async (req, res)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        throw new AppError( 404, 'Your product cannot be found')
    }
    res.json(listing);
    //res.render('listings/show', {listing});
}));

app.get('/listings/:id/edit', catchAsync(async (req,res)=>{
    const listing = await Listing.findById(req.params.id)
    res.render('listings/edit', {listing});
}));

app.put('/api/listings/:id',cors(), async (req,res)=>{
    const { id } = req.body;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body})
});

app.delete('/api/listings/:id', cors(), catchAsync(async (req, res)=>{
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("deleted");
    // res.redirect('/listings')
}));

app.all('*', (req, res, next) =>{
    next(new expressError('Page not found', 404))
});

//ha err az elso akkor, az express egybol error handler middlewarekent kezeli 
app.use((err, req, res, next)=>{
    const { status= 500} = err;
    if(!err.message){
        err.message = 'Something went wrong'
    }

    //res.status(status).render('error', {err})
})

app.listen(5000, ()=>{
    console.log('Sell It Server is running')
});

