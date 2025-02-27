
// load functions and event listeners
$(document).ready(function() {
	fetchMissions();
	fetchShuttles();

	// Event listener for mission info button clicks
	$(document).on('click', '.infoButton', function() {
		showMissionDetails($(this).data('id'));
	});

	// Event listener for orbitor change
	$(document).on('change', '#orbitors', function() {
		let orbName = ($('#orbitors option:selected').val());
		alert(orbName);
		if (orbName === "All orbitors") {
			fetchMissions();
			displayMissions(missions);
		}
		else {
			fetch('http://localhost:8081/missions/search/' + orbName)
				.then(response => response.json())
				.then(data => {
					$('.list_missions').text(`Orbitor: ` + orbName);
					displayMissions(data);
				})
		}
	});

});



function fetchShuttles() {
	$.getJSON('http://localhost:8081/shuttles')
		.done(populateShuttles)
		.fail(error => console.error('Error fetching shuttle data.', error));
}

// Function to populate existing dropdown 
function populateShuttles(shuttles) {
	window.allShuttles = shuttles;
	const orbitorList = ['All orbitors'];

	shuttles.forEach(shuttle => {
		orbitorList.push(shuttle.name);
		console.log(shuttle.name);
	});


	var orbitors = document.getElementById("orbitors");
	for (var i = 0; i < orbitorList.length; i++) {
		var option = document.createElement('option');
		option.text = option.value = orbitorList[i];
		orbitors.add(option, 0);
	}

	orbitorList.sort();
};

function fetchMissions() {
	$.getJSON('http://localhost:8081/missions')
		.done(displayMissions)
		.fail(error => console.error('Error fetching mission data.', error));
}

function displayMissions(missions) {
	$('.list_missions').empty(); // clears previous content

	$('.list_missions').append(`<div class="row">`);
	missions.forEach(mission => { // each mission item has the same properties
		$('.row').append(`
		        <div class="col-sm-6 col-md-4 col-lg-3"> 
					<div class="details">
						<img src="/images/${mission.name}.jpeg" height="50" alt="${mission.name}">
			            <h2>${mission.name}</h2>
			            <h2>By ${mission.orbitor}</h2>
		
						<a href="#" class="infoButton" data-id="${mission.id}">
							<span id="${mission.id}" class="fa fa-info-circle fa-3x"></span>
						</a>
					</div>
	        	</div>
	    `);
	});

	// store missions for access in event listener
	window.allMissions = missions;
}

function showMissionDetails(missionId) {
	const mission = window.allMissions.find(m => m.id == missionId);
	if (!mission) return;

	// add book details to modal
	$('.modal-title').text(`Mission details for ${mission.name}`);
	$('#pic').attr('src', `images/${mission.orbitor}`.toLowerCase() + '_thumb.jpg');
	$('#launch').val(mission.launch);
	$('#landing').val(mission.landing);
	$('#landing_site').val(mission.landingSite);
	$('#duration').val(mission.duration);
	$('#notes').val(mission.notes);

	// open modal
	$('#myModal').modal('show');
}


