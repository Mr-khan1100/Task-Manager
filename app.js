var tasks = [];
let filteredTasks=[];
var taskInput = document.getElementById("taskInput");
var startDateInput = document.getElementById("startDateInput");
var endDateInput = document.getElementById("endDateInput");
var selectStatus = document.getElementById("selectStatus");

var editTaskInput = document.getElementById('editTaskInput');
var editStartDate = document.getElementById('editStartDate');
var editEndDate = document.getElementById('editEndDate');
var editSelectStatus = document.getElementById('editSelectStatus');


document.getElementById("taskInput").value = '';
document.getElementById("startDateInput").value = '';
document.getElementById("endDateInput").value = '';
document.getElementById("selectStatus").value = '';
var statusSelect = document.getElementById('selectStatus');
var rowIndex;
let selectedRow;
let selectedRowIndex
var task;

// Function to add a new task
document.getElementById('form').addEventListener('submit',function(event){
    event.preventDefault();

    if(!validate()){
      return;
    }
    // Get input values
    var taskInput = document.getElementById("taskInput").value;
    var startDateInput = document.getElementById("startDateInput").value;
    var endDateInput = document.getElementById("endDateInput").value;
    var selectStatus = document.getElementById("selectStatus").value;

  
  
    // Create a new task object
    var task = {
      taskName: taskInput,
      startDate: startDateInput,
      endDate: endDateInput,
      status: selectStatus
    };

    tasks.push(task);
    console.log(tasks);
    
  
    // Clear input fields
    document.getElementById("taskInput").value='';
    document.getElementById("startDateInput").value='';
    document.getElementById("endDateInput").value='';
    document.getElementById("selectStatus").value='';


    displayData();

});


function displayData() {
  event.preventDefault()
  var tbody = document.getElementById('tbody');
  tbody.innerHTML = ''; // Clear existing table rows

  // Get today's date
  var today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to compare only dates

  // Loop through the activity data array
  for (var i = 0; i < tasks.length; i++) {
    var activity = tasks[i];

    // Create a new table row
    var row = document.createElement('tr');

    // Apply strikethrough style to the row if the status is "Completed" or "Due Passed"
    if (activity.status === 'Completed' || activity.status === 'Due_Passed') {
      row.style.textDecoration = 'line-through';
    }

    // Create table cells and set their values
    var taskInputCell = document.createElement('td');
    taskInputCell.textContent = activity.taskName;
    row.appendChild(taskInputCell);

    var startDateCell = document.createElement('td');
    startDateCell.textContent = activity.startDate;
    row.appendChild(startDateCell);

    var endDateCell = document.createElement('td');
    endDateCell.textContent = activity.endDate;
    row.appendChild(endDateCell);

    var statusCell = document.createElement('td');
    statusCell.textContent = activity.status;
    row.appendChild(statusCell);

    var actionsCell = document.createElement('td');

    // Create edit button if the status is not "Due Passed" or "Completed"
    if (activity.status !== 'Due_Passed' && activity.status !== 'Completed') {
      var editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');
      editButton.setAttribute('data-index', i); // Set data-index attribute to identify the activity index
      editButton.addEventListener('click', handleEditButtonClick);
      actionsCell.appendChild(editButton);
    }

    // Create delete button
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.setAttribute('data-index', i); // Set data-index attribute to identify the activity index
    deleteButton.addEventListener('click', deleteRow);
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    // Add the row to the table body
    tbody.appendChild(row);
  }

  // Display the table
  document.getElementById('taskList').classList.remove('hidden');
}



// Function to handle edit button click event
function handleEditButtonClick(event) {
   selectedRow = event.target.parentElement.parentElement;
    selectedRowIndex = selectedRow.rowIndex -1;
  var activity = tasks[selectedRowIndex];
    var editTaskInput = document.getElementById("editTaskInput");
    var editStartDate = document.getElementById("editStartDate");
    var editEndDate = document.getElementById("editEndDate");
    var editSelectStatus = document.getElementById("editSelectStatus");

    // document.getElementById("popupContainer").setAttribute("data-task-index", index);

    editTaskInput.value = activity.taskName;
    editStartDate.value = activity.startDate;
    editEndDate.value = activity.endDate;
    editSelectStatus.value = activity.status;
    
    document.getElementById('popupContainer').style.display = 'block'

}

function deleteRow(event) {
  var index = event.target.getAttribute('data-index');

  // Remove the activity from the array
  tasks.splice(index, 1);

  // Update the table
  displayData();
}



  // Function to close the popup
  function cancelEdit() {
    var popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
  }



