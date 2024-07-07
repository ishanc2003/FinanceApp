let balance = 0;

document.getElementById('addTransaction').addEventListener('click', function() {
    addRow();
});

function addRow() {
    var table = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.innerHTML = `
        <td></td>
        <td><input type="text" disabled></td>
        <td><input type="date" disabled></td>
        <td><input type="number" disabled></td>
        <td>
            <button class="edit">Edit</button>
            <button class="save" style="display:none">Save</button>
            <button class="delete" onclick="deleteRow(this)">Delete</button>
            <div class="toggle-button" onclick="toggleReminder(this)"></div>
        </td>
    `;
    updateSerialNumbers();

    // Attach event listener for the edit button
    newRow.querySelector('.edit').addEventListener('click', function() {
        editRow(this);
    });

    // Attach event listener for the save button
    newRow.querySelector('.save').addEventListener('click', function() {
        saveRow(this);
    });
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateSerialNumbers();
}

function saveRow(button) {
    var row = button.parentNode.parentNode;
    var inputs = row.getElementsByTagName('input');
    var amountInput = inputs[2]; // Assuming amount input is at index 2
    var amount = parseFloat(amountInput.value);
    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }
    button.style.display = 'none';
    row.querySelector('.edit').style.display = 'inline-block'; // Show Edit button
    toggleInputFields(row, false); // Disable input fields after saving
}


function editRow(button) {
    var row = button.parentNode.parentNode;
    button.style.display = 'none';
    row.querySelector('.save').style.display = 'inline-block'; // Show Save button
    toggleInputFields(row, true); // Enable input fields
}

function toggleInputFields(row, isEnabled) {
    var inputs = row.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !isEnabled;
    }
}

function toggleReminder(toggle) {
    toggle.classList.toggle('active');
    if (toggle.classList.contains('active')) {
        checkDate(toggle.parentNode.parentNode);
    }
}

function checkDate(row) {
    var dateInput = row.getElementsByTagName('input')[1].value; // Assuming date input is at index 1
    var date = new Date(dateInput);
    var now = new Date();
    if (date.setHours(0,0,0,0) <= now.setHours(0,0,0,0)) {
        alert("Reminder: Payment is due!");
    }
}

function updateSerialNumbers() {
    var rows = document.getElementById('expenseTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('td')[0].textContent = i + 1;
    }
}

document.getElementById('dismiss-btn').addEventListener('click', function() {
    var banner = document.getElementById('popup');
    banner.style.display = 'none';
});

function logout() {
    window.close();
}

document.getElementById('logoutButton').addEventListener('click', logout);
