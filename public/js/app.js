console.log('client side js on')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg-1')

const msg2=document.querySelector('#msg-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    console.log(location)
    msg1.textContent='Loading...'
    msg2.textContent=''

    fetch('http://localhost:4000/weather?location='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error
        }
        else{
            msg1.textContent=data.location
            msg2.textContent=data.forecast
            //console.log(data.forecast)
            //console.log(data.location)
        }
    })
})

})