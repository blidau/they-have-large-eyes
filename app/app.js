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
	
	// Set up lighting / ambient and four spotlights
     
    var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
    this.scene.add( light );

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
	this.camera.position.set(0, 11, 0);
    this.camera.eulerOrder = "YXZ";

	// Create our text and floor and mesostics
	//this.createShermanObjects();
    this.createLineObjects();

    /*var meso = this.createMesostic('sherman', 
        'The next morning, leaving our luggage to come on in a cart, we started for a trip in the Plenty Ranges. The journey most of the way was up hill, but the road was good, the day fine, and we felt in harmony with our joyous surroundings.', 
        'Any one hearing our shouting and singing, as we walked along, would know we were from Yankee-land, no mistake.', 
        0, 
        -200);*/

    this.perimeter = Math.pow(500,2);

    this.mesosticForest = [{ spine:"sherman", 
                            lines: ['The next morning, leaving our luggage to come on in a cart, we started for a trip in the Plenty Ranges. The journey most of the way was up hill, but the road was good, the day fine, and we felt in harmony with our joyous surroundings.',
                                    'Any one hearing our shouting and singing, as we walked along, would know we were from Yankee-land, no mistake.'],
                            point: {x:-200,z: 0},
                            angle: 0,
                            generated: false },
                            { spine:"sherman", 
                            lines: ['We were just in the middle of "Tramp, tramp" when a long, clear whistle',
                                    'with a crack like a pistol-shot at the end, stopped us short. Sitting down on the roadside we listened, and soon the whistle began again; then followed the most exquisite mimicry of many'],
                            point: {x:200,z:0},
                            angle: 0,
                            generated: false },
                            { spine:"sherman", 
                            lines: ['of the songsters of the wood, varied by sounds resembling the clear tones',
                                    'of a distant bell, the rattle of a rickety wagon, raspings and gratings that made the cold chills run down one\'s back,'],
                            point: {x:-100,z:173.2},
                            angle: 0,
                            generated: false },
                            { spine:"sherman", 
                            lines: ['whispers, moans cries, and laughter. I clearly distinguished the coarse laugh of the giant kingfisher, the cooing of the dove, the call of the black and white shrike, the song of the rusty-backed thrush, the scream of the hawk, and the hoarse screeching of the cockatoo.',
                                    'Sometimes the song, with a volume like a large organ, was loud and sweet, and it seemed as if the musician must be within'],
                            point: {x:-100,z:-173.2},
                            angle: 0,
                            generated: false },
                            { spine:"sherman", 
                            lines: ['a stone\'s-throw; then, again, it died away to the faintest whisper. There was a mellow richness in parts that reminded me of the liquid notes of the clarinet.',
                                    'We sat spellbound till the song ceased. I have heard most of our American songsters'],
                            point: {x:100,z:173.2},
                            angle: 0,
                            generated: false },
                            { spine:"sherman", 
                            lines: ['and some of them are very fine, with voices rich and mellow; but the mocking-bird himself cannot compare',
                                    'with this prince of songsters the Australian lyre-bird (Menura Victoriae). This one was just below us in a gully thick with tree-ferns and scrub, and we did not get sight of him. As we walked on, the trees grew larger'],
                            point: {x:100,z:-173.2},
                            angle: 0,
                            generated: false },
                            { spine:"shelley", 
                            lines: ['It was a magnificent day. We packed up our things, bought some food and started on ahead to walk after putting our things in the cart. We walked about twelve miles to the top of the range and here waited for the man and the cart. As we climbed up we saw large flocks of parrots occasionally flying',
                                    'overhead. Finally after about two hours the man and cart came along. It was lucky we waited for here the route left the road and went through the bush which is very high'],
                            point: {x:0,z:-400},
                            angle: 0,
                            generated: false },
                            { spine:"shelley", 
                            lines: ['and large. Mr. Reed, the driver heard a lyre bird but it was too scary to shoot. I got one glimpse of him however and his fine tail. The only live lyre bird I ever saw.',
                                    'We got here to Pleasant Creek about seven o\'clock and are stopping tonight in a hut with another man, a miner. The driver returned to Panton Hill after unloading our things. I never slept a wink last night on account of the fleas. I tumbled, turned, and scratched. I got up at light, blessing the souls of the cussed fleas. Mr. Miller, the miner told us of another hut about a quarter of a mile off that we might use. Sherman went off at once to look at it and came back saying'],
                            point: {x:0,z:400},
                            angle: 0,
                            generated: false },
                            { spine:"shelley", 
                            lines: ['it was just the place. So we took all our things on our backs and moved over. It is made of palings split from trees and is a snug cabin with large ferns trees about it and some gigantic gum trees all of two hundred feet high. They are',
                                    'the largest trees I have ever seen except in California. While we were fixing the things in the cabin I heard a lyre bird whistle'],
                            point: {x:346.4,z:-200},
                            angle: 0,
                            generated: false },
                            { spine:"shelley", 
                            lines: ['and Sherman took his gun and went up stream and sat down and I came up through the undergrowth and scared the lyre bird up to Sherman and he shot it. In less than ten minutes after we had come here we had one! It was so cold in the night and we had only one blanket',
                                    'apiece so we both slept together, sleeping pretty well. We smoked our blankets before going to bed and this somewhat helped to keep the fleas out. We were awakened by a noise that sounded like a lyre bird and Sherman grabbed his gun'],
                            point: {x:-346.4,z:-200},
                            angle: 0,
                            generated: false },
                            { spine:"shelley", 
                            lines: ['and started out stocking footed after it but it proved to be a small bird that the lyre birds mock frequently. We fried some meat for breakfast and it was splendid. We went out shooting and followed up the creek away',
                                    'but there were such massive fallen trees and thick bushes that we did not go over a mile in an hour. Finally'],
                            point: {x:346.4,z:200},
                            angle: 0,
                            generated: false },
                            { spine:"shelley", 
                            lines: ['we climbed a ridge and I saw some king parrots and shot one and Sherman shot one. We found a large lizard and Sherman was delighted with it and killed it. We saw numbers of large trees that had been attacked by cockatoos',
                                    'and they had ripped off cartloads of bark in search of grubs, to the height of one hundred and fifty feet in some places. Such a sight I never saw before and never imagined birds could do such a thing. The next two days we tried for lyre birds.'],
                            point: {x:-346.4,z:200},
                            angle: 0,
                            generated: false },
                            { spine:"william", 
                            lines: ['Jupiter is by far the largest planet of the solar system, being eighty-seven thousand miles in diameter, and more than twelve hundred times as large as the earth. It has four moons, which accompany it, and revolve around it as the moon does around the earth.',
                                    'Its gravity is so much greater, that a pound-weight on our planet would weigh about two pounds and a half if carried to Jupiter. The year of this planet is nearly twelve times as long as ours;'],
                            point: {x:-600,z:0},
                            angle: 0,
                            generated: false },
                            { spine:"william",
                            lines: ['but its day is a little less than ten hours. The seasons are but slightly varied. Summer reigns during the whole year near the equator; while the temperate regions have a perpetual spring, and the polar regions constant winter. So rapid is the motion of Jupiter',
                                    'Jupiter till we could have given to it more careful scrutiny. Other matters, however, crowd upon us: and I give the following fragmentary observations of Jupiter by Sherman'],
                            point: {x:600,z:0},
                            angle: 0,
                            generated: false },
                            { spine:"william", 
                            lines: ['which are almost exclusively confined to the animals and plants of the planet, which seem to differ very considerably from ours',
                                    'Cracks go out from it; and they are filled with something lighter colored than the mountain. As I go nearer, it is brighter: it must be lava.'],
                            point: {x:-300,z:519.6},
                            angle: 0,
                            generated: false },
                            { spine:"william", 
                            lines: ['No : when I got nearer still, I saw it was light from somewhere else.',
                                    'There is a wall all round the crater. There are some very stunted trees there. They are more like trees than any that I have seen on the planets before ; only the leaf is very thick. It is about four inches long, a quarter of an inch thick, and three inches wide. When you take hold of them, they'],
                            point: {x:-300,z:-519.6},
                            angle: 0,
                            generated: false },
                            { spine:"william", 
                            lines: ['why! the tree stretches too, but only a little. I stretched one about two inches. I notice, when I pull the leaf out, the veins stand out like ridges on it. Down the mountain I see more trees.',
                                    'sea-green color, with a large body, and two branches that curve toward each other to the top, and have a flower on the end of each. It seems as if it would break rather than bend; but it is soft, and something'],
                            point: {x:300,z:519.6},
                            angle: 0,
                            generated: false },
                            { spine:"william", 
                            lines: ['The flower is pink; but the leaves of the flower are green. That must be a good way off: it takes me some time to travel (twenty seconds, perhaps).',
                                    'what a curious animal I see! The mouth opens from side to side, instead of up and down. It is black, and spotted with yellow. It goes as slow as a snail. It is about three feet high. I see no legs. It is flat, round on the bottom, and moves'],
                            point: {x:300,z:-519.6},
                            angle: 0,
                            generated: false }];

    this.generateForest();

	this.createFloor();
    this.createDome();
 
	// Other initialization
	this.mouseDown = false;
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
        this.yloc.innerHTML = this.camera.position.y + "/" + this.mesosticForest.length;
        this.zloc.innerHTML = this.camera.position.z;
        this.xrot.innerHTML = this.camera.rotation.x;
        this.yrot.innerHTML = this.camera.rotation.y;
        this.zrot.innerHTML = this.camera.rotation.z;
    }
}

