let img;
let dvd;
let ballArr = new Array();
let maxBallSpeed = 5;
let maxBallSize = 40;

function preload() {
	img = loadImage("images/dvd-logo.png");
}

function setup() {
	createCanvas(800, 800);
	let resizeRatio = 3.5;
	// Always keep the same ratio
	maxBallSize = (maxBallSize / 800) * width;

	img.resize(
		width / resizeRatio,
		((img.height / img.width) * height) / resizeRatio
	);
	invertColors(img);
	colorMode(HSB, 360, 100, 100);
	dvd = new logo(
		random(width),
		random(height),
		1,
		1,
		img.width,
		img.height,
		random(360)
	);
}

//15:46

function draw() {
	background(0);
	// The logo is just a unique version of the object class that has an image
	tint(dvd.color, 100, 100);
	image(img, dvd.x, dvd.y, dvd.width, dvd.height);
	dvd.move();
	dvd.borderCollision();
	dvd.progressColor();

	// Go through all the bouncing objects and step them
	for (let i = 0; i < ballArr.length; i++) {
		ballArr[i].move();
		ballArr[i].borderCollision();
		ballArr[i].progressColor();
		fill(ballArr[i].color, 100, 100);
		ellipse(ballArr[i].x, ballArr[i].y, ballArr[i].width);
	}
}

function mouseClicked() {
	// Initialises a new bouncing object with random stats
	ballArr.push(
		new logo(
			mouseX,
			mouseY,
			random(-maxBallSpeed, maxBallSpeed),
			random(-maxBallSpeed, maxBallSpeed),
			random(10, maxBallSize),
			random(10, maxBallSize),
			random(360)
		)
	);
	// prevent default
	return false;
}

// Class that makes a bouncing object
class logo {
	// Class name should be updated to reflect it making balls too

	constructor(x, y, xSpeed, ySpeed, width, height, color) {
		this.x = x;
		this.y = y;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	move() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	borderCollision() {
		// Detect walls and change direction
		if (this.x + this.width >= width) {
			this.x = width - this.width;
			this.xSpeed *= -1;
		}
		if (this.y + this.height >= height) {
			this.y = height - this.height;
			this.ySpeed *= -1;
		}
		if (this.x <= 0) {
			this.x = 0;
			this.xSpeed *= -1;
		}
		if (this.y <= 0) {
			this.y = 0;
			this.ySpeed *= -1;
		}
	}

	progressColor() {
		this.color = (this.color + 1) % 360;
	}
}

function invertColors(image) {
	// Load the pixels
	image.loadPixels();

	// Loop through the pixels X and Y
	for (let y = 0; y < image.height; y++) {
		for (let x = 0; x < image.width; x++) {
			// Calculate the pixel index
			const index = (y * image.width + x) * 4;

			// Get the red, green, and blue values
			const r = image.pixels[index + 0];
			const g = image.pixels[index + 1];
			const b = image.pixels[index + 2];

			// Invert the colors
			image.pixels[index + 0] = 255 - r;
			image.pixels[index + 1] = 255 - g;
			image.pixels[index + 2] = 255 - b;
		}
	}

	// We're finished working with pixels so update them
	image.updatePixels();
}
