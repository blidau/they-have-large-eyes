// Constructor far too slow
TextApp = function()
{
	Sim.App.call(this);
}

// Subclass Sim.App
TextApp.prototype = new Sim.App();

// Our custom initializer
TextApp.prototype.init = function(param)
{
	// Call superclass init code to set up scene, renderer, default camera
	Sim.App.prototype.init.call(this, param);
	
	// Set up lighting
     
    var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
    this.scene.add( light );

	//var pointLight = new THREE.PointLight( 0xFFFFFF, 1 );
	//pointLight.position.set( 0, 0, 50 );
	//this.scene.add( pointLight );

	var spotLight1 = new THREE.SpotLight( 0x999999, 1 );
	spotLight1.position.set( 200, 300, 200 );
	this.scene.add( spotLight1 ); 

    var spotLight2 = new THREE.SpotLight( 0x999999, 1 );
    spotLight2.position.set( -200, 300, -200 );
    this.scene.add( spotLight2 ); 

    var spotLight3 = new THREE.SpotLight( 0x999999, 1 );
    spotLight3.position.set( 200, 300, -200 );
    this.scene.add( spotLight3 ); 

    var spotLight4 = new THREE.SpotLight( 0x999999, 1 );
    spotLight4.position.set( -200, 300, 200 );
    this.scene.add( spotLight4 ); 
		
	// Position/orient the camera
	this.camera.position.set(0, 11, 50);
    this.camera.eulerOrder = "YXZ";
	//this.camera.lookAt(new THREE.Vector3);
    this.textObjects = [];
    this.up = true;
	// Create our text and floor
	this.createShermanObjects();
    this.createLineObjects();
    //this.createShelleyObjects();
	this.createFloor();
    this.createDome();
    this.is_near = [false, false, false, false, false, false ];

	//this.scene.fog = new THREE.Fog( 0xffffff, 50 );
	// Other initialization
	this.mouseDown = false;
    this.counter = 0;
    this.debug = false;
    //watching elements
    if (this.debug) {
    this.xloc = document.getElementById("x-loc");
    this.yloc = document.getElementById("y-loc");
    this.zloc = document.getElementById("z-loc");
    this.xrot = document.getElementById("x-rot");
    this.yrot = document.getElementById("y-rot");
    this.zrot = document.getElementById("z-rot");

    this.xloc.innerHTML = this.camera.position.x;
    this.yloc.innerHTML = this.camera.position.y + "/" + this.counter;
    this.zloc.innerHTML = this.camera.position.z;
    this.xrot.innerHTML = this.camera.rotation.x;
    this.yrot.innerHTML = this.camera.rotation.y;
    this.zrot.innerHTML = this.camera.rotation.z;
    }
}

TextApp.prototype.createTextObjectNew = function(x, z, counter)
{
    var text = new TextObject();
    text.init('tramp, tramp');
    this.addObject(text);
    text.setPosition(x, 10, z); 
    this.textObjects[counter] = text;
}

TextApp.prototype.createLineObjects = function()
{   
    var lines = ['through forests of Panton Hill and Pheasant Creek', 'tramp,tramp', 'stalking, shooting, collecting', 'Away from Melbourne', 'The Plants and Animals of Jupiter', 'Sherman, aware he\'s a Yankee', 'Shelley pulled from school to paint the lecture slides'];
    var locs = [[0,-10],[0,-50],[0,-100],[0,-150],[0,-200],[0,-250],[0,-300]];

    for (i=0;i<7;i++) {
        var text = new TextObject();
        text.init(lines[i]);
        this.addObject(text);
        text.object3D.rotation.x = -Math.PI/3.5;
        text.setPosition(locs[i][0], 1, locs[i][1]); 
    }
}

