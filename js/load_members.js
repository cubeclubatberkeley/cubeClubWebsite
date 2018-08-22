$(document).ready(function() {
    $.ajax({
       type: "GET",
       url: "Cube Club Members Poll.csv",
       dataType: "text",
       success: function(data) {make_cards(read_csv(data));}
    });
});

function read_csv(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = {};
            for (var j=0; j<headers.length; j++) {
                tarr[headers[j]] = data[j];
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
	return lines;
}

function make_cards(cards) {
	console.log(cards);
	image_row = $('#images-row');
	for (var card in cards) {
		card = cards[card];
		image_row.append('<div class="card-ind col-sm-6 col-md-4 col-lg-2"><div class="card"><div class="card-body"><img class="card-img-top" src="img/members/' + 
			card['\"Any image of you (make it appropriate)\"'].match("\"(.+)\"")[1] + '" data-toggle="tooltip" data-placement="left" data-selector="true" title="' + 
			'Graduating: ' + card['\"Short Introduction (Year/Graduated Year'].match("\"(.+)")[1] + 
			', Major:' + card[' major'] + 
			', Favorite Puzzle/Interesting Fact:' + card[' favorite puzzle)\"'].match("(.+)\"")[1] + '"><h5 class="card-title">' + 
			card['\"Full Name\"'].match("\"(.+)\"")[1] + '</h5><p class="card-text">WCAID: <a href="https://www.worldcubeassociation.org/persons/' + 
			card['\"WCAID (ex. 2013SING12)\"'].match("\"(.+)\"")[1] + '">' + card['\"WCAID (ex. 2013SING12)\"'].match("\"(.+)\"")[1] + '</a></p></div></div></div>');
	}
    $('[data-toggle="tooltip"]').tooltip(); 
}