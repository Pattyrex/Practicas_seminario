// Menu lateral
var menu_visible = false;
let menu = document.getElementById("nav");

function mostrarOcultarMenu() {
    menu_visible = !menu_visible;
    menu.style.display = menu_visible ? "block" : "none";
}

let links = document.querySelectorAll("nav a");
for (var x = 0; x < links.length; x++) {
    links[x].onclick = function () {
        menu.style.display = "none";
        menu_visible = false;
    }
}

// Función para crear la barra de habilidad
function crearBarra(id_barra, porcentaje) {
    let cantidad = Math.round((porcentaje / 100) * 16); // Calcular la cantidad de bloques a colorear
    id_barra.innerHTML = '<span class="percent">0%</span>'; // Inicializar con 0%
    
    for (let i = 0; i < 16; i++) {
        let div = document.createElement("div");
        div.className = "e";
        id_barra.appendChild(div);
    }
}

// Extraer los porcentajes desde el HTML
let habilidadesConfig = Array.from(document.querySelectorAll(".barra")).map(barra => {
    let porcentaje = parseInt(barra.querySelector(".percent").textContent); // Extraer el porcentaje del span
    return { id: barra.id, porcentaje: porcentaje }; // Devolver el id de la barra y el porcentaje
});

// Aplicar las barras de habilidad dinámicamente
habilidadesConfig.forEach(({ id, porcentaje }) => {
    let barra = document.getElementById(id);
    crearBarra(barra, porcentaje);
});

let entro = false;

function efectoHabilidades() {
    let habilidades = document.getElementById("habilidades");
    let distancia_skills = window.innerHeight - habilidades.getBoundingClientRect().top;

    if (distancia_skills >= 600 && !entro) {
        entro = true;

        habilidadesConfig.forEach(({ id, porcentaje }) => {
            let barra = document.getElementById(id);
            let percentText = barra.querySelector(".percent");
            let contador = 0;
            let cantidad = Math.round((porcentaje / 100) * 16);

            function animar() {
                if (contador < cantidad) {
                    let elementos = barra.getElementsByClassName("e");
                    elementos[contador].style.backgroundColor = "#940253"; 
                    percentText.textContent = `${Math.floor((contador / 16) * 100)}%`; 
                    contador++;
                    requestAnimationFrame(animar); 
                } else if (contador === cantidad) {
                    percentText.textContent = `${porcentaje}%`; 
                }
            }

            animar();
        });
    }
}

// Agregar el evento de desplazamiento para activar la animación
window.addEventListener("scroll", efectoHabilidades);
