// using JQuery ---

// load functions and event listeners
$(document).ready(function() {
	fetchBooks();
	createDropdown();
	clearAll();
	returnAll();
	
	// event listener called once to avoid duplicate modals
	$(document).on('click', '.infoButton', function () {
		const bookId = $(this).data('id');
		showBookDetails(bookId);
	});

	// event listener to clear books
	$(document).on('click', '#clearBooksButton', function () {
		$('#bookList').empty();
	});

	// event listener to restore books
	$(document).on('click', '#restoreBooksButton', function () {
		fetchBooks();
	});

});


function fetchBooks() {
	$.getJSON('http://localhost:8081/books')
		.done(displayBooks)
		.fail(error => console.error('Error fetching books:', error));
}


function displayBooks(books) {
	$('#bookList').empty(); // clears previous content


	books.forEach(book => { // each book item has the same properties
		$('#bookList').append(`
	        <div class="details"> <!-- JavaScript uses <div class="details"> for styling as main.css has .details config. -->
	            <img src="/images/${book.image}" height="150" alt="${book.title}">
	            <h1>${book.title}</h1>
	            <h2>By ${book.author}</h2>
	            <h2>Illustrated by ${book.illustrated}</h2>
	            <input data-id="${book.id}" class="infoButton" type="button" value="More Info">
	        </div>
	    `);
	});

	// store books for access in event listener
	window.allBooks = books;

}


// Function to create a dropdown (once) in header
function createDropdown() {
    if ($('#dropdownMenuButton').length === 0) {
        var dropdown = `
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menu
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" data-action="goHome">Home</a>
                <a class="dropdown-item" href="#" data-action="clearBooksOption">Clear Books</a>
                <a class="dropdown-item" href="#" data-action="showContact">Contact</a>
            </div>
        </div>
        `;
        $('#search').append(dropdown);

        // Attach event listener to dynamically handle dropdown selections
        $('.dropdown-menu').on('click', '.dropdown-item', function (e) {
            e.preventDefault(); // Prevent default link behavior

            let action = $(this).data('action'); // Get the function name
            if (typeof window[action] === "function") {
                window[action](); // Call the function dynamically
            }
        });
    }
}

// Example functions
function goHome() {
    alert("Navigating to Home...");
    window.location.href = "home.html";
}

function clearBooksOption() {
    alert("Clearing Books");
	$('#bookList').empty();
}

function showContact() {
    alert("Displaying Contact Section...");
}


function showBookDetails(bookId) {
	const book = window.allBooks.find(b => b.id == bookId);
	if (!book) return;

	var saving = book.rrp - book.online;
	var saving_pc = Math.round((saving / book.rrp) * 100);
	// add book details to modal
	$('#pic').attr('src', `images/${book.image}`);
	$('#rrp').val(`€${book.rrp.toFixed(2)}`);
	$('#online_price').val(`€${book.online.toFixed(2)}`);
	$('#saving').val(`€${saving.toFixed(2)} (${saving_pc}%)`);

	// open modal
	$('#detailsModal').modal('show');

}

// event listener for search by series
$(document).ready(function() {
	$('#submitButton').click(function() {
		let searchText = $('#series').val().trim(); // get input
		if (searchText === "") {
			fetchBooks();
		} else {
			// fetch books matching searchText
			fetch(`http://localhost:8081/books/search/${encodeURIComponent(searchText)}`)
				.then(response => response.json())
				.then(data => displayBooks(data))
				.catch(error => console.error('Error fetching books:', error));
		}

		// close modal after search
		$('#filterModal').modal('hide');
	});

	$('#searchButton').click(function() { // class = '.', id = '#'
		// open modal
		$('#filterModal').modal('show');
	});

});


// clear all books button
function clearAll(){
var clearBooks = ` 
	<div class="button-container"> <!-- using button-container for clear and restore to enforce styling -->
	 	<button class="btn btn-warning" type="button" id="clearBooksButton">
	 	Clear Books</button>
	</div>
	`;
	$('#belowTitle').prepend(clearBooks); // append = below, prepend = above
}

// restore books button
function returnAll(){
var returnBooks = `
	<div class="button-container">
	 	<button class="btn btn-success" type="button" id="restoreBooksButton">
	 	Restore Books</button>
	</div>
	`;
	$('#belowTitle').prepend(returnBooks);
}



