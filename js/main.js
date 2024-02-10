//Variables
let carrito = [];
let productosDisponibles = [];
let filtrarObjeto = document.getElementById("filtrarObjeto");
let comprarProducto = (idProducto) => {
  let productoEncontrado = productosDisponibles.find(
    (producto) => producto.id === idProducto
  );
  carrito.push(productoEncontrado);
  mostrarCarrito();

  //Animación de agregado al carrito
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `Se agregó ${productoEncontrado.nombre}`,
    showConfirmButton: false,
    timer: 1500,
  });
};

//Cargar .json
fetch("../json/data.json")
  .then((response) => response.json())
  .then((productos) => {
    productosDisponibles = productos;
    generarCarta(productosDisponibles);
  });

//Función generar cartas
function generarCarta(productos) {
  contenedorPrincipal.innerHTML = "";
  productos.forEach((producto) => {
    let carta = document.createElement("div");
    carta.classList.add("producto");
    carta.innerHTML = `
        <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}"></img>
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <button id="botonAgregar${producto.id}">Agregar al Carrito</button>    
        `;
    contenedorPrincipal.append(carta);

    //Evento Click
    let botonComprar = document.getElementById(`botonAgregar${producto.id}`);
    botonComprar.addEventListener("click", () => {
      comprarProducto(producto.id);
    });
  });
}

//////////////////////////////////////////////////// FILTROS ////////////////////////////////////////////////////////////////////////////////////

//Filtrar por input
filtrarObjeto.addEventListener("keyup", (event) => {
  let filtrarProductos = productosDisponibles.filter((producto) =>
    producto.nombre.toLowerCase().includes(event.target.value.toLowerCase())
  );

  if (event.target.value !== "") {
    generarCarta(filtrarProductos);
  } else {
    generarCarta(productosDisponibles);
  }
});

//Filtrar por precio
filtrarPorPrecio.addEventListener("click", (event) => {
  let ordenarPrecio = event.target.innerHTML;
  let productoOrdenado;

  if (ordenarPrecio === "De mayor a menor") {
    productoOrdenado = productosDisponibles.sort((a, b) => b.precio - a.precio);
    generarCarta(productoOrdenado);
  } else if (ordenarPrecio === "De menor a mayor") {
    productoOrdenado = productosDisponibles.sort((a, b) => a.precio - b.precio);
    generarCarta(productoOrdenado);
  }
});

//////////////////////////////////////////////////// CARRITO ////////////////////////////////////////////////////////////////////////////////////

const mostrarCarrito = () => {
  compra.innerHTML = "";
  carrito.forEach(itemCarrito => {
      let cartaCarrito = document.createElement("div");
      cartaCarrito.classList.add("posicionCarrito");
      cartaCarrito.innerHTML = `
      <img src="${itemCarrito.imagen}" alt="Imagen de ${itemCarrito.nombre}"></img>
      <h3>${itemCarrito.nombre}</h3>
      <p>$${itemCarrito.precio}</p>
      `;
      compra.append(cartaCarrito);
  })

  let total = calcularTotal();
      compra.innerHTML += `
      <div class="total">
        <h3>Total: </h3>
        <p>$${total}</p>
      </div>
      <div class="botonCarrito">
        <button id="comprarCarrito">Realizar Compra</button>
        <button id="vaciarCarrito">Vaciar Carrito</button>
      </div>
      `;

      let comprarCarrito = document.getElementById("comprarCarrito");
      let vaciarCarrito = document.getElementById("vaciarCarrito");
      
      comprarCarrito.addEventListener ("click", () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Felicidades, has comprado con éxito`,
          showConfirmButton: false,
          timer: 1500,
        });
        compra.innerHTML = "";
        carrito.length = 0;
      });

      vaciarCarrito.addEventListener ("click", () => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Tu carrito se ha eliminado`,
          showConfirmButton: false,
          timer: 1500,
        });
        compra.innerHTML = "";
        carrito.length = 0;
      });
}

const calcularTotal = () => {
  let total = 0;
  carrito.forEach(item => {
    total += item.precio;
  });
  return total;
};
