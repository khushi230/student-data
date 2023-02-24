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
let students = [];
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
  clearForm();
};

const backdropClickHandler = () => {
  toggleModalClickHandler();
};

const renderTable = () => {
  tableContainer.classList.add("visible");
};

const renderRows = (studentData) => {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `<td>${studentData.name}</td>
  <td>${studentData.class}</td>
  <td>${studentData.rollNumber}</td>
  <td>${studentData.admNo}</td>
  <td>${studentData.dob}</td>
 <td><button onClick="EditClickHandler(this)">edit</button><button onClick="deleteClickHandler(this)">delete</button></td>
  `;
  tableBody.appendChild(tableRow);
};

const saveClickHandler = () => {
  const studentData = {
    name: nameInput.value,
    class: ClassInput.value,
    rollNumber: rollNoInput.value,
    admNo: admNoInput.value,
    dob: dobInput.value,
  };
  modal.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  renderTable();
  renderRows(studentData);
  students.push(studentData);
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
  dobInput.value = currData.parentElement.parentElement.children[4].textContent;

  editedNode = currData.parentElement.parentElement;
};
const deleteClickHandler = (currRow) => {
  currRow.parentElement.parentElement.remove();
};

const updateClickHandler = (e) => {
  editedNode.children[0].textContent = nameInput.value;
  editedNode.children[1].textContent = ClassInput.value;
  editedNode.children[2].textContent = rollNoInput.value;
  editedNode.children[3].textContent = admNoInput.value;
  editedNode.children[4].textContent = dobInput.value;

  modal.classList.toggle("visible");
  backdrop.classList.toggle("visible");
};

toggleModalButton.addEventListener("click", toggleModalClickHandler);
backdrop.addEventListener("click", backdropClickHandler);
saveButton.addEventListener("click", saveClickHandler);
updateButton.addEventListener("click", updateClickHandler);
