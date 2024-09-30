const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const FATHERNAMEInput = document.getElementById('FATHERNAME');
const PHONEInput = document.getElementById('PHONE');
const AadharInput = document.getElementById('Aadhar');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);
// Function to check for duplicate names
function isDuplicateName(PHONE) {
  return records.some(
    (record) => record.PHONE.toLowerCase() === PHONE.toLowerCase()
  );
}

// Display records
function displayRecords() {
  recordList.innerHTML = '';
  console.log(records.length);
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.FATHERNAME}</td>
                    <td>${record.PHONE}</td>
                    <td>${record.Aadhar}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

// Add or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const FATHERNAME = FATHERNAMEInput.value;
  const PHONE = PHONEInput.value;
  const Aadhar = AadharInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && FATHERNAME && PHONE && Aadhar ) {
    if (isDuplicateName(PHONE) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new record
      records.push({ name, FATHERNAME, PHONE, Aadhar});
    } else {
      // Update an existing record
      records[editIndex] = { name, FATHERNAME, PHONE, Aadhar };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    FATHERNAMEInput.value = '';
    PHONEInput.value = '';
    AadharInput.value = '';
    displayRecords();
  }
});

// Edit a record
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  FATHERNAMEInput.value = recordToEdit.FATHERNAME;
  PHONEInput.value = recordToEdit.PHONE;
  AadharInput.value = recordToEdit.Aadhar;
  editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
  displayRecords();
  let delBtn = document.querySelectorAll('.deleteButton');
  console.log(delBtn);
  delBtn[
    index
  ].innerHTML = `<i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i><i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>`;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete(index) {
  displayRecords();
}

// Initial display
displayRecords();