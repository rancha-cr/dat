// Instead of lines, draw poles of stacked images. Images match searchwords

//
var r, g, b, unpaid, place, gig, placeRe, gigRe, home, kem;
let country = [], sex = [], value = [], men = [], women = [];
let inc = 0.01;

//
function preload() {
	unpaid  = loadTable("/assets/unpaid-hours-gender.csv", "header");
	gig = loadImage('assets/img-11.jpg');
}

function setup() {
	createCanvas(900, 675);
	frameRate(30);

	place = createVideo('assets/vid-0.mov');
	place.hide();
	home = createVideo('assets/vid-2.mov');
	home.hide();
	home.size(16, 16);
	kem = createVideo('assets/lp-3.mov');
	kem.hide();
	var rowCount = unpaid.getRowCount();

	for (var i = 0; i < unpaid.getRowCount(); i++) {
		country[i] = unpaid.get(i, 1);
		sex[i] = unpaid.get(i, 4);
		value[i] = unpaid.get(i, 16);
		if (sex[i] == "MEN") {
			men[i] = unpaid.get(i, 16);
		} else women[i] = unpaid.get(i, 16);
	}
}

function draw() {
	background(255);
	strokeCap(SQUARE);
	strokeWeight(2);
	//filter(BLUR, 3);
	let xoff = 0;
	let yoff = 1;
	let zoff = 0;
	let rand = random(3);
	let masc = men.reduce(function(a, b) {
		return Math.max(a, b);
	});
	let fem = women.reduce(function(a, b) {
		return Math.max(a, b);
	});

	//loadPixels();
	//place.loadPixels();

	//for (var y = 0; y < height; y += 127) {
	//	for (var x = 0; x < width; x += random(16)) {
			//if (x % 2 == 0){
			//	filter(GRAY);
			//} else if (x % 4 == 0) {
			//	filter(INVERT);
			//} else if (x % 3 == 0) {
			//	filter(ERODE);
			//}
	//		image(place, x, y);
	//	}
	//}

	image(kem, 0, 0);

	for (var i = 0; i < country.length; i++) {
		let hor = (width/country.length) * i;
		let ver = (height/country.length) * i;
		let him = map(value[i-1], 0, masc, 0, width);
		let her = map(value[i], 0, fem, 0, height);
		//stroke(random(64), 127, random(127), 127);
		//line(0, ver, men[i], ver);
		//copy(width/3, height/3, 24, 24, 0, ver, men[i], 4);
		//stroke(127, random(64), random(127), 127);
		//line(width, ver, width - women[i], ver);
		//copy(width/5, height/5, 24, 24, women[i], ver, width, 4);
		
		blend(gig, 0, 0, 256, 256, 0, 0, width, height, DIFFERENCE);
	}
}

function mousePressed() {
	place.loop();
	home.loop();
	kem.loop();
}
