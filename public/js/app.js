//Fetch API

console.log('Client side javaScript file is loaded!')

// //fetch json data from url
// fetch('http://puzzle.mead.io/puzzle').then((response) => {   //calling fetch in client side javascript will kick off an asynchronous I/O operation. Like calling request in node js.
//     response.json().then((data) => {
//         console.log(data)
//     })

// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

//messageOne.textContent = 'From JavaScript'

//adding even listener when search button gets clicked
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    //for running on localhost enable the line below
    // fetch('http://localhost:3000/weather?address='+location).then((response) => {

    //for running on heroku refer below method
    fetch('/weather?address='+location).then((response) => {
         response.json().then((data) => {
            if(data.error){
                messageTwo.textContent = data.error
                //console.log(data.error)
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })

    //console.log(location)
})