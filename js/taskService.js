function TaskService() {
  this.getTaskList = function () {
    return axios({
      url: "https://6001827608587400174dad20.mockapi.io/api/TaskList",
      method: "GET",
    });
  };

  this.getDetail = function (id) {
    return axios({
      url: `https://6001827608587400174dad20.mockapi.io/api/TaskList/${id}`,
      method: "GET",
    });
  };

  this.addTask = function (task) {
    return axios({
      url: "https://6001827608587400174dad20.mockapi.io/api/TaskList",
      method: "POST",
      data: task,
    });
  };
  this.deleteTask = function (id) {
    return axios({
      url: `https://6001827608587400174dad20.mockapi.io/api/TaskList/${id}`,
      method: "DELETE",
    });
  };
  this.changeStatus = function (task) {
    return axios({
      url: `https://6001827608587400174dad20.mockapi.io/api/TaskList/${task.id}`,
      method: "PUT",
      data: task,
    });
  };
}
