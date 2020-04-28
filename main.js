$(document).ready(function() {
	
	// Handlebars refs
	var source = $('#cd-template').html();
	var template = Handlebars.compile(source);

	// jQuery refs
	var cdArea = $('.cds-container');
	var genreSelector = $('#genre');

	// Init
	var myApi = "https://flynn.boolean.careers/exercises/api/array/music";

	// Ajax on-load
	$.ajax({
		type: "GET",
		url: myApi,
		success: function (data) {
			if(data.success){
				// Retrieve albums number
				var albumNumber = data.response.length;
				for (var i = 0; i < albumNumber; i++){
					var thisAlbum = data.response[i];
					fillAlbum(thisAlbum);
				}
			}
		},
		error: function(){
			console.log('Cannot retrieve the API');
		}
	});

	// Ajax on select
	genreSelector.change(function () { 
		var cdCard = $('.cd');
		var currentGenre = genreSelector.val();
		cdCard.remove();
		$.ajax({
			type: "GET",
			url: myApi,
			success: function (data) {
				if(data.success){
					// Retrieve albums number and compare with the select
					var albumNumber = data.response.length;
					for (var i = 0; i < albumNumber; i++){
						var thisAlbum = data.response[i];
						if (thisAlbum.genre.toLowerCase() == currentGenre){
							fillAlbum(thisAlbum);
						}
					}
				}
			},
			error: function(){
				console.log('Cannot retrieve the API');
			}
		});	
	});

/************ 
* Functions
************/

// Print a card accordingly to retrieved data
function fillAlbum(thisAlbum){
	var pushAlbum = {
		cdCard : 'cd',
		cdThumbnail : thisAlbum.poster,
		cdTitle : thisAlbum.title,
		cdAuthor : thisAlbum.author,
		cdYear : thisAlbum.year
	};
	var output = template(pushAlbum);
	cdArea.append(output);
}


}); //END of DOC READY