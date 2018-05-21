//Instead of lines, draw poles of stacked images. Images match searchwords

// Variables
var r, g, b, unpaid, place, gig, placeRe, gigRe;
let country = [], sex = [], value = [], men = [], women = [];
let inc = 0.01;

// Main
function preload() {
	unpaid  = loadTable("unpaid-hours-gender.csv", "header");
}

function setup() {
	// createCanvas(0, 0);
	createCanvas(350,200);
	frameRate(25);

	place = createVideo('vid-3.mov');
	place.hide();
	var rowCount = unpaid.getRowCount();
	let xoff = 0;
	let yoff = 10;

	// Load arrays for data
	for (let i = 0; i < unpaid.getRowCount(); i++) {
		country[i] = unpaid.get(i, 1);
		sex[i] = unpaid.get(i, 4);
		value[i] = unpaid.get(i, 16);
		if (sex[i] == "MEN") {
			men[i] = unpaid.get(i, 16);
		} else women[i] = unpaid.get(i, 16);

		// console.log(country[i], sex[i], men[i], women[i]);

		// Create video matrix
		for (let y = 0; y < width; y+=8) {
			for (let x = 0; x < height; x+=8) {
				let matrixCt = 0;
				let noisval = noise(xoff);
				let index = ((y*width)+x)*4;
				let a = map(men[i], 0, 1000, 0, width);
				let b = map(women[i], 0, 1000, width, 0);
		
				place.size(x, y);
				place.size(32, 32);
				image(place, x, y);

				xoff += inc;
			}
			yoff += inc;
		}
	}
}

// function draw() {
// 	// background(255);
// 	// noFill();
// 	fill(60);
// 	stroke(10);
// 	strokeWeight(10);
// }

// 	for (var i = 0; i < country.length; i++) {
// 		pickColor(r);
// 		stroke(r, g, b);
// 		strokeWeight(2);
// 		let q = map(men[i], 0, 750, 0, 255);
// 		let p = map(women[i], 0, 750, 0, 255);
// 		let s = map(men[i], 0, 750, height - 255, 0);
// 		let t = map(women[i], 0, 750, 0, height - 255);
// 		let u = width / unpaid.getRowCount() + 20;
// 		let f = 0;

// 		pickColor(g);
// 		stroke(r, g, b);
// 		fill(177);

// 		for (var i = 0; i < country.length; i += inc) {
// 			scale(noise(xoff, yoff) * 50);
// 			image(place, u * i, 0, u * i, s) * i;
// 			let colval = noise(xoff, yoff) * 255;
// 			u += inc;
// 			s += inc;

// 			if (place.pixels[Math.floor(value[f]) < q]) {
// 				place.pixels[Math.floor(value[f]) + 0] = colval;
// 				place.pixels[Math.floor(value[f]) + 1] = colval;
// 				place.pixels[Math.floor(value[f]) + 2] = colval;
// 				place.pixels[Math.floor(value[f]) + 3] = colval;
// 			} else if (place.pixels[Math.floor(value[f]) + 1 < p]) {
// 				place.pixels[Math.floor(value[f]) + 0] = 255;
// 				place.pixels[Math.floor(value[f]) + 1] = 255;
// 				place.pixels[Math.floor(value[f]) + 2] = 255;
// 				place.pixels[Math.floor(value[f]) + 3] = 255;
// 			}
// 			f++;
// 			xoff += 0.5;
// 		}
// 		yoff += inc;
// 		place.updatePixels();
// 	}

function mousePressed() {
	place.loop();
}