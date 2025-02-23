
async function fetchBooks() {
	try {
		const response = await fetch('http://localhost:8081/books');
		if (!response.ok) {
			throw new Error(`HTTP Error. Status: ${response.status}`);
		}
		const books = await response.json();
		displayBooks(books);
	} catch (error) {
		console.error('Error fetching books:', error);
	}
}


function displayBooks(books) {
	const bookList = document.getElementById('bookList');
	bookList.innerHTML = ''; // Clear previous content


	books.forEach(book => { // each book item has the same properties
		bookList.insertAdjacentHTML('beforeend', `
	        <div class="details"> <!-- JavaScript uses <div class="details"> for styling as main.css has .details config. -->
	            <img src="/images/${book.image}" height="150" alt="${book.title}">
	            <h1>${book.title}</h1>
	            <h2>By ${book.author}</h2>
	            <h2>Illustrated by ${book.illustrated}</h2>
	            <input data-id="${book.id}" class="infoButton" type="button" value="More Info">
	        </div>
	    `);
	});

	// event listener for "More Info" buttons
	document.querySelectorAll('.infoButton').forEach(button => {
		button.addEventListener('click', function() {
			const bookId = this.getAttribute('data-id');
			showBookDetails(bookId, books);
		});
	});
}

function showBookDetails(bookId, books) {
	const book = books.find(b => b.id == bookId);
	if (!book) return;

	var saving = book.rrp - book.online;
	var saving_pc = Math.round((saving / book.rrp)*100);
	// add book details to modal
	document.getElementById('pic').src = `images/${book.image}`;
	document.getElementById('rrp').value = `€${book.rrp.toFixed(2)}`;
	document.getElementById('online_price').value = `€${book.online.toFixed(2)}`;
	document.getElementById('saving').value = `€${saving.toFixed(2)}  (${saving_pc}%)`;

	// open modal
	$('#detailsModal').modal('show');

}

// fetchBooks when page loads
document.addEventListener('DOMContentLoaded', fetchBooks);
