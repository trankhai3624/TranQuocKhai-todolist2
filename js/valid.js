function validation() {
  this.checkEmpty = function (input, spanid, mess) {
    if (input != "") {
      getEle(spanid).style.display = "none";
      getEle(spanid).innerHTML = "";
      return true;
    }
    getEle(spanid).style.display = "block";
    getEle(spanid).innerHTML = mess;
    return false;
  };
  this.duplicated = function (input, spanId, mess, arr) {
    var check = true;
    arr.forEach((item) => {
      if (input === item.taskName) {
        check = false;
      }
    });
    if (check) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  };
}

function getEle(id) {
  return document.getElementById(id);
}
