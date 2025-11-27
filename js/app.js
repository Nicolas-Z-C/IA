const API = "https://6926160326e7e41498f95b4b.mockapi.io/tareas";


async function agregartarea(titulo) {
    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        titulo: titulo,
        completada: false
        })
    });

    cargarTareas();
}


// COMPLETAR TAREA
async function completarTarea(id, estadoActual) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        completada: !estadoActual
        })
    });

    cargarTareas();
}


// ELIMINAR TAREA
async function eliminarTarea(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    cargarTareas();
}


// CARGAR LISTA
async function cargarTareas() {
    const res = await fetch(API);
    const tareas = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    tareas.forEach(t => {
        lista.innerHTML += `
        <li class="item ${t.completada ? 'completed' : ''}">
            <span>${t.titulo}</span>

            <div class="actions">
            <button class="complete-btn" onclick="completarTarea('${t.id}', ${t.completada})">✔</button>
            <button class="delete-btn" onclick="eliminarTarea('${t.id}')">Eliminar</button>
            </div>
        </li>
        `;
    });
}


// BOTÓN AGREGAR
    document.getElementById("agregarBtn").addEventListener("click", () => {
    const titulo = document.getElementById("titulo").value;

    if (titulo.trim() === "") return alert("Escribe una tarea");

    agregartarea(titulo);
    document.getElementById("titulo").value = "";
});


// Cargar al iniciar
cargarTareas();
