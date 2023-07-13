const fs = require('fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");
//  This imports the fs, inquirer, Circle, Square, and Triangle modules.
// Lets defines a Svg class that will have a constructor with three methods for rendering and setting the text and shape elements in the SVG string.

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200"> ${this.shapeElement}${this.textElement} </svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}"> ${text} </text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
}

// Lets defines an array of 'questions' using the 'inquirer' library.
const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to (3) Characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which Pixel Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// This Function will write data to file
function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("An SVG logo has been successfully generated!!!");
    });
}
async function init() {
    console.log("Starting init");
	var svgString = "";
	var svg_file = "logo.svg";

    // This will prompt the user for answers..
    const answers = await inquirer.prompt(questions);

	// this is the user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// the  valid entry is 1-3 chars
		user_text = answers.text;
	} else {
		// This invalid entry is 0 or 4+ chars
		console.log("Invalid user text. please enter 3 chracters!!");
        return;
	}
	console.log("users text: [" + user_text + "]");
	//this is the font color
	user_font_color = answers["text-color"];
	console.log("users font color: [" + user_font_color + "]");
	//this is the  shape color
	user_shape_color = answers.shape;
	console.log("users shape color: [" + user_shape_color + "]");
	//this is the  shape type
	user_shape_type = answers["pixel-image"];
	console.log("user enter a shape = [" + user_shape_type + "]");
	
	//this is the user shape
	let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
		console.log("A Square shape has been selescted");
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("A Circle shape has been selected !!");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("A Triangle shape has been selected!!");
	}
	else {
		console.log("Invalid shape!");
	}
	user_shape.setColor(user_shape_color);

	// This will Create a new Svg logo and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	
	// this will printout the shape of the  log
	console.log("Display shape:\n\n" + svgString);
	console.log("Shape generating has been complete!");
	console.log("Writing shape to file!!!");
	writeToFile(svg_file, svgString); 
}
init();
