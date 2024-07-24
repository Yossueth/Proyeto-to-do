let inputTask = document.getElementById("inputTask");
let btnAgregar = document.querySelector(".btnAgregar");
let lista = document.getElementById("lista");

function cargarTareas() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  lista.innerHTML = "";

  tasks.forEach(function (tarea) {
    let tareaElement = document.createElement("p");
    tareaElement.textContent = tarea;
    tareaElement.classList.add("task-item");
    lista.appendChild(tareaElement);
  });
}

cargarTareas();

btnAgregar.addEventListener("click", function () {
  let tareaNueva = inputTask.value.trim();

  if (tareaNueva !== "") {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(tareaNueva);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    let nuevaTareaElement = document.createElement("p");
    nuevaTareaElement.textContent = tareaNueva;
    nuevaTareaElement.classList.add("task-item");
    lista.appendChild(nuevaTareaElement);

    inputTask.value = "";
  } else {
    alert("Por favor, ingresa una tarea válida.");
  }
});

// btn.addEventListener("click",function () {
//     //agregar tareas
//     let tareas = inputTareas.value;
//     let tarea = document.createElement("p");
//     tarea.innerHTML = tareas;
//     tarea.id = "parrafo";
//     taskcontainer.appendChild(tarea);

//     //editar tarea

//     let btnEdit = document.createElement("button");
//     btnEdit.id = "btnEdit";
//     btnEdit.innerHTML = "editar";
//     taskcontainer.appendChild(btnEdit);
//     btnEdit.addEventListener("click", function () {
//       textoEdit = prompt("Intruduzca el nuevo texto");
//       tarea.innerHTML = textoEdit;
//     });

//     //guardar los datos
//     localStorage.setItem("task", tarea);

//     //eliminar tareas
//     let eliminar = document.createElement("button");
//     eliminar.id = "eliminar";
//     eliminar.innerHTML = "elimainar";
//     taskcontainer.appendChild(eliminar);
//     eliminar.addEventListener("click", function () {
//       tarea.remove(this);
//       eliminar.remove(this);
//       btnEdit.remove(this);
//     });
//   });

//   let taskOb = localStorage.getItem("task");

//   tarea.innerHTML = taskOb;
