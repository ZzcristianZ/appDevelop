

function users(page) {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de usuarios</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/users?page='+page
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        }
    })
    .then((response)=>{
        return response.json().then(
            data =>{
                return{
                    status: response.status,
                    info:data
                }
            }
        )
    })
    .then((result)=>{
        if (result.status===200) {
            let list_user = `<table class="table">
            <button type="button" class="btn btn-outline-success justify-content-center" onclick="createUser()">Crear</button>
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellido</th>
            <th scope="col">Avatar</th>
            <th scope="col">Accion</th>
            </tr>
            </thead>
            <tbody>
            `
            result.info.data.forEach(element => {
                list_user=list_user+`
                <tr>
                <td>${element.id}</td>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td><img src="${element.avatar}" class="img-thumbnail" alt="avatar del usuario"></td>
                <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
                </tr>
                `
            });
            list_user=list_user+`
            </tbody>
            </table>
                        <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('2')">2</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
            `
            
            document.getElementById('info').innerHTML=list_user
        }else{
            document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
        }
    })
}


function getUser(idUser) {
    console.log("id", idUser)
    const REQRES_ENDPOINT = 'https://reqres.in/api/users/'+idUser
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        }
    })
    .then((result)=>{
        console.log("result", result)
        return result.json().then(
            data =>{
                return{
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response)=>{
        if(response.status===200){
            const user= response.body.data
            console.log("hola", user)
            const modalUser= `
                                <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                          <img src="${user.avatar}" class="rounded-circle" style="width: 100px; height: 100px; object-fit: cover; display: block; margin: auto;" alt="No se encontró el avatar">
                          <div class="card-body">
                          <h5 class= "card-title">Informacion del usuario</h5>
                            <p class="card-text">Nombre: ${user.first_name}</p>
                            <p class="card-text">Apellido: ${user.last_name} </p>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
            `
            document.getElementById('viewModal').innerHTML=modalUser
            const modal = new bootstrap.Modal(
                document.getElementById('modalUser')
            )
            modal.show()
        }
        else{
            document.getElementById('info').innerHTML='<h3>No se encontrò el usuario en la Api</h3>'
        }
    })
}

function createUser() {
  const modalUser= `
                                <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Crear usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                          <div class="card-body">
                            <form id="formCreateUser">
                              <div class="row">
                                <div class="col">
                                  <input type="text" class="form-control" id="first_name" placeholder="First name" aria-label="First name" required>
                                </div>
                                <div class="col">
                                  <input type="text" class="form-control" id="last_name" placeholder="Last name" aria-label="Last name" required>
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col">
                                  <input type="email" class="form-control" id="email"  placeholder="Email" aria-label="Email" required>
                                </div>
                                <div class="col">
                                  <input type="password" class="form-control" id="password"  placeholder="Password" aria-label="Password" required>
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col ">
                                  <button type="button" class="btn btn-success" onclick="saveUser() ">Guardar</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
            `
            document.getElementById('viewModal').innerHTML=modalUser
            const modal = new bootstrap.Modal(
                document.getElementById('modalUser')
            )
            modal.show()
}

function saveUser() {
  const form= document.getElementById("formCreateUser")
  if (form.checkValidity()) {
    const first_name = document.getElementById('first_name').value
    const last_name = document.getElementById('last_name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    const user ={first_name,last_name,email,password}
    const REQRES_ENDPOINT = 'https://reqres.in/api/users'
    fetch(REQRES_ENDPOINT,  {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        },
        body: JSON.stringify(user)
    })
    .then((response)=>{
        
        if (response.status===201) {
          
          document.getElementById('info').innerHTML=
          '<h3> Se ha guardado el usuario</h3>'
        }
        else{
          document.getElementById('info').innerHTML=
          '<h3>Error al guardar el usuario</h3>'
        }
        const modalId= document.getElementById('modalUser')
        const modal =  bootstrap.Modal.getInstance(modalId)
        modal.hide()
    })
  }
  else{
    form.reportValidaty()
  }
  
}