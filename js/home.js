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
    task.dataset.index = tareaIndex; // Guardar el índice de la tarea en el dataset

    // Crear el HTML para cada tarea
    task.innerHTML = `
      <p>${tarea.task} - Prioridad: ${tarea.priority}</p>
      <button class="btnDelete">Eliminar</button>
    `;

    listaTareas.appendChild(task); // Agregar la tarea al contenedor
  });
}

//funcion eliminar tareas
function eliminarTarea(tareaIndex) {
  // Obtener tareas del localStorage
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  // Eliminar la tarea del array
  guardarTareas.splice(tareaIndex, 1);
  // Actualizar el localStorage
  localStorage.setItem("tareas", JSON.stringify(guardarTareas));
  // Recargar la lista de tareas
  cargarTareas();
}

// Manejar el evento de agregar tarea
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

  inputTask.value = ""; // Limpiar el campo de entrada
  cargarTareas(); // Recargar la lista de tareas
});

// Manejar el evento de eliminar tarea
listaTareas.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnDelete")) {
    // Encontrar el elemento de tarea más cercano al botón clicado
    let taskElement = event.target.closest(".tarea");
    let tareaIndex = taskElement.dataset.index; // Obtener el índice de la tarea
    eliminarTarea(tareaIndex); // Llamar a la función para eliminar la tarea
  }
});

// Cargar tareas al inicio
cargarTareas();

//-----------------------------------//

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

// Manejar el evento de agregar evento
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

  inputEvent.value = ""; // Limpiar el campo de entrada
  inputDate.value = ""; // Limpiar el campo de fecha
  cargarEventos(); // Recargar la lista de eventos
});

// Manejar el evento de eliminar evento
listaEventos.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnDeleteEvent")) {
    // Encontrar el elemento de evento más cercano al botón clicado
    let eventElement = event.target.closest(".evento");
    let eventoIndex = eventElement.dataset.index; // Obtener el índice del evento
    eliminarEvento(eventoIndex); // Llamar a la función para eliminar el evento
  }
});

// Cargar eventos al inicio
cargarEventos();
