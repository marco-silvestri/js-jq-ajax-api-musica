$(document).ready(function() {
	
	// Handlebars refs
	var source = $('#cd-template').html();
	var template = Handlebars.compile(source);

	// jQuery refs
	var cdArea = $('.cds-container');
	var cdCard =$('.cd');

	// Init
	var myApi = "https://flynn.boolean.careers/exercises/api/array/music";

	// Ajax on-load
	$.ajax({
		type: "GET",
		url: myApi,
		success: function (data) {
			if(data.success){
				// Retrieve albums number and print a card accordingly to its data
				var albumNumber = data.response.length;
				for (var i = 0; i < albumNumber; i++){
					var thisAlbum = data.response[i];
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
			}
		}
	});


}); //END of DOC READY