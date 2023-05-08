<template>
  <div id="tasksMainContainer" class="position-static">
    <div>
        <h4 class="selectedTask" v-if="store.selectedTask">Selected task: {{ store.selectedTask.name }}</h4>
        <h4 class="mt-5" v-else>Select a task to work on</h4>
      </div>
    <h3 v-if="store.logInVar">{{ store.loggedUser.displayName }}' tasks</h3>

    <div class="fade-in">
      <div v-if="store.tasksOfUser">
        <div v-for="task in store.tasksOfUser" :key="task" class="my-1">
          <div :id="task.name" ref="taskContainerRef" @click="taskSelected(task)" class="taskcontainer bg-secondary rounded">
            <div class="d-flex justify-content-between py-1 position-relative">
              <div class="progress position-absolute w-100 h-100" style="background: transparent; top: 0;" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar" :style="getProgressStyle(task)"></div>
                </div>
              <span id="taskNameElement" class="d-inline-block" style="margin: 4px;">
                <button title="editTaskName" id="editTaskName" class="editButton" @click="taskNameInputToggle(task.name)" style="display: none;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
                <div class="d-inline-block">
                  <div class="taskName ms-0 p-0 d-inline" style=" opacity: 1 !important; color: black;"> {{ task.name }}</div>
                </div>
                <input id="taskNameInput" class="form-control position-absolute" :placeholder="task.name" style="width: 25%; height: 30px; border-radius: 5px; top: 13%; left: 9%;visibility: hidden;" type="text" v-model="inputValues[task.name]">  
                
              
              </span>
              <span id="pomodoroCount" class="mt-1">{{ task.successfulPomodoros }} / {{ task.estimatedPomodoros }}</span>
              <button title="Edit Task" @click="editTask(task.name)" class="editButton" style="height: 32px;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
            </div>
            <div id="editSelectedTask" class="p-3" style="display: none;">
              <div class="row mb-3" >
                <div class="input-group" style="width: 40%">
                  <input type="number" class="form-control w-25 d-inline-block" :placeholder="task.estimatedPomodoros" v-model="inputEstPommodoros">
                  <span class="input-group-text" id="basic-addon2" style="font-size: 12px;">est Pom</span>
                </div>

                <button @click="saveChanges(task)" class="btn btn-danger col-3 position-relative ms-2" style="font-size: 12px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3 me-1 p-0 position-absolute" style="left: 5%; top:32%;" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg><p class="m-0 ">Delete</p></button>
                <button @click="saveChanges(task)" class="btn btn-success col-3 position-relative ms-4" style="font-size: 12px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-save me-1 p-0 position-absolute" style="left: 5%; top:32%;" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                  </svg><p class="m-0 ">Save</p></button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <button id="addTaskBtn" class="btn btn-success">
        Add Task
      </button>
      <!-- <button @click="addTask" class="btn btn-primary px-4 py-2 mt-3"> <h6 class="m-0"> Add Task </h6></button> -->

    </div>

  </div>
  

  

</template>

<script setup lang="ts">
// import { db } from "firebase";
import { useMainStore } from "~/stores/store";
import { updateTasks } from "~/firebase/config";


const store = useMainStore();


function taskSelected (task){
  store.selectedTask = task;
}

let inputValues = {};
let inputEstPommodoros = 0;
let editToggle = 0;

function getProgressStyle(task) {
  
  let widthPercentage = (task.successfulPomodoros/task.estimatedPomodoros)*100;
  let color = "lawngreeen";
  if(widthPercentage >= 100){
    color = "#2cb67d"
  }

  return `width: ${widthPercentage}%; background-color: ${color}; opacity: 0.2;`
  
}

async function saveChanges(task: string){
  editToggle = 1;
  taskNameInputToggle(task.name);
  if(inputValues[task.name] && inputEstPommodoros !== 0){
    store.tasksOfUser[store.tasksOfUser.indexOf(task)].name = inputValues[task.name];
    store.tasksOfUser[store.tasksOfUser.indexOf(task)].estimatedPomodoros = inputEstPommodoros;
    await updateTasks(store.loggedUser.uid, store.tasksOfUser);
  } 
  else if(inputEstPommodoros !== 0) {
    store.tasksOfUser[store.tasksOfUser.indexOf(task)].estimatedPomodoros = inputEstPommodoros;
    await updateTasks(store.loggedUser.uid, store.tasksOfUser);
  }
  else if(inputValues[task.name] ) {
    store.tasksOfUser[store.tasksOfUser.indexOf(task)].name = inputValues[task.name];

    await updateTasks(store.loggedUser.uid, store.tasksOfUser);
  }
  editToggle = 0;
  //await updateTasks(store.loggedUser.uid, store.tasksOfUser);
}

function editTask(taskID: String){  
  const container = document.getElementById(taskID);
  const editSelectedTask: HTMLElement | null = container.querySelector('#editSelectedTask');
  const editTaskName: HTMLElement | null = container.querySelector('#editTaskName');
  if(container){
    console.log("editing...");
    if(container.style.height === "120px") {
      //already editing

      if(editSelectedTask && editTaskName){
        editSelectedTask.style.display = "none";
        editTaskName.style.display = "none"
      }
      container.style.cursor = "pointer";
      container.style.height = 'auto';
    } 
    else {
      if(editSelectedTask && editTaskName){
        editSelectedTask.style.display = "block"
        editTaskName.style.display = "inline"
      }
      container.style.cursor = "auto";
      container.style.height = '120px';
    }
    }
  }


function taskNameInputToggle(taskName: String){
  const taskElement: HTMLElement | null = document.getElementById(`${taskName}`);
  if (taskElement) {
    const taskNameElement = taskElement.querySelector(".taskName")
    const taskNameElementSpan: HTMLElement  | null = taskElement.querySelector("#taskNameElement");
    if(taskNameElement){
      const taskNameInput: HTMLElement | null = taskElement.querySelector('#taskNameInput');
      if(taskNameElementSpan && editToggle === 1){
        if(taskNameInput) {
          taskNameInput.style.visibility = "hidden";
          editToggle = 0;
        }
      }
      else if(editToggle === 0){
        if(taskNameInput) {
          taskNameInput.style.visibility = "visible";
          editToggle = 1;
        }
      }
    }
  }
}


</script>
<style>
.fade-in {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
}
.taskcontainer{
  cursor: pointer;
  display: inline-block;
  width: 100%;
}
#pomodoroCount{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.editButton{
  background-color: transparent;
  border: none;
  z-index: 3;
  margin: 0;
  padding-top: 0;
  padding-bottom: 3px;
}
/* .selectedTask{
  transition: all 2s;
} */

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
#tasksMainContainer{
  opacity: 1 !important;
}


</style>