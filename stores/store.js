import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    name: 'Selimhan',
    loggedUser: {},
    logInVar: false,
    tasksOfUser: [],
    editList: [],
    selectedTask: null,
  }),
  getters: {

  },
  actions: {
    setLoggedUser(user) {
      this.logInVar = true;
      this.loggedUser = user;
    },
    openEditPanel(taskNumber) {
      for(let i = 0; i < this.tasksOfUser.length; i++) {
        this.editList[i] = false;
      }
      // this.editList.forEach((ee) => {
      //   ee = false;
      // })
      this.editList[taskNumber] = true;
    }
  },
})
