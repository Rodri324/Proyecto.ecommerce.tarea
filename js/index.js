const count = document.querySelector('#countCar')
const header = document.querySelector("header");
const cartList = document.querySelector(".cartList");
const menuIcon = document.querySelector('.menu__icon')
const menuOptions = document.querySelector('.menu__Options');
const lockOptions = document.querySelector('.lockOptions');

//---------------------Desplegar/Ocultar Carro-----------------

const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");
cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
})
const lockCar = document.querySelector('.lockCar');
lockCar.addEventListener("click", () => {
    cart.classList.toggle("show");
})
menuIcon.addEventListener('click', () => {
    menuOptions.classList.toggle('open')
})
lockOptions.addEventListener('click', () => {
    menuOptions.classList.toggle('open')
})
//----------------------Modo Oscuro---------------------------

const dark = document.querySelector('.dark')
const cards = document.querySelectorAll('.products__product')
const body = document.querySelector('body')
dark.addEventListener("click", () => {
    body.classList.toggle('darkMode');
    cart.classList.toggle('darkMode');
    menuOptions.classList.toggle('darkMode')
})
dark.addEventListener("click", () => {
    cards.forEach (e => {
        e.classList.toggle('darkMode');
    })
})
// ------------------Agregar Elemento al carrito-------------------
let addCart = [];

const selectElement = () => {
    const products = document.querySelector(".products")
    products.addEventListener("click", addProduct);
}

const addProduct = (Product) => {
    if(Product.target.classList.contains("product__button")) {
        const selecProd = Product.target.parentElement.parentElement;
        reardProduct(selecProd)
    }
}

const reardProduct = (product) => {
    const cartObje = {
        imgP : product.querySelector('img').src,
        name: product.querySelector('h3').textContent,
        price: product.querySelector('p').textContent,
        id: product.querySelector('.id').textContent,
    }
    addCart.push(cartObje);
    cartPush();
    cartCount();
}
selectElement();
const cartPush = () => {
    cleanCart();
    addCart.forEach( product => {
        const element = document.createElement('div');
        element.setAttribute("class", "cart__buys");
        element.insertAdjacentHTML("beforeend", 
        `<img src=${product.imgP}>
        <p>${product.name}</p>
        <p>${product.price}</p>
        <div Class = 'id'>${product.id}</div>
        <img src = "img/trash-can.svg.svg" class = "trashCart">`)
        cartList.appendChild(element);
    })
    removeProduct();
}

//----------------------Badge--------------------------

const cartCount = () => {
    count.textContent = addCart.length;
}

//-----------------Remover Elementos del Carrito------------------

const removeProduct = () => {
    const deleted = document.querySelectorAll('.trashCart')
    deleted.forEach(boton =>{
        boton.addEventListener("click", () => {
            const element = boton.parentElement;
            const id = element.querySelector('.id').textContent;
            //const id = addCart.indexOf(element);
            addCart = addCart.filter(item => item.id !== id);
            cartPush();
            //addCart.splice(id, 1);
            cartCount();
        })
    })
}
const cleanCart = () => {
    while(cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
}
