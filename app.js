var app = new Vue({
  el: "#app",
  data: {
    task: [
      {
        id: 1,
        title: "fix leaking faucet",
        status: false,
        duedate: null,
        flag: true,
        mark: "black",
        listId: 1,
      },
      {
        id: 2,
        title: "wash the dishes",
        status: false,
        duedate: "2022-05-06",
        flag: false,
        mark: "green",
        listId: 2,
      },
      {
        id: 3,
        title: "clean up the room",
        status: false,
        duedate: null,
        flag: false,
        mark: "red",
        listId: 1,
      },
      {
        id: 4,
        title: "change light bulbs",
        status: false,
        duedate: "2022-07-06",
        flag: false,
        mark: "red",
        listId: 1,
      },
      {
        id: 5,
        title: "practice writing",
        status: false,
        duedate: "2022-05-25",
        flag: false,
        mark: "red",
        listId: 2,
      },
      {
        id: 6,
        title: "boxing",
        status: false,
        duedate: null,
        flag: true,
        mark: "red",
        listId: 2,
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

    checkItem: false,
    idCounter: 0,
    notListId: 0,

    taskName: "",
    checkList: "idle",
    duedate: null,
    flagActive: false,

    error: {
      taskName: "",
      select: "",
      mark: "",
    },

    editTaskName: "",
    editTaskId: 0,
    editFlag: false,
    editList: "idle",
    editMark: "",
    editDuedate: 0,

    delTaskId: 0,

    listName: "",
    listIdCounter: 0,

    editListName: "",
    editListId: 0,

    delListId: 0,

    filter: "",
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
    this.task.mark = "black";
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

      function sortAlpha(a, b) {
        let sortA = a.title.toLowerCase(),
          sortB = b.title.toLowerCase();
        if (sortA < sortB) {
          return -1;
        }
        if (sortA > sortB) {
          return 1;
        }
        return 0;
      }

      function sortDate(a, b) {
        return new Date(a.duedate) - new Date(b.duedate);
      }

      if (this.filter == "undone") {
        this.task.sort(compare);
      } else if (this.filter == "alpha") {
        this.task.sort(sortAlpha);
      } else if (this.filter == "flag") {
        this.task.sort(checkflag);
      } else if (this.filter == "date") {
        this.task.sort(sortDate);
      }

      if (this.showFlag) {
        return this.task.filter((data) => data.flag);
      } else if (this.hideDone) {
        return this.task.filter((data) => !data.status);
      } else {
        return this.task;
      }
    },
  },
  methods: {
    validateTask() {
      if (this.taskName == "") {
        this.error.taskName = "Please fill in the task name";
        return;
      }
      this.error.taskName = "";
    },
    validateList() {
      if (this.checkList == "idle") {
        this.error.select = "Please select list";
        return;
      }
      this.error.select = "";
    },
    addTodo() {
      this.validateTask();
      this.validateList();
      if (this.error.taskName !== "") {
        return;
      }

      this.idCounter += 1;
      this.task.push({
        id: this.idCounter,
        title: this.taskName,
        status: false,
        flag: this.flagActive,
        duedate: this.duedate,
        listId: this.checkList,
      });

      this.taskName = "";
      this.flagActive = false;
      this.duedate = null;
      this.checkList = "idle";
    },

    addNewList() {
      this.listIdCounter += 1;
      this.listType.push({
        id: this.listIdCounter,
        title: this.listName,
      });
      console.log(this.listIdCounter);
      this.listName = "";
      this.showAddList = false;
    },

    editTask(item) {
      this.showModal = true;
      this.editTaskId = item.id;
      this.editTaskName = item.title;
      this.editDuedate = item.duedate;
      this.editMark = item.mark;
      this.editList = item.listId;
      this.editFlag = item.flag;
    },
    saveEdit() {
      let toDo = this.task.filter((data) => data.id === this.editTaskId)[0];
      toDo.title = this.editTaskName;
      toDo.duedate = this.editDuedate;
      toDo.mark = this.editMark;
      toDo.listId = this.editList;
      toDo.flag = this.editFlag;
      this.showModal = false;
    },

    delItem(item) {
      this.showDelete = true;
      this.delTaskId = item.id;
    },
    deleteItem() {
      let checkId = this.task.findIndex((data) => data.id == this.delTaskId);
      this.task.splice(checkId, 1);
      this.showDelete = false;
    },

    editListModal(item) {
      this.showEditList = true;
      console.log(item.title);
      this.editListName = item.title;
      this.editListId = item.id;
    },
    saveEditList() {
      let editList = this.listType.filter(
        (data) => data.id === this.editListId
      )[0];
      editList.title = this.editListName;
      this.showEditList = false;
    },

    delList(item) {
      this.showDeleteList = true;
      this.delListId = item.id;
    },
    deleteList() {
      let checkListId = this.listType.findIndex(
        (data) => data.id == this.delListId
      );
      this.listType.splice(checkListId, 1);
      this.showDeleteList = false;
    },
  },
});
