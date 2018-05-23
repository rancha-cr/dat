// Instead of lines, draw poles of stacked images. Images match searchwords

//
var r, g, b, unpaid, place, gig, placeRe, gigRe, home;
let country = [], sex = [], value = [], men = [], women = [];
let inc = 0.01;

//
function preload() {
	unpaid  = loadTable("/assets/unpaid-hours-gender.csv", "header");
	// place = loadImage("assets/kyp.jpg");
	// placeRe = loadImage("assets/kyp-2.png");
	// gig = loadImage("assets/gig.jpg");
	// gigRe = loadImage("assets/gig-2.png");
}

function setup() {
	createCanvas(900, 675);
	frameRate(3);

	place = createVideo('assets/vid-5.mov');
	place.hide();
	home = createVideo('assets/vid-2.mov');
	home.hide();
	home.size(16, 16);
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
	let xoff = 0;
	let yoff = 1;
	let zoff = 0;

	// loadPixels();
	place.loadPixels();

	for (var y = 0; y < height; y += 24) {
		for (var x = 0; x < width; x += 24) {
			image(place, x, y);
		}
	}

	for (var i = 0; i < country.length; i++) {
		let hor = 16 * i;
		let ver = (width/country.length) * i;
		stroke(random(64), 127, random(127), 127);
		line(0, ver, men[i], ver); 
		stroke(127, random(64), random(127), 127);
		line(width, ver, width - women[i], ver);
	}
}

function mousePressed() {
	place.loop();
	home.loop();
}
