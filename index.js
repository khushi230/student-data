const modal = document.getElementById("modal");
const toggleModalButton = document.querySelector(".header button");
const backdrop = document.querySelector(".backdrop");
const nameInput = document.getElementById("name");
const rollNoInput = document.getElementById("roll-number");
const ClassInput = document.getElementById("class");
const admNoInput = document.getElementById("adm-number");
const dobInput = document.getElementById("dob");
const saveButton = document.getElementById("save");
const tableContainer = document.querySelector(".table-container");
const tableBody = document.querySelector(".blueTable tbody");
const updateButton = document.getElementById("update");
const errorNode = document.querySelectorAll("small");
let students = [];

let storedStudentsData = localStorage.getItem("studentsData");

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const renderRows = (studentData) => {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `<td>${studentData.name}</td>
  <td>${studentData.class}</td>
  <td>${studentData.rollNumber}</td>
  <td>${studentData.admNo}</td>
  <td>${formatDate(new Date(studentData.dob))}</td>
 <td><button onClick="EditClickHandler(this)">edit</button><button onClick="deleteClickHandler(this,${
   studentData.admNo
 })">delete</button></td>
  `;
  tableBody.appendChild(tableRow);
};

if (storedStudentsData) {
  storedStudentsData = JSON.parse(storedStudentsData);
  students = storedStudentsData;
  students.forEach((student) => renderRows(student));
}

const clearForm = () => {
  nameInput.value = "";
  ClassInput.value = "";
  rollNoInput.value = "";
  admNoInput.value = "";
  dobInput.value = "";
};

let editedNode = {};

const toggleModalClickHandler = () => {
  modal.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  saveButton.classList.add("visible");
  updateButton.classList.remove("visible");
};

const backdropClickHandler = () => {
  toggleModalClickHandler();
};

const renderTable = () => {
  tableContainer.classList.add("visible");
};

const showError = () => {
  let flag = 0;
  if (nameInput.value.trim() == "") {
    flag = 1;
    nameInput.classList.add("error");
    errorNode[0].textContent = `${nameInput.previousElementSibling.textContent} is required`;
    errorNode[0].setAttribute("style", "color:red");
  } else {
    nameInput.classList.remove("error");
    errorNode[0].textContent = "";
    errorNode[0].removeAttribute("style", "color:red");
  }
  if (ClassInput.value.trim() == "") {
    flag = 1;

    ClassInput.classList.add("error");
    errorNode[1].textContent = `${ClassInput.previousElementSibling.textContent} is required`;
    errorNode[1].setAttribute("style", "color:red");
  } else {
    ClassInput.classList.remove("error");
    errorNode[1].textContent = "";
    errorNode[1].removeAttribute("style", "color:red");
  }
  if (admNoInput.value.trim() == "") {
    flag = 1;

    admNoInput.classList.add("error");
    errorNode[2].textContent = `${admNoInput.previousElementSibling.textContent} is required`;
    errorNode[2].setAttribute("style", "color:red");
  } else {
    admNoInput.classList.remove("error");
    errorNode[2].textContent = "";
    errorNode[2].removeAttribute("style", "color:red");
  }
  if (dobInput.value.trim() === "") {
    flag = 1;

    dob.classList.add("error");
    errorNode[3].textContent = `${dobInput.previousElementSibling.textContent} is required`;
    // errorNode[3].setAttribute("style", "color:red");
    errorNode[3].style.color = "red";
  } else {
    dob.classList.remove("error");
    errorNode[3].textContent = "";
    errorNode[3].removeAttribute("style", "color:red");
  }
  if (flag === 0) {
    return false;
  }
};

const saveClickHandler = () => {
  const studentData = {
    name: nameInput.value,
    class: ClassInput.value,
    rollNumber: rollNoInput.value,
    admNo: admNoInput.value,
    dob: formatDate(new Date(dobInput.value)),
  };

  if (showError() === false) {
    modal.classList.toggle("visible");
    backdrop.classList.toggle("visible");
    renderTable();
    renderRows(studentData);
    students.push(studentData);
    localStorage.setItem("studentsData", JSON.stringify(students));
    clearForm();
  }
};

const EditClickHandler = (currData) => {
  modal.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  saveButton.classList.remove("visible");
  updateButton.classList.add("visible");
  nameInput.value =
    currData.parentElement.parentElement.children[0].textContent;
  ClassInput.value =
    currData.parentElement.parentElement.children[1].textContent;
  rollNoInput.value =
    currData.parentElement.parentElement.children[2].textContent;
  admNoInput.value =
    currData.parentElement.parentElement.children[3].textContent;

  dobInput.value = formatDate(
    currData.parentElement.parentElement.children[4].textContent
  );

  editedNode = currData.parentElement.parentElement;
};

const deleteClickHandler = (currRow, admissionNum) => {
  currRow.parentElement.parentElement.remove();
  students = students.filter(
    (student) => Number(student.admNo) !== admissionNum
  );
  localStorage.setItem("studentsData", JSON.stringify(students));
};

const updateClickHandler = (e) => {
  showError();
  if (showError() === false) {
    editedNode.children[0].textContent = nameInput.value;
    editedNode.children[1].textContent = ClassInput.value;
    editedNode.children[2].textContent = rollNoInput.value;
    editedNode.children[3].textContent = admNoInput.value;
    editedNode.children[4].textContent = formatDate(new Date(dobInput.value));

    modal.classList.toggle("visible");
    backdrop.classList.toggle("visible");
    students.forEach((student) => {
      if (student.admNo === admNoInput.value) {
        student.name = nameInput.value;
        student.class = ClassInput.value;
        student.rollNumber = rollNoInput.value;
        student.dob = formatDate(new Date(dobInput.value));
      }
    });
    localStorage.setItem("studentsData", JSON.stringify(students));
    clearForm();
  }
};

toggleModalButton.addEventListener("click", toggleModalClickHandler);
backdrop.addEventListener("click", backdropClickHandler);
saveButton.addEventListener("click", saveClickHandler);
updateButton.addEventListener("click", updateClickHandler);
