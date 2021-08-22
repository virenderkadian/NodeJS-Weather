const request=require('request')

const forecast=({latitude:lat,longitude:lon}=geocodeData,callback)=>{
    const url='http://api.weatherapi.com/v1/current.json?key=0ea80079756140009b3144225211608&q='+ lat +','+ lon +'&aqi=no'
    request({url,json:true},(error,{body}=response)=>{
        if(error){
            callback('Internet connection not found',undefined)
        }else if(body.error){
            callback('Unale to find Location',undefined)
        }else {
            callback(undefined,'It is currently '+body.current.temp_c +' degree out. There is a '+ body.current.precip_mm+'% chance of rain.')
        }
    })
}

module.exports = forecast