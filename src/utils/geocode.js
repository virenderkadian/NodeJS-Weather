const request=require('request')



const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmszMzk2IiwiYSI6ImNrc2V0Y2c5dTBrNmcydW9meGd6eGwzbDQifQ.2cXIE-x3-X58_MKJO-F5xg&limit=1'
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Internet Connnection not found!',undefined)
        }
        else if (body.features.length===0){
           callback('No match found!',undefined)
        }
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode