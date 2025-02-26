$(document).ready(function () {
    // Initialize components on page load
    createDropdown();  // Create dropdown once
    fetchCars();       // Fetch cars once

    // Event listener for dropdown menu clicks
    $(document).on('click', '.dropdown-item', function () {
        console.log(`Selected from dropdown: ${$(this).text()}`);
    });

    // Event listener for car info button clicks
    $(document).on('click', '.infoButton', function () {
        showCarDetails($(this).data('id'));
    });

    // Event listener for filtering
    $('#submitButton').click(function () {
        let searchMin = $('#minYear').val().trim();
        let searchMax = $('#maxYear').val().trim();

        if (searchMin === "" || searchMax === "") {
            fetchCars();
        } else {
            // Fetch based on min and max year
            fetch(`http://localhost:8081/cars/search/${encodeURIComponent(searchMin)}/${encodeURIComponent(searchMax)}`)
                .then(response => response.json())
                .then(data => {
                    $('#whichCars').text(`Cars from ${searchMin} to ${searchMax}`);
                    displayCars(data);
                })
                .catch(error => console.error('Error fetching cars:', error));
        }

        $('#filterModal').modal('hide'); // Close modal after search
    });

    // Open filter modal on search button click
    $('#searchButton').click(function () {
        $('#filterModal').modal('show');
    });
});

// Function to create the dropdown only once
function createDropdown() {
    if ($('#dropdownMenuButton').length === 0) {  // Avoid duplicates
        var dropdown = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Menu
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="home.html">Home</a>
                    <a class="dropdown-item" href="#">About</a>
                    <a class="dropdown-item" href="#">Contact</a>
                </div>
            </div>
        `;
        $('#logo').append(dropdown);
    }
}

// Function to fetch car data
function fetchCars() {
    $.getJSON('http://localhost:8081/cars')
        .done(displayCars)
        .fail(error => console.error('Error fetching cars', error));
}

// Function to display fetched cars
function displayCars(cars) {
    $('.list_cars_scroll').empty();
    window.allCars = cars; // Store globally for lookup in showCarDetails

    cars.forEach(car => {
        $('.list_cars_scroll').append(`
            <div class="scroll_cars">
                <img src="/images/cars/${car.image}" height="100" alt="${car.model}">
                <p>${car.manufacturerYear}  ${car.make} ${car.model}</p>
                <a href="#" class="infoButton" data-id="${car.id}">
                    <i class="fa fa-info-circle fa-2x"></i>
                </a>
            </div>
        `);
    });
}

// Function to show car details in modal
function showCarDetails(carId) {
    const car = window.allCars.find(c => c.id == carId);
    if (!car) return;
    
    $('.modal-title').text(`Details for ${car.manufacturerYear} ${car.model} ${car.make}`);
    $('#pic').attr('src', `images/cars/${car.image}`);
    $('#color').val(car.color);
    $('#year').val(car.manufacturerYear);
    $('#engine').val(`${car.litre} litres`);
    $('#miles').val(`${car.mileage} miles`);
    $('#condition').val(car.condition);
    
    $('#detailsModal').modal('show');
}