TextApp.prototype.createShermanObjects = function()
{
    // Create the heading objects
    var text = new TextObject();
    /*text.init('They have large eyes and can see in all directions');
    this.addObject(text);
    text.setPosition(0, 150, 0);
    this.textHeading = text;*/

    //mesostic limit move to constants
    var MESOSTIC_LIMIT = 12;

    //load a text file or a json file -- data?
    //set to build based on the mesostics library
    //var sourceText = 'I have heard most of our American songsters, and some of them are very fine, with voices rich and mellow; but the mocking-bird himself cannot compare with this prince of songsters, the Australian lyre-bird.';    
    var sourceText = ['The next morning, leaving our luggage to come on in a cart, we started for a trip in the Plenty Ranges. The journey most of the way was up hill, but the road was good, the day fine, and we felt in harmony with our joyous surroundings.',
'Any one hearing our shouting and singing, as we walked along, would know we were from Yankee-land, no mistake.',
'We were just in the middle of "Tramp, tramp" when a long, clear whistle',
'with a crack like a pistol-shot at the end, stopped us short. Sitting down on the roadside we listened, and soon the whistle began again; then followed the most exquisite mimicry of many',
'of the songsters of the wood, varied by sounds resembling the clear tones',
'of a distant bell, the rattle of a rickety wagon, raspings and gratings that made the cold chills run down one\'s back,',
'whispers, moans cries, and laughter. I clearly distinguished the coarse laugh of the giant kingfisher, the cooing of the dove, the call of the black and white shrike, the song of the rusty-backed thrush, the scream of the hawk, and the hoarse screeching of the cockatoo.',
'Sometimes the song, with a volume like a large organ, was loud and sweet, and it seemed as if the musician must be within',
'a stone\'s-throw; then, again, it died away to the faintest whisper. There was a mellow richness in parts that reminded me of the liquid notes of the clarinet.',
'We sat spellbound till the song ceased. I have heard most of our American songsters',
'and some of them are very fine, with voices rich and mellow; but the mocking-bird himself cannot compare',
'with this prince of songsters the Australian lyre-bird (Menura Victoriae). This one was just below us in a gully thick with tree-ferns and scrub, and we did not get sight of him. As we walked on, the trees grew larger'];

    var offSets = [ 
    [ 100, 100 ],
    [ -100, -100 ],
    [ -100, 100 ],
    [ 100, -100 ],
    [ 200, 200 ],
    [ -200, -200 ],
    [ -200, 200 ],
    [ 200, -200 ],
    [ 300, 300 ],
    [ -300, -300 ],
    [ -300, 300 ],
    [ 300, -300 ]];

    var mesosticSpine = 'sherman';
    
    for (k=0; k<MESOSTIC_LIMIT; k++) {
        var mesosticObject = new Compose.Mesostic(sourceText[k], mesosticSpine);
        mesosticObject.lineLength = 24;
        mesosticObject.generateScaffold();
        var structuredMesostic = mesosticObject.structuredText;
        mesosticObject.generateScaffold();
        var ReStructuredMesostic = mesosticObject.structuredText;

        //var XOFFSET = getRandomInt(-200, 200);
        //var ZOFFSET = getRandomInt(-200, 200);
        var XOFFSET = offSets[k][0] + getRandomInt(-5, 5);
        var ZOFFSET = offSets[k][1] + getRandomInt(-5, 5);

        var ANGLE = -Math.PI/4;

        for (i=0;i<structuredMesostic.length;i++) {
            var yOffset = ((mesosticSpine.length - i) * 10) - 5;
            
            var spine = new TextObject();
            spine.init(structuredMesostic[i][1]);
            this.addObject(spine);
            spine.setPosition(XOFFSET, yOffset, ZOFFSET);
            //build left-hand side
            if (structuredMesostic[i][0].trim() != '') {
                var text = new TextObject();
                text.init(structuredMesostic[i][0]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + -(textOffsetLength * Math.cos(ANGLE));
                textZ = ZOFFSET + textOffsetLength * Math.sin(ANGLE);    
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = ANGLE;
            }
            //build right-hand side
            if (structuredMesostic[i][2].trim() != '') {
                var text = new TextObject();
                text.init(structuredMesostic[i][2]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + textOffsetLength * Math.cos(ANGLE);
                textZ = ZOFFSET + -(textOffsetLength * Math.sin(ANGLE));
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = ANGLE;
            }
            if (ReStructuredMesostic[i][0].trim() != '') {
                text = new TextObject();
                text.init(ReStructuredMesostic[i][0]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + -(textOffsetLength * Math.cos(-ANGLE));
                textZ = ZOFFSET + textOffsetLength * Math.sin(-ANGLE);    
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = -ANGLE;
                //this.leftText = text;
            }
            //build right-hand side
            if (ReStructuredMesostic[i][2].trim() != '') {
                var text = new TextObject();
                text.init(ReStructuredMesostic[i][2]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + textOffsetLength * Math.cos(-ANGLE);
                textZ = ZOFFSET + -(textOffsetLength * Math.sin(-ANGLE));
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = -ANGLE;
                //this.rightText = text;
            }      
        }
    }
}

TextApp.prototype.createShelleyObjects = function()
{
    // Create the heading objects
    var text = new TextObject();
    /*text.init('They have large eyes and can see in all directions');
    this.addObject(text);
    text.setPosition(0, 150, 0);
    this.textHeading = text;*/

    //mesostic limit move to constants
    var MESOSTIC_LIMIT = 12;

    //load a text file or a json file -- data?
    //set to build based on the mesostics library
    //var sourceText = 'I have heard most of our American songsters, and some of them are very fine, with voices rich and mellow; but the mocking-bird himself cannot compare with this prince of songsters, the Australian lyre-bird.';    
    var sourceText = ['The next morning, leaving our luggage to come on in a cart, we started for a trip in the Plenty Ranges. The journey most of the way was up hill, but the road was good, the day fine, and we felt in harmony with our joyous surroundings.',
'Any one hearing our shouting and singing, as we walked along, would know we were from Yankee-land, no mistake.',
'We were just in the middle of "Tramp, tramp" when a long, clear whistle',
'with a crack like a pistol-shot at the end, stopped us short. Sitting down on the roadside we listened, and soon the whistle began again; then followed the most exquisite mimicry of many',
'of the songsters of the wood, varied by sounds resembling the clear tones',
'of a distant bell, the rattle of a rickety wagon, raspings and gratings that made the cold chills run down one\'s back,',
'whispers, moans cries, and laughter. I clearly distinguished the coarse laugh of the giant kingfisher, the cooing of the dove, the call of the black and white shrike, the song of the rusty-backed thrush, the scream of the hawk, and the hoarse screeching of the cockatoo.',
'Sometimes the song, with a volume like a large organ, was loud and sweet, and it seemed as if the musician must be within',
'a stone\'s-throw; then, again, it died away to the faintest whisper. There was a mellow richness in parts that reminded me of the liquid notes of the clarinet.',
'We sat spellbound till the song ceased. I have heard most of our American songsters',
'and some of them are very fine, with voices rich and mellow; but the mocking-bird himself cannot compare',
'with this prince of songsters the Australian lyre-bird (Menura Victoriae). This one was just below us in a gully thick with tree-ferns and scrub, and we did not get sight of him. As we walked on, the trees grew larger'];

    var offSets = [ 
    [ 0, -450 ],
    [ 0, -950 ],
    [ 0, 450 ],
    [ 450, -450 ],
    [ 450, 0 ],
    [ 450, 450 ],
    [ -450, -450 ],
    [ -450, 0 ],
    [ -450, 450 ],
    [ 0, 600 ],
    [ 0, -600 ],
    [ 600, 0 ]];

    var mesosticSpine = 'sherman';
    
    for (k=0; k<MESOSTIC_LIMIT; k++) {
        var mesosticObject = new Compose.Mesostic(sourceText[k], mesosticSpine);
        mesosticObject.lineLength = 24;
        mesosticObject.generateScaffold();
        var structuredMesostic = mesosticObject.structuredText;
        mesosticObject.generateScaffold();
        var ReStructuredMesostic = mesosticObject.structuredText;

        //var XOFFSET = getRandomInt(-200, 200);
        //var ZOFFSET = getRandomInt(-200, 200);
        var XOFFSET = offSets[k][0] + getRandomInt(-5, 5);
        var ZOFFSET = offSets[k][1] + getRandomInt(-5, 5);

        var ANGLE = -Math.PI/4;

        for (i=0;i<structuredMesostic.length;i++) {
            var yOffset = (mesosticSpine.length - i) * 10;
            
            var spine = new TextObject();
            spine.init(structuredMesostic[i][1]);
            this.addObject(spine);
            spine.setPosition(XOFFSET, yOffset, ZOFFSET);
            //this.spine = spine;
            //build left-hand side
            if (structuredMesostic[i][0].trim() != '') {
                var text = new TextObject();
                text.init(structuredMesostic[i][0]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + -(textOffsetLength * Math.cos(ANGLE));
                textZ = ZOFFSET + textOffsetLength * Math.sin(ANGLE);    
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = ANGLE;
                //this.leftText = text;
            }
            //build right-hand side
            if (structuredMesostic[i][2].trim() != '') {
                var text = new TextObject();
                text.init(structuredMesostic[i][2]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + textOffsetLength * Math.cos(ANGLE);
                textZ = ZOFFSET + -(textOffsetLength * Math.sin(ANGLE));
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = ANGLE;
                //this.rightText = text;
            }
            if (ReStructuredMesostic[i][0].trim() != '') {
                text = new TextObject();
                text.init(ReStructuredMesostic[i][0]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + -(textOffsetLength * Math.cos(-ANGLE));
                textZ = ZOFFSET + textOffsetLength * Math.sin(-ANGLE);    
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = -ANGLE;
                //this.leftText = text;
            }
            //build right-hand side
            if (ReStructuredMesostic[i][2].trim() != '') {
                var text = new TextObject();
                text.init(ReStructuredMesostic[i][2]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + textOffsetLength * Math.cos(-ANGLE);
                textZ = ZOFFSET + -(textOffsetLength * Math.sin(-ANGLE));
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = -ANGLE;
                //this.rightText = text;
            }        
        }
    }
}

TextApp.prototype.createFloor = function()
{
    //var mapURL = "/treetext/imgs/15.jpg";
    //var map = THREE.ImageUtils.loadTexture(mapURL);

    var grassTexture = THREE.ImageUtils.loadTexture( '/treetext/imgs/new_tile.png' );
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set( 200, 200 );
    var grassMaterial = new THREE.MeshBasicMaterial( { map: grassTexture, color: 0xFFFFFF, side: THREE.BackSide } );

	//var plane = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 3000 ), new THREE.MeshPhongMaterial( { color: 0x4F7404, specular:0xff0000, shininess:100, opacity: 1, transparent: false, map : map, overdraw: true, combine: THREE.MultiplyOperation } ) );
    var plane = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000 ), grassMaterial );
	plane.rotation.x = -Math.PI/2;
	plane.position.z = 3;
	this.scene.add( plane );
}

TextApp.prototype.createDome = function()
{
    var grassTexture = THREE.ImageUtils.loadTexture( '/treetext/imgs/sphere-tile.jpg' );
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set( 8, 8 );

    var grassMaterial = new THREE.MeshBasicMaterial( { map: grassTexture, color: 0xFFFFFF, side: THREE.DoubleSide } );
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(5000, 100, 100), grassMaterial);
    sphere.doubleSided = true;
    //sphere.overdraw = true;
    sphere.position.set(0, 0, 0);
    this.scene.add(sphere);
}

TextApp.prototype.update = function()
{
	//this.root.rotation.z += 0.005;
	//this.root.rotation.y += 0.005;
    if (this.camera.position.z == -70) {
        this.is_near = true;
    }
    //if ((this.camera.position.x % 100 < 2) && (this.camera.position.z % 100 < 2)) {
    //    this.createTextObjectNew(this.camera.position.x, this.camera.position.z, this.counter);
    //    if (this.counter > 0) {
    //        this.removeObject(this.textObjects[this.counter-1]);
    //        this.textObjects[this.counter-1] = null;
    //    }
    //    this.counter++;
    //}
    //if (((this.camera.position.x%100) == 0) && ((this.camera.position.z%100) == 0))) {
     //   this.createTextObjectNew(this.camera.position.x, this.camera.position.z);
    //}

    //if (this.up && this.is_near) {
    //    this.textObjects[0].object3D.position.y += 0.05;
    //    this.textObjects[1].object3D.position.y += 0.05;
    //    this.textObjects[2].object3D.position.y += 0.05;
    //    this.textObjects[3].object3D.position.y += 0.05;
    //    this.textObjects[4].object3D.position.y += 0.05;
    //    if (this.textObjects[4].object3D.position.y >0) {
    //        this.up = false;
    //    }
    //} else if (!this.up && this.is_near){
    //    //this.removeObject(this.textObjects[0]);
    //    //this.removeObject(this.textObjects[1]);
    //    //this.removeObject(this.textObjects[2]);
    //    //this.removeObject(this.textObjects[3]);
    //    //this.removeObject(this.textObjects[4]);
    //}
    if (this.debug) {
        this.xloc.innerHTML = this.camera.position.x;
        this.yloc.innerHTML = this.camera.position.y + "/" + this.counter;
        this.zloc.innerHTML = this.camera.position.z;
        this.xrot.innerHTML = this.camera.rotation.x;
        this.yrot.innerHTML = this.camera.rotation.y;
        this.zrot.innerHTML = this.camera.rotation.z;
    }
}

TextApp.prototype.handleMouseScroll = function(delta)
{
	var deltah = delta*2;

	this.camera.position.z -= deltah*Math.cos(this.camera.rotation.y);	
    this.camera.position.x -= deltah*Math.sin(this.camera.rotation.y);  
    
}

TextApp.prototype.handleMouseDown = function(x, y, point, normal)
{
	this.mouseDown = true;
	this.lastx = x, this.lasty = y;
}

TextApp.prototype.handleMouseUp = function(x, y, point, normal)
{
	this.mouseDown = false;
}

TextApp.prototype.handleMouseMove = function(x, y, point, normal)
{
	if (this.mouseDown)
	{
		var dx = (x - this.lastx) * .004;
        var dy = (y - this.lasty) * .004;
		//this.root.rotation.y += dx;
		var cdx = (x - this.lastx)
		this.lastx = x;
        this.lasty = y;

        this.camera.rotation.y += dx;
        this.camera.rotation.x += dy;  

	}
}

TextApp.TEXT_DEPTH = 2;
TextApp.TEXT_SIZE = 8;
TextApp.HOVER = 1;

//Custom Model class
TextObject = function()
{
	Sim.Object.call(this);
}

TextObject.prototype = new Sim.Object();

TextObject.prototype.init = function(str)
{
    // Create a group to contain text
    var textGroup = new THREE.Object3D();
    this.textWidth = 0;
    // Tell the framework about our object
    this.setObject3D(textGroup);
    this.str = str;
    this.createTextMesh();
    
}

TextObject.prototype.createTextMesh = function()
{
	var textMesh, textGeo, faceMaterial, textMaterialFront, textMaterialSide;

	var text = this.str;
	var height = TextApp.TEXT_DEPTH; // depth means height here
	var size = TextApp.TEXT_SIZE;

	var font = "helvetiker";
	var weight = "bold"; //change to bold
	var style = "normal";

	var faceMaterial = new THREE.MeshFaceMaterial();
	var textMaterialFront = new THREE.MeshPhongMaterial( 
			{ color: 0x333333, shading: THREE.FlatShading } );

	var textGeometry = new THREE.TextGeometry( text, 
			{ size: size, height: height, font: font, weight: weight, style: style,

		material: 0,
		extrudeMaterial: 0
	});

	textGeometry.materials = [ textMaterialFront ];

	textGeometry.computeBoundingBox();
	textGeometry.computeVertexNormals();

	textMesh = new THREE.Mesh( textGeometry, faceMaterial );
	var centerOffset = -0.5 * ( textGeometry.boundingBox.x[ 1 ] - textGeometry.boundingBox.x[ 0 ] );
	this.textWidth = ( textGeometry.boundingBox.x[ 1 ] - textGeometry.boundingBox.x[ 0 ] );
	textMesh.position.x = centerOffset;
	this.object3D.add(textMesh);
	this.mesh = textMesh;
}

TextObject.prototype.update = function()
{
	Sim.Object.prototype.update.call(this);
}
