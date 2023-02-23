const modal = document.getElementById("modal");
const addModal = document.querySelector(".header button");
const backdrop = document.querySelector(".backdrop");
const name = document.getElementById("name");
const rollNo = document.getElementById("roll-number");
const stClass = document.getElementById("class");
const admNo = document.getElementById("adm-number");
const dob = document.getElementById("dob");
const save = modal.querySelector("button");
const tableContainer = document.querySelector(".table-container");
const tableBody = document.querySelector(".blueTable tbody");
const update = document.getElementById("update");
let students = [];

const deleteHandler = (admNo) => {
  let index = 0;
  for (const student of students) {
    if (student.admNo === admNo) {
      break;
    }
    index++;
  }
  tableBody.children[index].remove();
  students.splice(index, 1);
  console.log(students);
};

const editHandler = (admissionNo) => {
  let index = 0;
  for (const student of students) {
    if (student.admNo === admissionNo) {
      break;
    }
    index++;
  }
  update.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  modal.classList.toggle("visible");
  name.value = students[index].name;
  stClass.value = students[index].stclass;
  admNo.value = students[index].admNo;
  rollNo.value = students[index].rollNo;
  dob.value = students[index].dob;
  admNo.setAttribute("disabled", "true");
};

const renderRows = (studentObject) => {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
          <td>${studentObject.name}</td>
          <td>${studentObject.stclass}</td>
          <td>${studentObject.rollNo}</td>
          <td>${studentObject.admNo}</td>
          <td>${studentObject.dob}</td>
         <td><button id="${studentObject.admNo}-edit" >edit</button><button id="${studentObject.admNo}-delete">deletet</button></td>
          `;
  tableContainer.classList.add("visible");
  tableBody.append(tableRow);
  students.push(studentObject);
  const btn = document.getElementById(studentObject.admNo + "-delete");
  btn.addEventListener("click", () => {
    deleteHandler(studentObject.admNo);
  });
  const editBtn = document.getElementById(studentObject.admNo + "-edit");
  editBtn.addEventListener("click", () => {
    editHandler(studentObject.admNo);
  });
};

const addModalHandler = () => {
  save.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  modal.classList.toggle("visible");
};

const saveClickHandler = () => {
  const studentObject = {
    name: name.value,
    stClass: stClass.value,
    rollNo: rollNo.value,
    admNo: admNo.value,
  };

  renderRows(studentObject);

  addModalHandler();
};

const updateClickHandler = () => {
  let index = 0;
  for (const student of students) {
    if (student.admNo === admNo.value) {
      break;
    }
    index++;
  }

  const studentObject = {
    name: name.value,
    stClass: stClass.value,
    rollNo: rollNo.value,
    admNo: admNo.value,
  };

  students[index] = studentObject;

  tableBody.children[index].innerHTML = `
          <td>${students[index].name}</td>
          <td>${students[index].stclass}</td>
          <td>${students[index].rollNo}</td>
          <td>${students[index].admNo}</td>
          <td>${students[index].dob}</td>
         <td><button id="${students[index].admNo}-edit" >edit</button><button id="${students[index].admNo}-delete">deletet</button></td>
          `;
  const btn = document.getElementById(students[index].admNo + "-delete");
  btn.addEventListener("click", () => {
    deleteHandler(students[index].admNo);
  });
  const editBtn = document.getElementById(students[index].admNo + "-edit");
  editBtn.addEventListener("click", () => {
    editHandler(students[index].admNo);
  });

  addModalHandler();
};
addModal.addEventListener("click", addModalHandler);
save.addEventListener("click", saveClickHandler);
update.addEventListener("click", updateClickHandler);
