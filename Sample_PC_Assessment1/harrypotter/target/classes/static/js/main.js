// using JQuery ---
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

// event listener called once to avoid duplicate modals
$(document).on('click', '.infoButton', function() {
	const bookId = $(this).data('id');
	showBookDetails(bookId);
});

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

// fetchBooks when page loads
$(document).ready(function() {
	fetchBooks();
});
