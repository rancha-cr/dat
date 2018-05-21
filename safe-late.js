//Instead of lines, draw poles of stacked images. Images match searchwords
//[cleaning, cooking, caring, supporting, mothering, receivingj];

//
var r, g, b, unpaid, place, gig, placeRe, gigRe;
let country = [], sex = [], value = [], men = [], women = [];
let inc = 0.01;

//
function preload() {
	unpaid  = loadTable("unpaid-hours-gender.csv", "header");
	// place = loadImage("kyp.jpg");
	// placeRe = loadImage("kyp-2.png");
	// gig = loadImage("gig.jpg");
	// gigRe = loadImage("gig-2.png");
}

function setup() {
	createCanvas(900,675);
	frameRate(3);
	pickColor('r');

	place = createVideo('vid-5.mov');
	place.hide();
	var home = createVideo('vid-2.mov');
	home.hide();
	home.size(80,80);
	var rowCount = unpaid.getRowCount();

	for (var i = 0; i < unpaid.getRowCount(); i++) {
		country[i] = unpaid.get(i, 1);
		sex[i] = unpaid.get(i, 4);
		value[i] = unpaid.get(i, 16);
		if (sex[i] == "MEN") {
			men[i] = unpaid.get(i, 16);
		} else women[i] = unpaid.get(i, 16);

		// console.log(country[i], sex[i], men[i], women[i]);
	}
}

function draw() {
	background(255);
	noFill();
	let xoff = 0;
	let yoff = 1;
	let zoff = 0;

	// loadPixels();
	place.loadPixels();

	for (var i = 0; i < country.length; i++) {
		pickColor(r);
		stroke(r, g, b);
		strokeWeight(2);
		let q = map(men[i], 0, 750, 0, 255);
		let p = map(women[i], 0, 750, 0, 255);
		let s = map(men[i], 0, 750, height - 255, 0);
		let t = map(women[i], 0, 750, 0, height - 255);
		let u = width / unpaid.getRowCount() + 20;
		let v = map(women[i], 0, 1000, 0, width);
		let w = map(men[i], 0, 1000, width, 0);
		let f = 0;

		// image(place, u * i, 0, u * i, s);
		// line(u * i, 0, u * i, s);
		pickColor(g);
		stroke(r, g, b);
		fill(177);
		// line(u * i, height, u * i, t);

		for (var i = 0; i < country.length; i += inc) {
			scale(noise(xoff, yoff) * 50);
			image(place, u * i, 0, u * i, s) * i;
			line(0, i*3, v, i*3);
			strokeWeight(10);
			line(width, i*3, w, i*3);
			let colval = noise(xoff, yoff) * 255;
			let pixval = noise(xoff, yoff) * pixels.length;
			u += inc;
			s += inc;

			if (place.pixels[Math.floor(value[f]) < q]) {
				place.pixels[Math.floor(value[f]+(i*10)) + 0] = colval;
				place.pixels[Math.floor(value[f]+(i*10)) + 1] = colval;
				place.pixels[Math.floor(value[f]+(i*10)) + 2] = colval;
				place.pixels[Math.floor(value[f]+(i+10)) + 3] = colval;
			} else if (place.pixels[Math.floor(value[f]) + 1 < p]) {
				place.pixels[Math.floor(value[f]) + 0] = 255;
				place.pixels[Math.floor(value[f]) + 1] = 255;
				place.pixels[Math.floor(value[f]) + 2] = 255;
				place.pixels[Math.floor(value[f]) + 3] = 255;
			}
			f++;
			xoff += 0.5;
		}
		yoff += inc;

		place.updatePixels();
		// updatePixels();
		// for (var i = 0; i < sex.length; i++) {
		// 	let f = women[i];
		// 	scale(map(f, 0, 600, 0.0, 2.0);
		// 	image(placeRe, u * i, 0, u * i, s) * i;
		// }

		// for (var i = 0; i < women.length; i++) {
		// 	let f = women[i];
		// 	image(gigRe, width, height, g, height/3, 100);
		// 	image(gigRe, f, s, f, height);
		// }
	}


	// noFill();
	// stroke(0);
	// beginShape();
	// for (var i = 0; i < dat.length; i++) {
	// 	var x = map(i, 0, dat.length01, 20, width);
	// 	var y = map(dat[i], 0, 60, height, 20);
	// 	vertex(x, y);
	// }
	// endShape();

	// console.log(frameRate());
}

function pickColor(signal) {
	r = random(60) + 100;
	g = random(60) + 100;
	b = random(60) + 100;

	if (signal == 'r') {
		r = random(15);
	} else if (signal == 'g') {
		g = random(15);
	} else if (signal == 'b') {
		b = random(15);
	}
}

function mousePressed() {
	place.loop();
}