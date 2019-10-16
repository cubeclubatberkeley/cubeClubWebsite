// much inspiration taken from Uma Unni's timer (umaunni3.github.io/timer)
// congrats uma you're famous now!! :D

$(document).ready(function(){
	console.log('hello manu knows how to do things stilll');
	sp = $('#scramble-sequence');
	time = $('#time');
	timing = false;
	start = new Date($.now());
	ctrldown = false;
	curr_scramble = '';

	prev_times = [];

	Cube.initSolver();
	c = new Cube();
	rescramble();

	$('body').keyup(function(e) {
		if (e.keyCode == 32) {
			if (timing) {
				end = new Date($.now());
				disp_time = new Date();
				disp_time.setTime(end.getTime() - start.getTime());

				display = disp_time.getMinutes() > 0 ? disp_time.getMinutes() + ":" : "";
				display += disp_time.getSeconds() < 10 && disp_time.getMinutes() > 0 ? "0" : "";
				display += disp_time.getSeconds() + "." + disp_time.getMilliseconds();

				time.html('<h2>' + display + '</h2>');
				rescramble();
				prev_times.push({display, curr_scramble});
				display_times();
			} else {
				start = new Date($.now());
				time.html('<h2>Solve</h2>');
			}
			timing = !timing;
			time.css('color', 'black');
		}
		if (e.keyCode == 17) {
			ctrldown = false;
		}
	});

	$('body').keydown(function (e) {
		if (e.keyCode == 17) {
			ctrldown = true;
		}
		if (e.keyCode == 39) {
			if (!timing)
				rescramble();
		}
		if (e.keyCode == 32) {
			if (!timing) {
				time.css('color', 'green');
			}
		}
	})
});

function rescramble() {
	c.randomize();
	curr_scramble = Cube.inverse(c.solve());
	sp.html('<h3>' + curr_scramble + '</h3>');
}

function display_times() {
	table = $('#t');
	table.prepend('<tr><td><h3>' + prev_times[prev_times.length-1].display + '</h3></td></tr>')
}