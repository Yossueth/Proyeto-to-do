// Variables de tareas
let inputTask = document.getElementById("inputTask");
let btnTareas = document.querySelector(".btnTareas");
let listaTareas = document.getElementById("listaTareas");
let inputSelect = document.getElementById("inputSelect");

//Función para verificar si una tarea ya existe en el almacenamiento local.
function tareaExiste(nuevaTarea) {
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || []; // Obtiene las tareas del almacenamiento local
  return guardarTareas.find(
    (tarea) =>
      tarea.task === nuevaTarea.task && tarea.priority === nuevaTarea.priority
  );
}

//Carga las tareas desde el almacenamiento local y las muestra en la página.

function cargarTareas() {
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || []; // Obtiene las tareas del almacenamiento local
  listaTareas.innerHTML = ""; // Limpia la lista de tareas

  guardarTareas.forEach(function (tarea, index) {
    let tareaDiv = document.createElement("div"); // Crea un nuevo elemento div para la tarea
    tareaDiv.className = "tarea"; // Asigna la clase "tarea" al div

    // Configura el HTML para mostrar la tarea y los botones de editar y eliminar
    tareaDiv.innerHTML = `
      <p>${tarea.task} - Priority: ${tarea.priority}</p>
      <button class="btnEditar" data-index="${index}">Edit</button>
      <button class="btnEliminar" data-index="${index}">Delete</button>
    `;

    listaTareas.appendChild(tareaDiv); // Agrega el div de tarea al contenedor de tareas
  });

  // Configura los eventos para los botones de editar
  let btnEditar = document.querySelectorAll(".btnEditar");
  btnEditar.forEach((button) => {
    button.addEventListener("click", function () {
      editarTarea(button.dataset.index); // Llama a la función de edición con el índice de la tarea
    });
  });

  // Configura los eventos para los botones de eliminar
  let btnEliminar = document.querySelectorAll(".btnEliminar");
  btnEliminar.forEach((button) => {
    button.addEventListener("click", function () {
      eliminarTarea(button.dataset.index); // Llama a la función de eliminación con el índice de la tarea
    });
  });
}

//Función para editar una tarea existente.

function editarTarea(index) {
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || []; // Obtiene las tareas del almacenamiento local
  let tarea = guardarTareas[index]; // Obtiene la tarea a editar

  let nuevaTarea = prompt("Edit task description:", tarea.task); // Solicita la nueva descripción de la tarea
  let nuevaPrioridad = prompt("Edit task priority:", tarea.priority); // Solicita la nueva prioridad de la tarea

  if (nuevaTarea === null || nuevaPrioridad === null) {
    return; // Si el usuario cancela, no hace nada
  }

  nuevaTarea = nuevaTarea.trim(); // Elimina los espacios en blanco al inicio y al final
  nuevaPrioridad = nuevaPrioridad.trim(); // Elimina los espacios en blanco al inicio y al final

  if (nuevaTarea === "" || nuevaPrioridad === "") {
    alert("Both fields must be filled out."); // Verifica que ambos campos estén llenos
    return;
  }

  // Verifica si la tarea con los nuevos detalles ya existe
  if (tareaExiste({ task: nuevaTarea, priority: nuevaPrioridad })) {
    alert("This task already exists.");
    return;
  }

  // Actualiza la tarea en el array
  guardarTareas[index] = {
    task: nuevaTarea,
    priority: nuevaPrioridad,
  };

  localStorage.setItem("tareas", JSON.stringify(guardarTareas)); // Guarda las tareas actualizadas en el almacenamiento local
  cargarTareas(); // Recarga la lista de tareas
}

// Función para eliminar una tarea existente.
function eliminarTarea(index) {
  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || []; // Obtiene las tareas del almacenamiento local

  guardarTareas.splice(index, 1); // Elimina la tarea del array
  localStorage.setItem("tareas", JSON.stringify(guardarTareas)); // Guarda las tareas actualizadas en el almacenamiento local
  cargarTareas(); // Recarga la lista de tareas
}

// Evento de agregar tarea
btnTareas.addEventListener("click", function (event) {
  event.preventDefault(); // Previene el comportamiento por defecto del botón (como enviar un formulario)

  let tareas = inputTask.value.trim(); // Obtiene la descripción de la tarea y elimina espacios en blanco
  let prioridad = inputSelect.value; // Obtiene la prioridad seleccionada

  if (tareas === "" || prioridad === "") {
    alert("Please complete both fields."); // Verifica que ambos campos estén llenos
    return;
  }

  let objectTask = {
    task: tareas,
    priority: prioridad,
  };

  // Verifica si la tarea ya existe
  if (tareaExiste(objectTask)) {
    alert("This task already exists.");
    return;
  }

  let guardarTareas = JSON.parse(localStorage.getItem("tareas")) || []; // Obtiene las tareas del almacenamiento local
  guardarTareas.push(objectTask); // Agrega la nueva tarea al array
  localStorage.setItem("tareas", JSON.stringify(guardarTareas)); // Guarda las tareas actualizadas en el almacenamiento local

  inputTask.value = ""; // Limpia el campo de entrada de tarea
  cargarTareas(); // Recarga la lista de tareas
});

// Carga las tareas al inicio
cargarTareas();

//------------------------------------------------------------------------------//

// Variables eventos
let inputDate = document.getElementById("inputDate"); // Input para la fecha del evento
let inputEvent = document.getElementById("inputEvent"); // Input para la descripción del evento
let btnEvent = document.getElementById("btnEvent"); // Botón para agregar un nuevo evento
let listaEventos = document.querySelector(".listaEventos"); // Contenedor para mostrar los eventos

