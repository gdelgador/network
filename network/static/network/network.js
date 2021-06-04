document.addEventListener('DOMContentLoaded',function () {
    
    document.querySelector('#compose-form').onsubmit = alert_p;
});


function alert_p() {
    window.alert('hoa')
}


function load_post() {
    document.querySelector('#demo').innerHTML = '<h1>hola</h1>' ;
    
    console.log('h1')
}


function send_tweet() {

    let p = document.querySelector('#tweetpost').value

    console.log(p)
    // call api

    // reload -page index
    location.reload();
}

function edit_post(params) {
    
}

function profile(params) {
    
}