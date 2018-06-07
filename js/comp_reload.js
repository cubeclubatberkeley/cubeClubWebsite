$(document).ready(function(){
	reload_comps();
});

function reload_comps() {
	var url = "https://www.worldcubeassociation.org/competitions?utf8=%E2%9C%93&region=USA&search=California";
	var url2 = "https://allorigins.me/get?url=" + encodeURIComponent(url) + "&callback=?";
	jQuery.getJSON(url2, function(response) { make_comps_table(create_comps_obj(response.contents))});

}

function create_comps_obj(response) {
	// console.log(response);
	var num = response.match(/<strong>Upcoming competitions \((\d*)\)<\/strong>/);
	response = response.substring(num['index'] + 1);

	var comps = [];
	var i = 0;
	while(i < num[1]){
		var dates = response.match(/<\/i>\n\s*(.*)/);
		var name = response.match(/<span class=\"competition-info\">\n.*\n.*\n.*\>(.*)\</);
		var location = response.match(/<strong>United States<\/strong>, (.*)\n/);
		var link = response.match(/<div class="competition-link">\n.*\n.*<a href=\"(.*)\"/);
		response = response.substring(location['index'] + 3);
		comps.push({'dates': dates[1], 'name': name[1], 'location': location[1], 'link': "www.worldcubeassociation.com" + link[1]});
		i = i + 1;
	}
	return comps;
}

function make_comps_table(comp_obj){
	table = $('table');
	console.log(comp_obj);

	if(comp_obj.length != 0) {
		comp_num = 0;
		table.append("<thead><tr><th>Competition Name</th><th>Dates</th><th>Location</th></tr></thead>");
		table.append("<tbody>");
		while(comp_num < comp_obj.length) {
			table.append("<tr><td><a href=\"" + comp_obj[comp_num].link + "\">" + comp_obj[comp_num].name + "</a></td><td>" + comp_obj[comp_num].dates + "</td><td>" + comp_obj[comp_num].location + "</td></tr>")
			comp_num = comp_num + 1;
		}
		table.append("</tbody>")
	}
}