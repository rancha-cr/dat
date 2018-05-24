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

	place = createVideo('assets/tr4.mov');
	place.hide();
	kem = createVideo('assets/ff4.mov');
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
	//filter(BLUR, 3);
	let xoff = 0;
	let yoff = 1;
	let zoff = 0;
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

	image(kem, 0, 0, width, height);

	blend(place, 0, 0, place.width, place.height, 0, 0, width, height, DARKEST);
}

function mousePressed() {
	place.loop();
	kem.loop();
}
