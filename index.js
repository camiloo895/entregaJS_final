document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Redmi Note 9 XIAOMI 4GB/128GB',
            precio: 699000,
            imagen: 'https://i0.wp.com/conectamos.shop/wp-content/uploads/2020/12/xiaomi_redmi_note_9_02_black_onyx_ad_l.jpg?resize=510%2C510&ssl=1'
        },
        {
            id: 2,
            nombre: 'Celular XIAOMI Redmi Note 11S 6GB+128GB Gris',
            precio: 1599000,
            imagen: 'https://www.alkosto.com/medias/6934177769320-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wxMjY1MjF8aW1hZ2UvanBlZ3xpbWFnZXMvaDcyL2g0Yi8xMjQxNjAwOTkyODczNC5qcGd8YjJlZGExZmQ0M2ViMDkzNDk3MDNiMThlN2FhZDVhODY2MzA3ODFmYTNlMzVlNzBmZGFkZDU0MzI3NmM5YzJhNw'
        },
        {
            id: 3,
            nombre: 'Auriculares Inalambricos Redmi Buds 3 Lite',
            precio: 51900,
            imagen: 'https://xiaomicolombia.vtexassets.com/arquivos/ids/156946-800-auto?v=637885833571600000&width=800&height=auto&aspect=trues'
        },
        {
            id: 4,
            nombre: 'Xiaomi Watch S1 Active',
            precio: 749900,
            imagen: 'https://exitocol.vtexassets.com/arquivos/ids/15951262-1600-auto?v=638069192281270000&width=1600&height=auto&aspect=true'
        },
        {
            id: 5,
            nombre: 'Xiaomi Redmi Watch 2 Lite',
            precio: 369000,
            imagen: 'https://www.celuclock.com.co/wp-content/uploads/2021/07/Mi-Watch-Lite.png'
        },
        {
            id: 6,
            nombre: 'Xiaomi Smart Band 7',
            precio: 229900,
            imagen: 'https://xiaomicolombia.vtexassets.com/arquivos/ids/156966-800-auto?v=637922972264230000&width=800&height=auto&aspect=true'
        },
        {
            id: 7,
            nombre: 'Auriculares inalámbricos Redmi Buds 4 PRO',
            precio: 469900,
            imagen: 'https://xiaomicolombia.vtexassets.com/arquivos/ids/157074-800-auto?v=638064694954830000&width=800&height=auto&aspect=true'
        },
        {
            id: 8,
            nombre: 'Xiaomi Smart Speaker (IR Control)',
            precio: 239900,
            imagen: 'https://xiaomicolombia.vtexassets.com/arquivos/ids/156977-800-auto?v=637965313209130000&width=800&height=auto&aspect=true'
        },
        {
            id: 9,
            nombre: 'Xiaomi 11 Lite 5G NE + Mi City Backpack',
            precio: 1999900,
            imagen: 'https://xiaomicolombia.vtexassets.com/arquivos/ids/156988-800-auto?v=637975736954470000&width=800&height=auto&aspect=true'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Declaro la etiqueta principal desde el div
            const etiqueta = document.createElement('div');
            etiqueta.classList.add('card', 'col-sm-4');
            // Body
            const etiquetaCardBody = document.createElement('div');
            etiquetaCardBody.classList.add('card-body');
            // Titulo
            const etiquetaTitle = document.createElement('h5');
            etiquetaTitle.classList.add('card-title');
            etiquetaTitle.textContent = info.nombre;
            // Imagen
            const etiquetaImagen = document.createElement('img');
            etiquetaImagen.classList.add('img-fluid');
            etiquetaImagen.setAttribute('src', info.imagen);
            // Precio
            const etiquetaPrecio = document.createElement('p');
            etiquetaPrecio.classList.add('card-text');
            etiquetaPrecio.textContent = `${divisa}${info.precio}`;
            // Boton 
            const etiquetaBoton = document.createElement('button');
            etiquetaBoton.classList.add('btn', 'btn-primary');
            etiquetaBoton.textContent = '+';
            etiquetaBoton.setAttribute('marcador', info.id);
            etiquetaBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            etiquetaCardBody.appendChild(etiquetaImagen);
            etiquetaCardBody.appendChild(etiquetaTitle);
            etiquetaCardBody.appendChild(etiquetaPrecio);
            etiquetaCardBody.appendChild(etiquetaBoton);
            etiqueta.appendChild(etiquetaCardBody);
            DOMitems.appendChild(etiqueta);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const etiqueta = document.createElement('li');
            etiqueta.classList.add('list-group-item', 'text-right', 'mx-2');
            etiqueta.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            etiqueta.appendChild(miBoton);
            DOMcarrito.appendChild(etiqueta);
        });
        //agregara conteo de items en el carrito
        if(carritoSinDuplicados.length > 0){
           document.getElementById("contador").innerHTML = "("+carritoSinDuplicados.length+")" ;
        }else{
          document.getElementById("contador").innerHTML = null
        }
       // Renderizamos el precio total en el HTML
       DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderizarProductos();
    renderizarCarrito();
  });