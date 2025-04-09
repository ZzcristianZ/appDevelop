document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let mensaje = ''
    if (email === '' || password=== '') {
        mensaje='por favor completa estos campos. '
        tipoAlerta='warning'
    }else if (email === 'prueba@gmail.com' && password === '12345') {
        mensaje = 'inicio de secion exitoso. '
        tipoAlerta='success'

    }else{
        mensaje = 'correo o contraseña incorrecta. '
        tipoAlerta='danger'

    }
    let alerta= `<div class="alert alert-${tipoAlerta} alert-dismissible fade show" role="alert" >${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    document.getElementById('mensaje').innerHTML=alerta;
});

  