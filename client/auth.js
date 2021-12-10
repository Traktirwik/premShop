let butt = document.getElementById("ignat")


butt.onclick =async function() {
    var data = JSON.stringify({
        "email": "admin",
        "password": "admin777"
      });
    var config = {
    method: 'post',
    url: 'http://localhost:3000/signIn',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };
    let response = await axios(config)
    
    if(response.data.success == true) {
        window.location.href = "/"
    }
      
}