TextApp.prototype.generateForest = function() {
for (var i=0; i<this.mesosticForest.length; i++) {
        this.mesosticForest[i].mesostic = this.createMesostic(  this.mesosticForest[i].spine, 
                                                                this.mesosticForest[i].lines[0],
                                                                this.mesosticForest[i].lines[1],
                                                                this.mesosticForest[i].point.x,
                                                                this.mesosticForest[i].point.z,
                                                                this.mesosticForest[i].angle);
        this.mesosticForest[i].generated = true;  
    }  
}

TextApp.prototype.createLineObjects = function()
{   
    var lines = [
                    { line: 'through forests of Panton Hill and Pheasant Creek', point : {x: 0, z: -100}, angle : 0 }, 
                    { line: 'stalking, shooting, collecting', point : {x: 0, z: 100}, angle : Math.PI},
                    { line: 'August 1882', point : {x: 0, z: -200}, angle : 0},
                    { line: 'tramp,tramp', point : {x: 0, z: 200}, angle : Math.PI},
                    { line: 'Sherman and Shelley\'s current expedition', point : {x: -400, z: 0}, angle : Math.PI/2},
                    { line: 'Sherman\'s first examinations', point : {x: 400, z: 0}, angle : -Math.PI/2},
                    { line: 'Sherman, aware he\'s a Yankee', point : {x: -200, z: 346.4}, angle : -Math.PI*7/6},
                    { line: 'The Plants and Animals of Jupiter', point : {x: -200, z: -346.4}, angle : Math.PI/6},
                    { line: 'The Plants and Animals of Victoria', point : {x: 200, z: 346.4}, angle : Math.PI*7/6},
                    { line: 'Shelley pulled from school to paint the slides', point : {x: 200, z: -346.4}, angle : -Math.PI/6}
                ];

    for (var i=0;i<lines.length;i++) {
        var text = new TextObject();
        text.init(lines[i].line);
        this.addObject(text);
        text.object3D.eulerOrder = "YXZ";
        text.object3D.rotation.y = lines[i].angle;
        text.object3D.rotation.x = -Math.PI/3.5;
        text.setPosition(lines[i].point.x, 1, lines[i].point.z); 
    }
}

