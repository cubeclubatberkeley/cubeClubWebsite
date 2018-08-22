$(document).ready(function() {
	make_cards(read_csv());
});

function read_csv() {
	return [];
}

function make_cards(cards) {
	image_row = $('.images-row');
	for (card of cards) {
		image_row.append('<div class="col-sm-6 col-md-4 col-lg-2 member-card"><div class="card mb3 rescard"><div class="card-body"><img class="member-picture" src="img/members/' + card[picture_name] + '"><div class="caption"><a href="https://www.worldcubeassociation.org/persons/' + card[id] + '>' + card[name] + '</a></div></div></div></div>');
	}
}