function products(pagina) {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de productos</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/products?page='+pagina
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
            let list_products = `<table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Año</th>
                    <th scope="col">Value pantone</th>
                    <th scope="col">color</th>
                    <th >Accion</th>
                  </tr>
                </thead>
                <tbody>
                
            `
            result.info.data.forEach(element => {
                list_products=list_products+`
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.year}</td>
                    <td>${element.pantone_value}</td>
                    <td><input type='color' value='${element.color}'></td>
                    <td><button type="button" class="btn btn-outline-info" onclick="getProduct('${element.id}')">Ver</button></td>
                `
            });
            list_products=list_products+`
                </tbody>
            </table>
                        <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#" onclick="products('1')">1</a></li>
                <li class="page-item"><a class="page-link" href="#" onclick="products('2')">2</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
            `
            document.getElementById('info').innerHTML=list_products
        }else{
            document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
        }
    })
}


function getProduct(idProduct) {
    console.log("id", idProduct)
    const REQRES_ENDPOINT = 'https://reqres.in/api/products/'+idProduct;
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
            const productos= response.body.data
            console.log("id", productos)
            const modalProductos= `
                                <div class="modal fade" id="modalProductos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                          <div class="card" style="background-color:${productos.color}; padding: 20px;">
 
                          <div class="card-body">
                          <h5 class= "card-title" >Informacion del producto</h5>
                          
                            <p class="card-text">Nombre: ${productos.name}</p>
                            <p class="card-text">año: ${productos.year} </p>
                            <p class="card-text">año: ${productos.pantone_value} </p>
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
            
            document.getElementById('viewModal').innerHTML=modalProductos
            
            const modal = new bootstrap.Modal(
                document.getElementById('modalProductos')
            )
            modal.show()
            
        }
        else{
            document.getElementById('info').innerHTML='<h3>No se encontrò el usuario en la Api</h3>'
        }
    })
}



