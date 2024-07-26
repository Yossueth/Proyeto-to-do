//variables tareas
let inputTask = document.getElementById("inputTask");
let btnTareas = document.querySelector(".btnTareas");
let listaTareas = document.getElementById("listaTareas");
let inputSelect = document.getElementById("inputSelect");
//variables eventos
let inputDate = document.getElementById("inputDate");
let inputEvent = document.getElementById("inputEvent");
let btnEvent = document.getElementById("btnEvent");
let listaEventos = document.querySelector(".listaEventos");
//funcion tareas
btnTareas.addEventListener("click", function () {
  let tareas = inputTask.value;
  let prioridad = inputSelect.value;

  let objectData = {
    task: tareas,
    priority: prioridad,
  };

  let guardarTareas = JSON.parse(localStorage.getItem("tarea")) || [];
  guardarTareas.push(objectData);
  localStorage.setItem("tarea", JSON.stringify(guardarTareas));

  listaTareas.innerHTML = "";

  guardarTareas.forEach(function (tarea) {
    let p = document.createElement("p");
    p.className = "tarea";
    p.innerHTML = `${tarea.task} - Prioridad: ${tarea.priority}`;
    listaTareas.appendChild(p);
  });

  inputTask.value = "";
  inputSelect.value = "";
});

//funcion eventos
// btnEvent.addEventListener("click", function () {
//   let eventos = inputEvent.value;
//   let evento = document.createElement("p");
//   evento.innerHTML = eventos;
//   evento.id = "parrafo";
//   listaEventos.appendChild(evento);
//   localStorage.setItem("event", eventos);
// });
// let eventOb = localStorage.getItem("event");
// listaEventos.innerHTML = eventOb;