function validate() {
  var taskInput = document.getElementById('taskInput').value;
  var startDate = new Date(document.getElementById('startDateInput').value);
  var endDate = new Date(document.getElementById('endDateInput').value);
  var status = document.getElementById('selectStatus').value;

  isValid = true;
  // Validate input
  // Regular expression pattern to match alphanumeric characters and space
  

  // Check if the taskInput matches the pattern
  var pattern = /^[a-zA-Z0-9\s]+$/;
  if(taskInput.trim() === ''){
    document.getElementById('taskInput_error').textContent = 'This field is required';
    isValid = false;
  }else if (!pattern.test(taskInput)){
    document.getElementById('taskInput_error').textContent = 'Only alphanumeric characters and spaces are allowed.';
    isValid = false;
  }else {
    document.getElementById('taskInput_error').textContent = '';
  }
  

  // Validate start date
  if(startDate === ''){
    document.getElementById('startdate_error').textContent = 'This field is required';
    isValid = false;
  }else{
    document.getElementById('startdate_error').textContent = '';
  } 
  

  // Validate end date
  if(endDate === ''){
    document.getElementById('enddate_error').textContent = 'This Field is Required';
    isValid=false;
  }
    else{
      document.getElementById('enddate_error').textContent = '';
    } 
  

    if (endDate < startDate) {
      document.getElementById('enddate_error').textContent = 'End date cannot be earlier than start date';
      isValid = false;
    } else {
      document.getElementById('enddate_error').textContent = '';
    }


  // Validate status
  if (status === '') {
    document.getElementById('status_error').textContent = 'Status is required';
    isValid = false;
  } else {
    document.getElementById('status_error').textContent = '';
  }

  return isValid;
}



//Date condition validation


function disableOptions() {

  const startDate = new Date(startDateInput.value).setHours(0,0,0,0);
  const endDate = new Date(endDateInput.value).setHours(0,0,0,0);
  const todayDate = new Date().setHours(0,0,0,0);

  // Enable all options

  for (let i = 1; i < statusSelect.options.length; i++) {
    statusSelect.options[i].disabled = false;
  }
  if(endDate<todayDate){
      statusSelect.options[1].disabled=true;
      statusSelect.options[2].disabled=true;
      statusSelect.options[3].disabled = true;
  }else if(endDate===todayDate){
      console.log(endDate ," ++ ",todayDate)
      statusSelect.options[4].disabled=true; //due passed
  }else if(endDate>todayDate){
      statusSelect.options[4].disabled=true;
  }  


  if(startDate > todayDate){
          console.log("startDate > todayDate")
          statusSelect.options[3].disabled=true;
          statusSelect.options[1].disabled=true;
          statusSelect.options[4].disabled =true;
      }else if(startDate === todayDate){
          statusSelect.options[4].disabled=true;
  }


    if (startDate > endDate) {
        // If start date is after end date, disable "In-Progress" and "Completed" options
        statusSelect.options[1].disabled = true; // In-Progress
        statusSelect.options[2].disabled = true;
        statusSelect.options[3].disabled = true; // In-Progress
        statusSelect.options[4].disabled = true;
        console.log("create a error msg /all options are diabled")
         // Completed
      } 

  }

  startDateInput.addEventListener('change', disableOptions);
  endDateInput.addEventListener('change', disableOptions);





function updateRecord(){
    
    event.preventDefault()

    const newTaskInput = editTaskInput.value;

    const newStartDate = editStartDate.value;
    const newEndDate = editEndDate.value;
    const newStatus = editSelectStatus.value;

    if (newTaskInput && newStartDate && newEndDate && newStatus) {
      tasks[selectedRowIndex] = {
        taskName: newTaskInput,
        startDate: newStartDate,
        endDate: newEndDate,
        status: newStatus

      };

      document.getElementById('popupContainer').style.display = 'none';
      console.log("updated",tasks[selectedRowIndex])
    
      displayData(tasks);
    }
    console.log("update call")
}

function searchTable() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var rows = document.getElementById('tbody').getElementsByTagName('tr');
  
    // Loop through all table rows
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName('td');
      var rowMatch = false;
  
      // Loop through all cells in the row
      for (var j = 0; j < cells.length; j++) {
        var cellValue = cells[j].textContent.toLowerCase();
  
        if (cellValue.includes(searchInput)) {
          rowMatch = true;
          break; // Stop checking other cells in the row
        }
      }
  
      if (rowMatch) {
        rows[i].style.display = ''; // Show matching row
      } else {
        rows[i].style.display = 'none'; // Hide non-matching row
      }
    }
  }

  searchInput.addEventListener('input', searchTable);