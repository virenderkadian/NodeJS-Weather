const express=require('express')
const request = require('request')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const app =express()


const port=process.env.PORT || 4000


const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'Virender',
        title:'Weather',
        author:'Virender'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message1:'Help',
        message2:'hell.',
        title:'Weather',
        author:'Virender'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'about me',
        author:'Virender',
        title:'Weather'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        
        return res.send({
            error:'Please Enter a Location in search bar'
        })
    }

    geocode(req.query.location,(error,geocodeData)=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(geocodeData,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:'error'
                })
            }
            res.send({
                title:'Weather',
                //author:'Virender',
                forecast:forecastData,
                location:geocodeData.location
            })
        })
    })
    // res.send({
    //     forecast: 'forecast',
    //     location:req.query.location,
    //     author:'Virender',
    //     title:'Weather'
    // })
})

app.get('/product',(req,res)=>{
    console.log(req.query.s)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message1:'Help article not found',
        message2:'Please visit the following links',
        title:'Weather ',
        author:'Virender'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        message1:'ERROR 404 not found',
        message2:'Please visit the following links',
        title:'Weather',
        author:'Virender'
    })
})

app.listen(port,()=>{
    console.log('connection made on '+port)
})