//Función para verificar si un evento ya existe en el localStorage.
function eventoExiste(nuevoEvento) {
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || []; // Obtiene la lista de eventos del localStorage
  return guardarEventos.find(
    (evento) =>
      evento.event === nuevoEvento.event && evento.date === nuevoEvento.date
  ); // Busca si existe un evento con la misma descripción y fecha
}

// Carga los eventos desde localStorage y los muestra en la página.
function cargarEventos() {
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || []; // Obtiene la lista de eventos del localStorage
  listaEventos.innerHTML = ""; // Limpia el contenedor de eventos

  // Itera sobre los eventos y los muestra en el contenedor
  guardarEventos.forEach(function (evento, eventoIndex) {
    let event = document.createElement("div"); // Crea un nuevo elemento para el evento
    event.className = "evento"; // Asigna una clase para el estilo
    event.dataset.index = eventoIndex; // Asigna el índice del evento como un atributo de datos

    // Añade el contenido HTML del evento con botones de eliminar y editar
    event.innerHTML = `
      ${evento.event} - Date: ${evento.date}
      <button class="btnDeleteEvent" data-index="${eventoIndex}">Eliminar</button>
      <button class="btnEditEvent" data-index="${eventoIndex}">Edit</button>
    `;

    listaEventos.appendChild(event); // Agrega el evento al contenedor de eventos
  });

  // Añade el evento de clic a los botones de eliminar
  let btnDeleteEvent = document.querySelectorAll(".btnDeleteEvent");
  btnDeleteEvent.forEach((button) => {
    button.addEventListener("click", function () {
      eliminarEvento(button.dataset.index); // Llama a la función de eliminar pasando el índice del evento
    });
  });

  // Añade el evento de clic a los botones de editar
  let btnEditEvent = document.querySelectorAll(".btnEditEvent");
  btnEditEvent.forEach((button) => {
    button.addEventListener("click", function () {
      editarEvento(button.dataset.index); // Llama a la función de editar pasando el índice del evento
    });
  });
}

//Elimina un evento del localStorage
function eliminarEvento(eventoIndex) {
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || []; // Obtiene la lista de eventos del localStorage
  guardarEventos.splice(eventoIndex, 1); // Elimina el evento en el índice especificado
  localStorage.setItem("eventos", JSON.stringify(guardarEventos)); // Actualiza el localStorage con la lista modificada
  cargarEventos(); // Vuelve a cargar los eventos actualizados
}

// Edita un evento existente.
function editarEvento(eventoIndex) {
  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || []; // Obtiene la lista de eventos del localStorage
  let evento = guardarEventos[eventoIndex]; // Obtiene el evento que se va a editar

  // Solicita la nueva descripción y fecha del evento al usuario
  let nuevoEvento = prompt("Edit event description:", evento.event);
  let nuevaFecha = prompt("Edit event date:", evento.date);

  if (nuevoEvento === null || nuevaFecha === null) {
    return; // Si el usuario cancela, no hace nada
  }

  nuevoEvento = nuevoEvento.trim(); // Elimina los espacios en blanco al principio y al final
  nuevaFecha = nuevaFecha.trim(); // Elimina los espacios en blanco al principio y al final

  if (nuevoEvento === "" || nuevaFecha === "") {
    alert("Both fields must be filled out."); // Muestra una alerta si alguno de los campos está vacío
    return;
  }

  // Verifica si el evento con los nuevos detalles ya existe
  if (eventoExiste({ event: nuevoEvento, date: nuevaFecha })) {
    alert("This event already exists."); // Muestra una alerta si el evento ya existe
    return;
  }

  // Actualiza el evento con los nuevos detalles
  guardarEventos[eventoIndex] = {
    event: nuevoEvento,
    date: nuevaFecha,
  };

  localStorage.setItem("eventos", JSON.stringify(guardarEventos)); // Actualiza el localStorage con la lista modificada
  cargarEventos(); // Vuelve a cargar los eventos actualizados
}

// Evento de agregar evento
btnEvent.addEventListener("click", function (event) {
  event.preventDefault(); // Previene el comportamiento por defecto del botón (recargar la página)

  let evento = inputEvent.value.trim(); // Obtiene la descripción del evento
  let date = inputDate.value.trim(); // Obtiene la fecha del evento

  if (evento === "" || date === "") {
    alert("Please complete both fields."); // Muestra una alerta si alguno de los campos está vacío
    return;
  }

  let objectEvent = {
    event: evento,
    date: date,
  };

  // Verifica si el evento ya existe
  if (eventoExiste(objectEvent)) {
    alert("This event already exists."); // Muestra una alerta si el evento ya existe
    return;
  }

  let guardarEventos = JSON.parse(localStorage.getItem("eventos")) || []; // Obtiene la lista de eventos del localStorage
  guardarEventos.push(objectEvent); // Añade el nuevo evento a la lista
  localStorage.setItem("eventos", JSON.stringify(guardarEventos)); // Actualiza el localStorage con la lista modificada

  inputEvent.value = ""; // Limpia el input de descripción del evento
  inputDate.value = ""; // Limpia el input de fecha del evento
  cargarEventos(); // Vuelve a cargar los eventos actualizados
});

// Cargar eventos al inicio
cargarEventos(); // Llama a la función para cargar y mostrar los eventos almacenados al cargar la página
