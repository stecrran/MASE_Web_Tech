// Using JQuery
$(document).ready(function () {
    fetchCars(); // Ensure fetchCars runs after the DOM loads
});

function fetchCars() {
	$.getJSON('http://localhost:8081/cars')
	.done(displayCars)
	.fail(error => console.error('Error fetching cars', error))
}

function displayCars(cars) {
	$('.list_cars_scroll').empty();
	
	cars.forEach(car => {
		$('.list_cars_scroll').append(`
			<div class="scroll_cars">
			 <img src="/images/cars/${car.image}" height="100" alt="${car.model}">
			 <p>${car.manufacturerYear}  ${car.make} ${car.model}</p>
			 
			 <!-- info icon / button -->
			 <a href="#" class="infoButton" data-id="${car.id}">
			     <i class="fa fa-info-circle fa-2x"></i>
			 </a>
			 
			</div>`
		);
	});
	window.allCars = cars;
}

// event listener - called once to avoid duplicates
$(document).on('click', '.infoButton', function () {
	const carId = $(this).data('id');
	showCarDetails(carId);
})

function showCarDetails(carId) {
	const car = window.allCars.find(c => c.id == carId);
	if (!car) return;
	
	$('.modal-title').text(`Details for ${car.manufacturerYear} ${car.model} ${car.make}`);
	//pic, color, year, engine, mileage, condition
	$('#pic').attr('src', `images/cars/${car.image}`);
	$('#color').val(`${car.color}`);
	$('#year').val(`${car.manufacturerYear}`);
	$('#engine').val(`${car.litre} litres`);
	$('#miles').val(`${car.mileage} miles`);
	$('#condition').val(`${car.condition}`);
	
	// open modal
	$('#detailsModal').modal('show');
	
}

// event listener for filtering
$(document).ready(function () {
	$('#submitButton').click(function () {
		let searchMin = $('#minYear').val().trim(); // get min. year
		let searchMax = $('#maxYear').val().trim(); // get max year
		
		if (searchMin === "" || searchMax === ""){
			fetchCars();
		}
		else {
			
			// fetch based on min and max year
			fetch(`http://localhost:8081/cars/search/${encodeURIComponent(searchMin)}/${encodeURIComponent(searchMax)}`)
				.then(response => response.json())
				.then(data => {
					// update <h2> with selected min and mx year
					$('#whichCars').text(`Cars from ${searchMin} to ${searchMax}`);
					displayCars(data);
				})
				.catch(error => console.error('Error fetching cars:', error));
		}
		
		// close modal after search
		$('#filterModal').modal('hide');
		
	});
	
	$('#searchButton').click(function (){
		// open modal
		$('#filterModal').modal('show');
	});
	
});

// fetchCars when page loads
$(document).ready(function (){
	fetchCars();
});

