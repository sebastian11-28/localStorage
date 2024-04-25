const productos = [
  {
    nombre: "Aceite",
    precio: 50000,
    presentacion: "Tarro",
  },
  {
    nombre: "Luz delantera",
    precio: 120000,
    presentacion: "Caja",
  },
  {
    nombre: "Guardabarro",
    precio: 70000,
    presentacion: "Caja",
  },
];
//guardar datos en localstorage
function updateProducts(productos, isFilter) {
  if (isFilter) {
    localStorage.removeItem("productosfiltrados");
    localStorage.setItem("productosfiltrados", JSON.stringify(productos));
    writeTable(true);
  } else {
    localStorage.removeItem("productos");
    localStorage.setItem("productos", JSON.stringify(productos));
    writeTable();
  }
}
updateProducts(productos, false);

writeTable();

//declaracion de variables

const btnGuardar = document.querySelector(".btn-guardar");

//agregar evento al boton
btnGuardar.addEventListener("click", function () {
  // alert(nombrePro.value);
  guardaProducto();
});

function writeTable(isFiltered) {
    
  let productosGuadados 
  if(isFiltered){
    productosGuadados = JSON.parse(localStorage.getItem("productosfiltrados"));
  }else{
    productosGuadados = JSON.parse(localStorage.getItem("productos"));
  }
  let props = [];
  if (productosGuadados != null) {
    props = productosGuadados;
  }
  let bodyTabla = document.querySelector("#bodyTabla");
  props.forEach((d, i) => {
    const cuerpoTabla = document.getElementById("bodyTabla");
    cuerpoTabla.innerHTML = "";
    productosGuadados.forEach((producto, index) => {
      const fila = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${producto.nombre}</td>
                <td>${producto.presentacion}</td>
                <td>$${producto.precio}</td>
                <td><img src="${producto.imagenUrl}" alt="Imagen de ${
        producto.nombre
      }" style="width: 50px; height: auto;"></td>
              <td><button class="btn btn-primary btn-sm" onClick="editProduct(${index})">Editar</button></td>
              <td><button class="btn btn-danger btn-sm" onClick="deleteProduct(${index})">Eliminar</button></td>
            </tr>
        `;
      cuerpoTabla.innerHTML += fila;
    });
  });
}

//funcion para obtener los productos del formulario
function guardaProducto() {
  let nombrePro = document.querySelector(".nombre-producto");
  let presentacionPro = document.querySelector(".presentacion-producto");
  let precioPro = document.querySelector(".precio-producto");
  let imagenPro = document.querySelector(".imagen-producto");

  if (
    nombrePro.value == "" ||
    presentacionPro.value == "" ||
    precioPro.value == "" ||
    imagenPro.value == ""
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }

  let producto = {
    nombre: nombrePro.value,
    presentacion: presentacionPro.value,
    precio: precioPro.value,
    imagen: imagenPro.value,
  };

  let productosGuardados = JSON.parse(localStorage.getItem("productos"));
  const editingIndex = document.querySelector(".btn-guardar").dataset.editingIndex;

  if (editingIndex !== undefined) {
    // Modo de edición: actualizar el producto existente
    productosGuardados[editingIndex] = producto;
    alert("Producto actualizado correctamente");
  } else {
    // Modo de agregar: añadir nuevo producto
    productosGuardados.push(producto);
    alert("Producto guardado correctamente");
  }

  updateProducts(productosGuardados, false);
  cleanFields();
  delete document.querySelector(".btn-guardar").dataset.editingIndex; // Limpiar el índice de edición
}

function deleteProduct(index) {
  let productosGuardados = JSON.parse(localStorage.getItem("productos"));
  productosGuardados.splice(index, 1);
  updateProducts(productosGuardados, false);
  alert("producto eliminado correctamente");
}
function cleanFields() {
  let nombrePro = document.querySelector(".nombre-producto");
  let presentacionPro = document.querySelector(".presentacion-producto");
  let precioPro = document.querySelector(".precio-producto");
  let imagenPro = document.querySelector(".imagen-producto");
  nombrePro.value = "";
  presentacionPro.value = "";
  precioPro.value = "";
  imagenPro.value = "";
}
function findProduc(name) {
    if(name.target.value == ''){
        let productosGuardados = JSON.parse(localStorage.getItem("productos"))
        updateProducts(productosGuardados, false)
        return;
    }
  let productosGuardados = JSON.parse(localStorage.getItem("productos")).filter(
    (producto) => producto.nombre.includes(name.target.value)
  );
  updateProducts(productosGuardados, true);

  
}
function editProduct(index) {
  const productosGuardados = JSON.parse(localStorage.getItem("productos"));
  const producto = productosGuardados[index];

  // Llenar los campos del formulario
  let nombrePro = document.querySelector(".nombre-producto");
  let presentacionPro = document.querySelector(".presentacion-producto");
  let precioPro = document.querySelector(".precio-producto");
  let imagenPro = document.querySelector(".imagen-producto");

  nombrePro.value = producto.nombre;
  presentacionPro.value = producto.presentacion;
  precioPro.value = producto.precio;
  imagenPro.value = producto.imagen;

  // Guardar el índice actual en un lugar accesible
  document.querySelector(".btn-guardar").dataset.editingIndex = index;
}