TextApp.prototype.createMesostic = function(mesosticSpine, text1, text2, x, z, offsetAngle)
{
    var mesosticObjectCollection = [];
    var mesosticObject = new Compose.Mesostic(text1, mesosticSpine);
    mesosticObject.lineLength = 24;
    mesosticObject.generateScaffold();
    var structuredMesostic = mesosticObject.structuredText;

    var mesosticObject = new Compose.Mesostic(text2, mesosticSpine);
    mesosticObject.lineLength = 24;
    mesosticObject.generateScaffold();
    var ReStructuredMesostic = mesosticObject.structuredText;

    var XOFFSET = x;
    var ZOFFSET = z;
    var ANGLE = -Math.PI/4 + offsetAngle;

    for (i=0;i<structuredMesostic.length;i++) {
        var yOffset = ((mesosticSpine.length - i) * 10) - 5;
        var spine = new TextObject();
        spine.init(structuredMesostic[i][1]);
        this.addObject(spine);
        spine.setPosition(XOFFSET, yOffset, ZOFFSET);
        spine.object3D.rotation.y = offsetAngle;
        mesosticObjectCollection.push(spine);

        if (structuredMesostic[i][0].trim() != '') {
            var text = new TextObject();
            text.init(structuredMesostic[i][0]);
            this.addObject(text);
            textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
            textX = XOFFSET + -(textOffsetLength * Math.cos(ANGLE));
            textZ = ZOFFSET + textOffsetLength * Math.sin(ANGLE);    
            text.setPosition(textX, yOffset, textZ); 
            text.object3D.rotation.y = ANGLE;
            mesosticObjectCollection.push(text);
        }
        if (structuredMesostic[i][2].trim() != '') {
            var text = new TextObject();
            text.init(structuredMesostic[i][2]);
            this.addObject(text);
            textOffsetLength = (text.textWidth/2) + (spine.textWidth/2);
            textX = XOFFSET + textOffsetLength * Math.cos(ANGLE);
            textZ = ZOFFSET + -(textOffsetLength * Math.sin(ANGLE));
            text.setPosition(textX, yOffset, textZ); 
            text.object3D.rotation.y = ANGLE;
            mesosticObjectCollection.push(text);
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
            mesosticObjectCollection.push(text);
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
            mesosticObjectCollection.push(text);
        }        
    }
    return mesosticObjectCollection;
}
TextApp.prototype.removeMesostic = function(mesosticTree)
{
    for (i=0;i<mesosticTree.length;i++) {
        this.removeObject(mesosticTree[i]);
        mesosticTree[i] = null;
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
TextApp.prototype.updateMesostic = function(mes) {
    var distance = Math.pow((this.mesosticForest[mes].point.x - this.camera.position.x),2) + Math.pow((this.mesosticForest[mes].point.z - this.camera.position.z),2)
    //check if inside the perimeter
    if (distance < this.perimeter) {
        //if inside the perimeter and not generated then generate the mesostic
        
        if (!this.mesosticForest[mes].generated) {
            this.mesosticForest[mes].mesostic = this.createMesostic(  this.mesosticForest[mes].spine, 
                                                        this.mesosticForest[mes].lines[0],
                                                        this.mesosticForest[mes].lines[1],
                                                        this.mesosticForest[mes].point.x,
                                                        this.mesosticForest[mes].point.z,
                                                        this.mesosticForest[i].angle);
            this.mesosticForest[mes].generated = true;
        }
    } else {
            //if outside the perimeter and generated then destroy the mesostic
            if (this.mesosticForest[mes].generated) {
                this.removeMesostic(this.mesosticForest[mes].mesostic);
                this.mesosticForest[mes].generated = false;
                this.mesosticForest[mes].mesostic = null;
            }
    }
}


TextApp.prototype.update = function()
{

    //for (var i=0; i<this.mesosticForest.length; i++) {
    //    this.updateMesostic(i);
    //}
    
    if (this.debug) {
        this.xloc.innerHTML = this.camera.position.x;
        this.yloc.innerHTML = this.camera.position.y + "/" + this.mesosticForest.length;
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
