document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password)
});

function login(email, password) {
    let message= ''
    let alertType=''
    const REQRES_ENDPOINT = 'https://reqres.in/api/login'
    fetch(REQRES_ENDPOINT,  {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        },
        body: JSON.stringify({email,password})
    })
    .then((response) =>{
        if (response.status ===200) {
            alertType ='success'
            message ='inicio exitoso'
            alertBuilder(alertType,message)
            localStorage.setItem('token',"hola")
            setTimeout (()=>{
                location.href='admin/dashboard.html'
            },2000)
        } else {
            alertType='danger'
            message='correo o contraseña invalida'
        }
        

        console.log('respuesta del servicio', response)
        alertBuilder(alertType, message)
    })
    .catch((error)=>{
        alertType ='danger'
        message = 'error inesperado'
        console.log('error en el setvicio', error)
        alertBuilder(alertType, message)
    })
}


function alertBuilder(alertType, message) {
    const alert= `<div class="alert alert-${alertType} alert-dismissible fade show" role="alert" >
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    document.getElementById('mensaje').innerHTML=alert;
}

  