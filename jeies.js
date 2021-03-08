const cards= document.getElementById('cards')
const items= document.getElementById('items')
const footer= document.getElementById('footer')
const templateCard=document.getElementById('template-card').content
const templateFooter=document.getElementById('template-footer').content
const templateCarrito=document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})
cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('relojes.json')
        const data = await res.json()
        pintarCards(data)
    }catch(error){
        console.log(error)
    }

} 

const pintarCards = data =>{
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.tittle
        templateCard.querySelector('p').textContent = producto.price
        templateCard.querySelector('img').setAttribute('src',producto.thumbnailUrl)
        templateCard.querySelector('.btn-buy').dataset.id= producto.id
        const clone = templateCard.cloneNode(true) 
        fragment.appendChild(clone)

    })
    cards.appendChild(fragment)
}

const addCarrito = e => { 
    if(e.target.classList.contains('btn-buy')){ /*si toco el buy va a dar true, porque contiene la clase*/
        setCarrito(e.target.parentElement) /*mandamos el elemento padre a set carrito */
    } /*el parent element nos traera el div entero */
    e.stopPropagation()
} 

const setCarrito = objeto => { /*esto capturara todos los elementos */
    const producto = { /*esto pondra objetos en el carrito */
        tittle : objeto.querySelector('h5').textContent, 
        price : objeto.querySelector('p').textContent,
        id : objeto.querySelector('.btn-buy').dataset.id,
        cantidad: 1 
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id]= {...producto}
    pintarCarrito()
}   

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.tittle
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.price * producto.cantidad

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
         
    })
    items.appendChild(fragment)
    pintarFooter()
}
const pintarFooter = () => {
    footer.innerHTML= ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML=`
        <th class="text-center" scope="row" colspan="5">Empty</th>
        `
       return 
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0 )
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price,0)
    
    templateFooter.querySelectorAll('td')[0].textContent=nCantidad
    templateFooter.querySelector('span').textContent=nPrecio

    const clone=templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}


const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad= carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    
    }

    e.stopPropagation()

}

/* CLIENTES */



        
/*         local storage               */

const nombreLocalStorage = localStorage.getItem('nombreUsuario');
console.log(nombreLocalStorage)

localStorage.removeItem(nombreUsuario)
console.log(nombreLocalStorage)

/* ESTO ES DE INDEX PAGO */

const templateTotal = document.getElementById('template-precio-total').content

console.log(templateTotal)

/* ESTO ES MODO NOCTURNO */

