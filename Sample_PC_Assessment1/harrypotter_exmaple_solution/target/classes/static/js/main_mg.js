// The root URL for the RESTful services
//mg
var rootURL = "http://localhost:8081/books";


var findAll= function () {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", 
		success: renderList,
		error:function(xhr,status,error){
			$(".details").remove();
		}
	});
};



var renderList = function (data) {
	$(".details").remove();	
	$.each(data, function(index, book) {
		let img="images/"+book.image;
		let htmlStr='<div class="details" id="'+book.id+'"><img src='+'"'+img+'"'+'height="150">';
		htmlStr+='<h1>'+book.title+'</h1>';
		htmlStr+='<h2>By '+book.author+'</h2>';
		htmlStr+='<h2>Illustrated by '+book.illustrated+'</h2>';
		htmlStr+='<input class="infoButton" id="' + book.id +'" type="button" value="More Info" id="' + book.id + '"></div>';
		$('#bookList').append(htmlStr);
	});
};



var findById = function(id) {
	$.ajax({
		type: 'GET',
		url: rootURL +'/'+ id,
		dataType: "json",
		success: function(book) {
			showDetails(book);
		}
	});
}

var showDetails = function(book) {
	$('#detailsModal').find('.modal-title').text(book.title);
	$('#pic').attr('src', 'images/' + book.imageModal);
	$('#rrp').val("\u20AC"+book.rrp);
	$('#online_price').val("\u20AC"+book.online);
	let savings=book.rrp-book.online;
	let percent=(savings/book.rrp)*100;
	let saving=(savings).toFixed(2)+" ("+(percent).toFixed(0)+"%)";
	$('#saving').val("\u20AC"+saving);
	$('#detailsModal').modal('show');
}

var findBySeries = function(series) {
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + series,
		dataType: "json",
		success: function(data) {
			renderList(data);
		},
		error:function(xhr,status,error){
			console.log("here");
			$(".details").remove();
		}
	});
}

//When the DOM is ready.
$(document).ready(function(){
	$(document).on("click", ".infoButton", function(){findById(this.id);});
	// Event handler for the modal filter
	$(document).on("click", "#searchButton", function() {
		$('#filterModal').modal('show');
	});
	$(document).on("click", "#submitButton", function() {
		$('#filterModal').modal('hide');
		if (($('#series').val())==""){
		findAll();
		}
		else{
		findBySeries($('#series').val());}
	});
	findAll();
});

