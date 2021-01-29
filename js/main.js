var service = new TaskService();
var valid = new validation();
function getData() {
  service
    .getTaskList()
    .then(function (result) {
      //   console.log(result.data);
      TaoBang(result.data);
      return result.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}
getData();

getEle("addItem").addEventListener("click", function () {
  var taskName = getEle("newTask").value;
  var status = "toDo";

  var taskItem = new task("", taskName, status);

  var isValid = true;

  isValid &= valid.checkEmpty(taskName, "notiInput", "Không được để trống.");

  console.log(isValid);

  if (!isValid) {
    return;
  }

  service.getTaskList().then(async function (result) {
    isValid &= valid.duplicated(
      taskName,
      "notiInput",
      "Task đã tồn tại.",
      await result.data
    );
    // console.log(isValid);
    if (!isValid) {
      return;
    }
  });
  // console.log(isValid);

  service
    .addTask(taskItem)
    .then(function (result) {
      getData();
    })
    .catch(function (err) {
      console.log(err);
    });
});

function TaoBang(arr) {
  var contentToDo = "";
  var contentComplete = "";

  arr.forEach(function (item) {
    if (item.status == "toDo") {
      contentToDo += `
    <li>
    <span>${item.taskName}</span>
    <div class="buttons">
      <button class="remove" onclick="deleteToDo(${item.id})">
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="complete" onclick="updateStatus(${item.id})">
        <i class="far fa-check-circle"></i>
        <i class="fas fa-check-circle"></i>
      </button>
    </div>
  </li>
    `;
    } else
      contentComplete += `
    <li>
    <span>${item.taskName}</span>
    <div class="buttons">
      <button class="remove" onclick="deleteToDo(${item.id})">
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="complete" onclick="updateStatus(${item.id})">
        <i class="far fa-check-circle"></i>
        <i class="fas fa-check-circle"></i>
      </button>
    </div>
  </li>
  `;
  });
  getEle("todo").innerHTML = contentToDo;
  getEle("completed").innerHTML = contentComplete;
}

function deleteToDo(id) {
  service
    .deleteTask(id)
    .then(function (result) {
      getData();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateStatus(id, callback) {
  service
    .getDetail(id)
    .then(async function (rs) {
      var taskDetail = await rs.data;
      if (taskDetail.status === "toDo") {
        taskDetail.status = "complete";
      } else taskDetail.status = "toDo";

      var taskUpdate = new task(id, taskDetail.taskName, taskDetail.status);
      await service.changeStatus(taskUpdate);
      getData();
    })
    .catch(function (err) {});
}

function getEle(id) {
  return document.getElementById(id);
}
