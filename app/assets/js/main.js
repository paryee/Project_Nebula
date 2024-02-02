var piedata = [];
  var bardata = {
    'present':[],
    'week':[],
  };


function barchart() {
	var ctx = document.getElementById('weeklyAttendanceChart').getContext('2d');

	var existingChart = Chart.getChart(ctx);

	// Destroy the existing Chart if it exists
	if (existingChart) {
		existingChart.destroy();
	}

	// Create a bar chart
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: bardata['week'],
			datasets: [{
				data: bardata['present'],
				backgroundColor: 'rgba(54, 162, 235, 0.7)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1
			}]
		},
		options: {
			responsive: false,
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Weeks' 
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'no of days' 
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}


function piechart() {
  var ctx = document.getElementById('assignmentCompletionChart').getContext('2d');

  // Check if there's an existing Chart instance
  var existingChart = Chart.getChart(ctx);

  // Destroy the existing Chart if it exists
  if (existingChart) {
    existingChart.destroy();
  }
  // Create a pie chart
  console.log(piedata[0])
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Completed', 'Incomplete'],
      datasets: [{
        data: [piedata[0], 100 - piedata[0]], 
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)', 
          'rgba(255, 165, 0, 0.7)' 
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });
};


var apiRoute = 'students';
const urlpattern = `http://localhost:8000/api/${apiRoute}`;

// Fetch student names from the API
fetch(urlpattern)
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		// console.log(response.json());
		return response.json();
	})
	.then(studentData => {
		// Populate the dropdown with student names
		const studentSelect = document.getElementById('name');
		let x = 0;
		studentData.forEach(student => {
			const option = document.createElement('option');
			option.value = student.slug;
			option.text = student.name;
			option.setAttribute('data-as_com', student.assignment_completion);
			studentSelect.appendChild(option);

		});

	})
	.catch(error => {
		console.error('Error:', error);
	});



// Add event listener to the Clear Selection button
const clearSelectionButton = document.getElementById('clearSelectionButton');
clearSelectionButton.addEventListener('click', clearSelection);

// Add event listener to the dropdown change event
const studentSelect = document.getElementById('name');
studentSelect.addEventListener('change', () => {
	fetchStudentDetails();
	piechart();
	fetchWeeklyAttendance();

});


function fetchWeeklyAttendance() {
	var apiRoute = 'student/attendance/' + studentSelect.value;

	const url = `http://localhost:8000/api/${apiRoute}`;

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			// console.log(response.json());
			return response.json();
		})
		.then(weeklyData => {

			let x = 0;
			weeklyData.forEach(student => {

				bardata['week'][x] = student.week;
				bardata['present'][x] = student.present;
				x = x + 1;
			});
			// console.log(bardata['present']);
			barchart();
		})
		.catch(error => {
			console.error('Error:', error);
		});


}
        




// Function to clear the selected student information and reset the dropdown
function clearSelection() {
  const studentSelect = document.getElementById('name');
  studentSelect.value = '';

  clearStudentInformation();
}
            
// Function to clear the displayed student information (Replace this with your actual implementation)
function clearStudentInformation() {
	const user_name = document.getElementById('username');
	const cohort = document.getElementById('cohort');
	const email = document.getElementById('email');
	const attendance_average = document.getElementById('average');
	const assignment_completion = document.getElementById('assignment');
	const ranking = document.getElementById('ranking');
	const barchart = document.getElementById('weeklyAttendanceChart');
	const piechart = document.getElementById('assignmentCompletionChart');


	// Clear the content of the elements
	user_name.innerText = '';
	cohort.innerText = '';
	email.innerText = '';
	attendance_average.innerText = '';
	assignment_completion.innerText = '';
	ranking.innerText = '';
	barchart.style.display = 'none';
	piechart.style.display = 'none';

}
    



// Function to fetch details when a student is selected
function fetchStudentDetails() {
        const selectedname = studentSelect.value;
        piedata[0] = studentSelect.options[studentSelect.selectedIndex].getAttribute('data-as_com');

        if (selectedname) {
          const apiUrl = `http://localhost:8000/api/student/${selectedname}`;

// Make a GET request using fetch
fetch(apiUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {

		const user_name = document.getElementById('username');
		const cohort = document.getElementById('cohort');
		const email = document.getElementById('email');
		const attendance_average = document.getElementById('average');
		const assignment_completion = document.getElementById('assignment');
		const ranking = document.getElementById('ranking');
		user_name.innerText = data['name'];
		cohort.innerText = data['cohort'];
		email.innerText = data['email'];
		attendance_average.innerText = data['attendance_average'] + '%';
		assignment_completion.innerText = data['assignment_completion'] + '%';
		ranking.innerText = data['ranking'];

		// Update the UI with the fetched student details (You need to implement this function)
		updateStudentDetails(data);

	})
	.catch(error => {
		console.error('Error:', error);
	});
}
else {
	// Clear the displayed student details if no student is selected
	clearStudentInformation();
}
}