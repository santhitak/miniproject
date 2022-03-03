var app = new Vue({
  el: "#app",
  data: {
    task: [
      {
        id: 1,
        title: "wash the clothes",
        status: false,
        duedate: null,
        flag: false,
        mark: "black",
        listId: 1,
        classObject: {},
      },
      {
        id: 2,
        title: "wash the dishes",
        status: false,
        duedate: null,
        flag: false,
        mark: "green",
        listId: 2,
        classObject: {
          "has-background-success-light": true,
          "has-text-primary-dark": true,
        },
      },
      {
        id: 3,
        title: "clean up the room",
        status: false,
        duedate: null,
        flag: false,
        mark: "red",
        listId: 1,
        classObject: {
          "has-background-danger-light": true,
          "has-text-danger-dark": true,
        },
      },
      {
        id: 4,
        title: "change light bulbs",
        status: false,
        duedate: null,
        flag: false,
        mark: "red",
        listId: 2,
        classObject: {
          "has-background-danger-light": true,
          "has-text-danger-dark": true,
        },
      },
      {
        id: 5,
        title: "buy new lamp",
        status: false,
        duedate: null,
        flag: false,
        mark: "green",
        listId: 1,
        classObject: {
          "has-background-success-light": true,
          "has-text-primary-dark": true,
        },
      },
    ],

    listType: [
      {
        id: 1,
        title: "Todo List",
      },
      {
        id: 2,
        title: "Not Todo List",
      },
    ],

    filters: [
      { id: 1, hideDone: false, showFlag: false },
      { id: 2, hideDone: false, showFlag: false },
    ],
    sorts: [
      {
        id: 1,
        type: "alpha",
      },
      {
        id: 2,
        type: "alpha",
      },
    ],

    colors: [
      {
        id: 1,
        class: "mx-1 icon box has-background-dark",
        name: "black",
      },
      {
        id: 2,
        class: "mx-1 icon box has-background-danger",
        name: "red",
      },
      {
        id: 3,
        class: "mx-1 icon box has-background-success",
        name: "green",
      },
    ],

    checkItem: false,
    idCounter: 0,
    notListId: 0,

    taskName: "",
    checkList: "idle",
    duedate: null,
    flagActive: false,
    mark: "black",

    error: {
      taskName: "",
      select: "Please select list",
      showSelect: false,
      listName: "",
    },

    editTaskName: "",
    editTaskId: 0,
    editFlag: false,
    editList: "idle",
    editMark: "",
    editDuedate: null,
    editClassObject: {},

    delTaskId: 0,
    delTaskName: "",

    listName: "",
    listIdCounter: 0,

    editListName: "",
    editListId: 0,

    delListId: 0,
    delListName: "",

    filter: "alpha",
    hideDone: false,
    showFlag: false,

    showModal: false,
    showDelete: false,
    showAddList: false,
    showEditList: false,
    showDeleteList: false,
  },
  created() {
    this.idCounter = this.task.length;
    this.listIdCounter = this.listType.length;
  },
  computed: {
    complete() {
      return this.task.filter((data) => data.status).length;
    },
    incomplete() {
      return this.task.length - this.complete;
    },
    flagged() {
      return this.task.filter((data) => data.flag).length;
    },
    filteredTasks() {
      let filtered = [];

      function compare(a, b) {
        if (!a.status && b.status) {
          return -1;
        } else if (a.status && !b.status) {
          return 1;
        } else {
          return 0;
        }
      }

      function checkflag(a, b) {
        if (!a.flag && b.flag) {
          return 1;
        } else if (a.flag && !b.flag) {
          return -1;
        } else {
          return 0;
        }
      }

      this.task.sort((a, b) => {
        let sortA = a.title.toLowerCase(),
          sortB = b.title.toLowerCase();
        if (sortA < sortB) {
          return -1;
        }
        if (sortA > sortB) {
          return 1;
        }
        return 0;
      });

      function sortDate(a, b) {
        if (a.duedate === null && b.duedate !== null) {
          return 1;
        }
        if (a.duedate !== null && b.duedate === null) {
          return -1;
        }
        if (a.duedate > b.duedate) {
          return 1;
        }
        if (a.duedate < b.duedate) {
          return -1;
        }
        return 0;
      }

      this.listType.forEach((list) => {
        let sepList = this.task.filter((index) => index.listId === list.id);
        this.sorts
          .filter((item) => item.id === list.id)
          .forEach((sortType) => {
            if (sortType.type === "undone") {
              sepList = sepList.sort(compare);
            }
            if (sortType.type === "flag") {
              sepList = sepList.sort(checkflag);
            }
            if (sortType.type === "date") {
              sepList = sepList.sort(sortDate);
            }
          });
        this.filters
          .filter((item) => item.id === list.id)
          .forEach((data) => {
            if (data.showFlag) {
              sepList = sepList.filter((item) => item.flag);
            }
            if (data.hideDone) {
              sepList = sepList.filter((item) => !item.status);
            }
          });
        filtered.push(...sepList);
      });

      return filtered;
    },
  },
  methods: {
    validateTask() {
      if (this.taskName === "") {
        this.error.taskName = "Please fill in the task name";
      }
      if (this.checkList === "idle") {
        this.error.showSelect = true;
        return;
      }
      this.error.taskName = "";
      this.error.showSelect = false;
    },
    configClass() {
      if (this.mark === "green") {
        this.classObject = {
          "has-background-success-light": true,
          "has-text-primary-dark": true,
        };
      } else if (this.mark === "red") {
        this.classObject = {
          "has-background-danger-light": true,
          "has-text-danger-dark": true,
        };
      } else {
        this.classObject = {
          "": true,
        };
      }
    },
    addTodo() {
      this.validateTask();
      if (this.taskName === "" || this.error.showSelect === true) {
        return;
      }
      this.configClass();
      this.idCounter += 1;
      this.task.push({
        id: this.idCounter,
        title: this.taskName,
        status: false,
        flag: this.flagActive,
        mark: this.mark,
        duedate: this.duedate,
        listId: this.checkList,
        classObject: this.classObject,
      });

      this.taskName = "";
      this.flagActive = false;
      this.duedate = null;
      this.checkList = "idle";
      this.mark = "black";
    },

    validateList() {
      if (this.listName === "") {
        this.error.listName = "Please fill in the list name";
        return;
      }
      this.error.listName = "";
    },
    addNewList() {
      this.validateList();
      if (this.error.listName !== "") {
        return;
      }
      this.listIdCounter += 1;
      this.listType.push({
        id: this.listIdCounter,
        title: this.listName,
      });
      this.filters.push({
        id: this.listIdCounter,
        hideDone: false,
        showFlag: false,
      });
      this.sorts.push({
        id: this.listIdCounter,
        type: "alpha",
      });
      this.listName = "";
      this.showAddList = false;
    },

    validEditTask() {
      if (this.editTaskName === "") {
        this.error.taskName = "Please fill in the task name";
        return;
      }
      this.error.taskName = "";
    },
    editTask(item) {
      this.showModal = true;
      this.editTaskId = item.id;
      this.editTaskName = item.title;
      this.editDuedate = item.duedate;
      this.editMark = item.mark;
      this.editList = item.listId;
      this.editFlag = item.flag;
      this.editClassObject = item.classObject;
    },
    editConfig() {
      if (this.editMark === "green") {
        this.editClassObject = {
          "has-background-success-light": true,
          "has-text-primary-dark": true,
        };
      } else if (this.editMark === "red") {
        this.editClassObject = {
          "has-background-danger-light": true,
          "has-text-danger-dark": true,
        };
      } else {
        this.editClassObject = {
          "": true,
        };
      }
    },
    saveEdit() {
      this.validEditTask();
      if (this.error.taskName !== "") {
        return;
      }
      this.editConfig();
      let toDo = this.task.filter((data) => data.id === this.editTaskId)[0];
      toDo.title = this.editTaskName;
      toDo.duedate = this.editDuedate;
      toDo.mark = this.editMark;
      toDo.listId = this.editList;
      toDo.flag = this.editFlag;
      toDo.classObject = this.editClassObject;
      this.showModal = false;
    },

    delItem(item) {
      this.showDelete = true;
      this.delTaskId = item.id;
      this.delTaskName = item.title;
    },
    deleteItem() {
      let checkId = this.task.findIndex((data) => data.id === this.delTaskId);
      this.task.splice(checkId, 1);
      this.showDelete = false;
    },

    validEditList() {
      if (this.editListName === "") {
        this.error.listName = "Please fill in the list name";
        return;
      }
      this.error.listName = "";
    },
    editListModal(item) {
      this.showEditList = true;
      console.log(item.title);
      this.editListName = item.title;
      this.editListId = item.id;
    },
    saveEditList() {
      this.validEditList();
      if (this.error.listName !== "") {
        return;
      }
      let editList = this.listType.filter(
        (data) => data.id === this.editListId
      )[0];
      editList.title = this.editListName;
      this.showEditList = false;
    },

    delList(item) {
      this.showDeleteList = true;
      this.delListId = item.id;
      this.delListName = item.title;
    },
    deleteList() {
      let checkListId = this.listType.findIndex(
        (data) => data.id === this.delListId
      );
      this.listType.splice(checkListId, 1);
      this.showDeleteList = false;
    },
  },
});
