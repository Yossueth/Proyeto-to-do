// Variables de tareas
let inputTask = document.getElementById("inputTask");
let btnTareas = document.querySelector(".btnTareas");
let listaTareas = document.getElementById("listaTareas");
let inputSelect = document.getElementById("inputSelect");

// Carga las tareas desde localStorage y las muestra en la página.
function cargarTareas() {
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  listaTareas.innerHTML = "";

  guardarTareas.forEach(function (tarea, index) {
    let btntask = document.createElement("div");
    btntask.className = "tarea"; 

    btntask.innerHTML = `
      <p>${tarea.task} - Priority: ${tarea.priority}</p>
      <button class="btnEliminar" data-index="${index}">Delete</button>
    `;

    listaTareas.appendChild(btntask);
  });

  let btnEliminar = document.querySelectorAll(".btnEliminar");
  btnEliminar.forEach((button) => {
    button.addEventListener("click", function () {
      eliminarTarea(button.dataset.index);
    });
  });
}

// Función para eliminar una tarea
function eliminarTarea(index) {
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  guardarTareas.splice(index, 1);
  localStorage.setItem("tareas", JSON.stringify(guardarTareas));
  cargarTareas();
}

// Evento de agregar tarea
btnTareas.addEventListener("click", function (event) {
  event.preventDefault(); 

  let tareas = inputTask.value.trim();
  let prioridad = inputSelect.value; 

  if (tareas === "" || prioridad === "") {
    alert("Please complete both fields.");
    return;
  }

  let objectTask = {
    task: tareas,
    priority: prioridad,
  };

  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  guardarTareas.push(objectTask);
  localStorage.setItem("tareas", JSON.stringify(guardarTareas));

  inputTask.value = ""; 
  cargarTareas(); 
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
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  listaEventos.innerHTML = ""; 

  guardarEventos.forEach(function (evento, eventoIndex) {
    let event = document.createElement("div");
    event.className = "evento"; 
    event.dataset.index = eventoIndex; 

    event.innerHTML = `
      ${evento.event} - Date: ${evento.date}
      <button class="btnDeleteEvent" data-index="${eventoIndex}">Eliminar</button>
    `;

    listaEventos.appendChild(event); 
  });

  // Agregar evento de eliminación a los botones de eliminar
  let btnDeleteEvent = document.querySelectorAll(".btnDeleteEvent");
  btnDeleteEvent.forEach((button) => {
    button.addEventListener("click", function () {
      eliminarEvento(button.dataset.index);
    });
  });
}

function eliminarEvento(eventoIndex) {
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  guardarEventos.splice(eventoIndex, 1);
  localStorage.setItem("eventos", JSON.stringify(guardarEventos));
  cargarEventos();
}

// Evento de agregar evento
btnEvent.addEventListener("click", function (event) {
  event.preventDefault(); 

  let evento = inputEvent.value.trim(); 
  let date = inputDate.value.trim(); 

  if (evento === "" || date === "") {
    alert("Please complete both fields.");
    return;
  }

  let objectEvent = {
    event: evento,
    date: date,
  };

  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  guardarEventos.push(objectEvent);
  localStorage.setItem("eventos", JSON.stringify(guardarEventos));

  inputEvent.value = ""; 
  inputDate.value = ""; 
  cargarEventos(); 
});

// Cargar eventos al inicio
cargarEventos();
