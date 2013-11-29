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

	var pointLight = new THREE.PointLight( 0xFFFFFF, 1 );
	pointLight.position.set( 0, 0, 50 );
	this.scene.add( pointLight );

	var spotLight = new THREE.SpotLight( 0x999999, 1 );
	spotLight.position.set( 200, 500, 200 );
	this.scene.add( spotLight ); 
		
	// Position/orient the camera
	this.camera.position.set(0, 11, 40);
	//this.camera.lookAt(new THREE.Vector3);

	// Create our text and floor
	this.createTextObjects();
	this.createFloor();
	
	// Other initialization
	this.mouseDown = false;
}

TextApp.prototype.createTextObjects = function()
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
    [ 0, -100 ],
    [ 0, 0 ],
    [ 0, 100 ],
    [ 100, -100 ],
    [ 100, 0 ],
    [ 100, 100 ],
    [ -100, -100 ],
    [ -100, 0 ],
    [ -100, 100 ],
    [ 0, 200 ],
    [ 0, -200 ],
    [ 200, 0 ]];

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

        var ANGLE = Math.PI/4;

        for (i=0;i<structuredMesostic.length;i++) {
            var yOffset = (mesosticSpine.length - i) * 10;
            
            var spine = new TextObject();
            spine.init(structuredMesostic[i][1]);
            this.addObject(spine);
            spine.setPosition(XOFFSET, yOffset, ZOFFSET);
            this.spine = spine;
            //build left-hand side
            if (structuredMesostic[i][0].trim() != '') {
                text = new TextObject();
                text.init(structuredMesostic[i][0]);
                this.addObject(text);
                textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
                textX = XOFFSET + -(textOffsetLength * Math.cos(ANGLE));
                textZ = ZOFFSET + textOffsetLength * Math.sin(ANGLE);    
                text.setPosition(textX, yOffset, textZ); 
                text.object3D.rotation.y = ANGLE;
                this.leftText = text;
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
                this.rightText = text;
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
                this.leftText = text;
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
                this.rightText = text;
            }        
        }
    }
}

TextApp.prototype.createFloor = function()
{
    //var mapURL = "/treetext/imgs/15.jpg";
    //var map = THREE.ImageUtils.loadTexture(mapURL);

    var grassTexture = THREE.ImageUtils.loadTexture( '/treetext/imgs/word-tile.jpg' );
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set( 480, 480 );
    var grassMaterial = new THREE.MeshBasicMaterial( { map: grassTexture, color: 0xFFFFFF, side: THREE.BackSide } );

	//var plane = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 3000 ), new THREE.MeshPhongMaterial( { color: 0x4F7404, specular:0xff0000, shininess:100, opacity: 1, transparent: false, map : map, overdraw: true, combine: THREE.MultiplyOperation } ) );
    var plane = new THREE.Mesh( new THREE.PlaneGeometry( 3600, 3600 ), grassMaterial );
	plane.rotation.x = -Math.PI/2;
	plane.position.z = 3;
	this.scene.add( plane );
}

TextApp.prototype.update = function()
{
	//this.root.rotation.z += 0.005;
	//this.root.rotation.y += 0.005;
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
        if (this.camera.position.z > 0) {
            this.camera.rotation.x += dy;
        }
        else {
            this.camera.rotation.x -= dy;   
        }
		//this.camera.position.x += cdx;
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
