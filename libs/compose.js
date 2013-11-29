// Compose.js a library for acrostics, mesostics, diastics

// The library has been written to generalise the production of mesostics
// Through the process of creating this library I want to explore the nature of writing code
// and authorship. That is, parts of my final work will include this library but also other libraries
// it will additional include techniques such as Mac Low's, Cage's and Jones's for creating
// poems.

// How then is language, as spoken, performative in this context? What does performative language
// have to do with this act of making? What does assembling predetermined classes and methods
// have to do with the execution of the language. Is a performative language in context like
// a code library -- predetermined acts with rules. 

// Incorporate into the library as part of the functions or add utility library
// As an extension where should this occur? It has been copied from somewhere else
// and uses Math.
function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Compose the library
Compose = {};
// Compose.Mesostic a base class for mesostics

// Add error handling for problem data
// rename line to spine
Compose.Mesostic = function(textContent, spine) {
	this.spine = spine;
	this.textContent = textContent;
	this.structuredText = [];
	this.lineLength = 0;
	this.preserveLineBreaks = false;
	this.generateScaffold();
}
// regenerate scaffolding based on optional parameters (if any)
Compose.Mesostic.prototype.generateScaffold = function() {
	var text = this.textContent;
	var mesosticSpine = this.spine;
	var scaffold = [];
	var poeticLine = [];
	var currentIndex = 0;
	var newIndex = 0;
	var midIndex = 0;
	var lineLimit = this.lineLength;
	//check for line limits
	lineLimit = (lineLimit > 0) ? (lineLimit-1)/2 : 1000;
	//move to generate outside of constructor?
	for (i=0;i<mesosticSpine.length;i++) {
		newIndex = text.indexOf(mesosticSpine[i],currentIndex);
		if (newIndex == -1) break;
		if (currentIndex > 0) {
			midIndex = getRandomInt(currentIndex, newIndex);
			poeticLine.push(text.slice(currentIndex, midIndex));
			scaffold.push(poeticLine);
			poeticLine = [];
			poeticLine.push(text.slice(midIndex, newIndex));
			poeticLine.push(text[newIndex].toUpperCase());
		}
		else {
			poeticLine.push(text.slice(currentIndex, newIndex));
			poeticLine.push(text[newIndex].toUpperCase());
		}
		currentIndex = newIndex+1;
	}
	//push the rest of the content
	poeticLine.push(text.slice(currentIndex));
	scaffold.push(poeticLine);
	
	for (j=0; j<scaffold.length; j++) {
		if (scaffold[j][0].length>lineLimit) { 
			scaffold[j][0] = scaffold[j][0].slice(-lineLimit, scaffold[j][0].length);
		}
		if (scaffold[j][2].length>lineLimit) {
			scaffold[j][2] = scaffold[j][2].slice(0, lineLimit);
		}
	}

	this.structuredText = scaffold;
}

//innerHTML / text?
//todo: check string joins
Compose.Mesostic.prototype.mesosticTextHTML = function() {
	var rawMesostic = this.structuredText;
	var formattedMesostic = '';

	for (i=0; i<rawMesostic.length; i++) {
		// Substitute for object build instead of two separate functions?
		var leadText = '<div class="lead">' + rawMesostic[i][0] + '</div>\n';
		var tailText = '<div class="tail">' + rawMesostic[i][1] + rawMesostic[i][2] + '</div>\n';
		formattedMesostic += leadText + tailText;
	}
	return formattedMesostic;
}
Compose.Mesostic.prototype.mesosticNodeHTML = function() {
	var rawMesostic = this.structuredText;
	var rootNode = document.createElement("div");

	for (i=0; i<rawMesostic.length; i++) {
		var leadText = document.createTextNode(rawMesostic[i][0]);
		var tailText = document.createTextNode(rawMesostic[i][1] + rawMesostic[i][2]);
		var divLead = document.createElement("div");
		divLead.className = "lead";
		divLead.appendChild(leadText);
		var divTail = document.createElement("div");
		divTail.className = "tail";	
		divTail.appendChild(tailText);
		rootNode.appendChild(divLead);
		rootNode.appendChild(divTail);				
	}
	return rootNode;
}
//return plaintext block
Compose.Mesostic.prototype.mesosticPlainText = function() {
	//determine the longest line
	var longestLine = 0;
	var lines = [];
	var rawMesostic = this.structuredText;
	for (i=0; i<rawMesostic.length; i++) {
		if (longestLine < rawMesostic[i][0].length) longestLine = rawMesostic[i][0].length;
		if (longestLine < rawMesostic[i][2].length) longestLine = rawMesostic[i][2].length;
	}
	//pad out the lines
	for (j=0; j<rawMesostic.length; j++) {
		if (longestLine > rawMesostic[i][0].length) rawMesostic[i][0] = new Array(longestLine-rawMesostic[i][0].length).join(' ') + rawMesostic[i][0];
		if (longestLine > rawMesostic[i][2].length) rawMesostic[i][2] = rawMesostic[i][2] + new Array(longestLine-rawMesostic[i][2].length).join(' ');
	}

}
// Build DOM tree representation of the mesostic (only)
Compose.Mesostic.prototype.mesosticTree = function() {

}

// 100% -- neither letter between mesostic letter
//  50% -- only the previous letter occurs between letters
/*   0% -- the next letter occurs between letters
Mesostic.prototype.checkPurity = function() {

}
*/



// SlowMesostics inherits mesostic overrides formatting functions??
/* (after Patrick Jones)
Compose.SlowMesostic = function(textContent, spine, supChars, subChars) {
	Compose.Mesostic.call(this, textContent, spine);
	this.randomChars = false;
	this.readThrough = false;
	this.readThroughText = '';
	this.supChars = '';
	this.subChars = '';

	if ((typeof supChars === "undefined") && (typeof subChars === "undefined")) {
		// no supscript or subscript characters were selected so randomly transform the text
		this.randomChars = true;
	}
	else if (typeof subChars === "undefined") {
		// only a single set of characters were given so do a read through of that phrase
		this.readThroug = true;
		this.readThroughText = supChars;
	}
	else {
		// both superscript and subscript characters were given so set the characters
		this.supChars = supChars;
		this.subChars = subChars;
	}
}*/


