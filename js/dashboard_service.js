tokenValidate()

function logout() {
    localStorage.removeItem('token')
    location.href = '../index.html'
}

function tokenValidate() {
    const TOKEN = localStorage.getItem('token')
    if (TOKEN === null) {
        location.href ='../index.html'
    }
    console.log('Autenticado',TOKEN)
}




























