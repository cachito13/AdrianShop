const pintarCarrito = () => {
  //carrito de compras
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modaleHeader = document.createElement("div");
  modaleHeader.className = "modal-header";
  modaleHeader.innerHTML = `
    <h1 class = "modale-header-title">Carrito de Compras</h1>
    `;
  //*********************header carrito****************//

  modalContainer.append(modaleHeader);
  const modalbutton = document.createElement("h1");
  modalbutton.className = "modal-header-button";
  modalbutton.innerText = "X";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modaleHeader.append(modalbutton);

  //*********************contenido carrito****************//

  carrito.forEach((product) => {
    //agrego cada card
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
            <img src="${product.imagen}">
            <h3>${product.titulo}</h3>
            <p>${product.precio}$</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Subtotal: ${product.precio * product.cantidad}</p>
            <span class="producto-eliminar"> ❌ </span>
        `;

    modalContainer.append(carritoContent);

    /*botones cantidad*/
    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      guardarLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;

      guardarLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".producto-eliminar");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  //*********************footer carrito****************//

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalcompra = document.createElement("div");

  totalcompra.classList.add = "total-content";

  totalcompra.innerHTML = `TOTAL A PAGAR: $${total}`;
  
  //****************boton pagar*******************//

  const btnPagar = document.createElement("button");
  btnPagar.innerText = "Pagar";
  btnPagar.classList = "btn-pagar";

  totalcompra.append(btnPagar);
  modalContainer.append(totalcompra);

  btnPagar.addEventListener("click", function () {
    Swal.fire({
      title: 'Gracias por su compra!',
      text: '',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        // aquí cierra el carrito
        document.getElementById("modal-container").innerHTML = "";
        carrito = [];
       
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCantidadCarrito();
      }
    });
  });
};

verCarrito.addEventListener("click", pintarCarrito);

//Eliminar cada producto
const eliminarProducto = (id) => {
  //se enciera nuna neva variable los id de cada producto
  const encontrarid = carrito.find((element) => element.id === id);

  //Se retornan todos menos los que tienen el id del producto
  carrito = carrito.filter((carritoid) => {
    return carritoid !== encontrarid;
  });

  pintarCarrito();
  contadorcarrito();
  guardarLocal();
};

const contadorcarrito = () => {
  cantidadCarrito.style.display = "block";
  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

contadorcarrito();
