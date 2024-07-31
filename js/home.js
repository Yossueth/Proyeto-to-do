// Variables de tareas
let inputTask = document.getElementById("inputTask");
let btnTareas = document.querySelector(".btnTareas");
let listaTareas = document.getElementById("listaTareas");
let inputSelect = document.getElementById("inputSelect");

// Carga las tareas desde localStorage y las muestra en la página.
function cargarTareas() {
  // Obtener tareas del localStorage, si no hay, usar un array vacío
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  listaTareas.innerHTML = ""; // Limpiar la lista de tareas actual

  // Iterar sobre las tareas y crear elementos para cada una
  guardarTareas.forEach(function (tarea, tareaIndex) {
    let task = document.createElement("div");
    task.className = "tarea"; // Asignar clase para estilos
    task.dataset.index = tareaIndex; // Almacenar el índice de la tarea

    // Crear el HTML para cada tarea
    task.innerHTML = `
      <p>${tarea.task} - Prioridad: ${tarea.priority}</p>
      <div class="basurero">🗑️</div>
    `;

    listaTareas.appendChild(task); // Agregar la tarea al contenedor
  });

  // Añadir el evento de click a los botones de papelera
  document.querySelectorAll(".basurero").forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Eliminar la tarea correspondiente
      let tareaIndex = boton.parentElement.dataset.index;
      deleteTask(tareaIndex);
    });
  });
}

// Función para eliminar una tarea
function deleteTask(tareaIndex) {
  // Obtener tareas del localStorage
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Eliminar la tarea en el índice especificado
  guardarTareas.splice(tareaIndex, 1);

  // Guardar el array actualizado en el localStorage
  localStorage.setItem("tareas", JSON.stringify(guardarTareas));

  // Recargar la lista de tareas
  cargarTareas();
}

// Evento de agregar tarea
btnTareas.addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  let tareas = inputTask.value.trim(); // Obtener el valor de la tarea
  let prioridad = inputSelect.value; // Obtener la prioridad seleccionada

  // Validar que ambos campos estén llenos
  if (tareas === "" || prioridad === "") {
    alert("Please complete both fields.");
    return;
  }

  // Crear un objeto para la tarea
  let objectTask = {
    task: tareas,
    priority: prioridad,
  };

  // Obtener tareas del localStorage y agregar la nueva tarea
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  guardarTareas.push(objectTask);
  localStorage.setItem("tareas", JSON.stringify(guardarTareas));

  inputTask.value = ""; // Limpiar el campo del input
  cargarTareas(); // Recargar la lista de tareas
});

// Cargar tareas al inicio
cargarTareas();

//------------------------------------------------------------------------------//

// Variables eventos
let inputDate = document.getElementById("inputDate");
let inputEvent = document.getElementById("inputEvent");
let btnEvent = document.getElementById("btnEvent");
let listaEventos = document.querySelector(".listaEventos");

// Carga los eventos desde localStorage y los muestra en la página.

function cargarEventos() {
  // Obtener eventos del localStorage, si no hay, usar un array vacío
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  listaEventos.innerHTML = ""; // Limpiar la lista de eventos actual

  // Iterar sobre los eventos y crear elementos para cada uno
  guardarEventos.forEach(function (evento, eventoIndex) {
    let event = document.createElement("div");
    event.className = "evento"; // Asignar clase para estilos
    event.dataset.index = eventoIndex; // Guardar el índice del evento en el dataset
    // Crear el HTML para cada evento
    event.innerHTML = `
      ${evento.event} - Date: ${evento.date}
      <button class="btnDeleteEvent">Eliminar</button>
    `;

    listaEventos.appendChild(event); // Agregar el evento al contenedor
  });
}

function eliminarEvento(eventoIndex) {
  // Obtener eventos del localStorage
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  // Eliminar el evento del array
  guardarEventos.splice(eventoIndex, 1);
  // Actualizar el localStorage
  localStorage.setItem("eventos", JSON.stringify(guardarEventos));
  // Recargar la lista de eventos
  cargarEventos();
}

// Evento de agregar evento
btnEvent.addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  let evento = inputEvent.value.trim(); // Obtener el valor del evento
  let date = inputDate.value.trim(); // Obtener la fecha del evento

  // Validar que ambos campos estén llenos
  if (evento === "" || date === "") {
    alert("Please complete both fields.");
    return;
  }

  // Crear un objeto para el evento
  let objectEvent = {
    event: evento,
    date: date,
  };

  // Obtener eventos del localStorage y agregar el nuevo evento
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  guardarEventos.push(objectEvent);
  localStorage.setItem("eventos", JSON.stringify(guardarEventos));

  inputEvent.value = ""; // Limpiar el campo del input
  inputDate.value = ""; // Limpiar el campo de input
  cargarEventos(); // Recargar la lista de eventos
});

// Evento de eliminar evento
listaEventos.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnDeleteEvent")) {
    // Encontrar el elemento de evento más cercano al botón clicado
    let eventElement = event.target.closest(".evento");
    let eventoIndex = eventElement.dataset.index; // Obtener el índice del evento
    eliminarEvento(eventoIndex); // Llama a la función para eliminar el evento
  }
});

// Cargar eventos al inicio
cargarEventos();
