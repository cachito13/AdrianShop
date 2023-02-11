const contenedorProductos = document.getElementById("contenedorpro");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadcarrito");
//carrito vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const getProducts = async () => {
  const response = await fetch("producto.json");
  const datas = await response.json();
console.log(datas);


    datas.forEach((product) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img class = "producto-imagen" src="${product.imagen}">
    <h3 class = "producto-titulo">${product.titulo}</h3>
    <p class="producto-precio">$${product.precio}</p>
    `;

    contenedorProductos.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      //duelve true o false
      const repeat = carrito.some((repPoduct) => repPoduct.id === product.id);

      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          imagen: product.imagen,
          titulo: product.titulo,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        contadorcarrito();
        guardarLocal();
      }
    });
  });
};

getProducts();
/*local storage*/

function guardarLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

JSON.parse(localStorage.getItem("carrito"));
