


function products() {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de productos</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/products?page=1'
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
                `
            });
            list_products=list_products+`
                </tbody>
            </table>
            `
            document.getElementById('info').innerHTML=list_products
        }else{
            document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
        }
    })
}




