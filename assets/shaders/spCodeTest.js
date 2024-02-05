/*

//Math
//sin, cos, tan, asin, acos, nsin
//exp, log, exp2, log2
//pow, sqrt, inversesqrt
//mod, fract, abs, sign, floor, ceil
//min, max, clamp, mix, smoothstep,
//length, distance, dot, cross, normalize, reflect, refract
//toSpherical, fromSpherical

//Constants
//PI, TWO_PI, TAU


//Box Edges
export function spCode() {
  let n = noise(getSpace()*100+time)*.5+.5
  color(getRayDirection());
  rotateY(getRayDirection().y*4+time)
  boxFrame(vec3(.5), .02);
  rotateY(time);

  expand(.04);
}


//Box edges with morphing inner circle
export const spCode =  `
  
  rotateY(mouse.x * PI / 2 + time*.5);
  rotateX(mouse.y * PI / 2);
  metal(.5);
  shine(.4);
  color(getRayDirection()+.2);
  rotateY(getRayDirection().y*4+time)
  boxFrame(vec3(.4), .02);
  expand(.02);
  blend(nsin(time)*.6)
  sphere(.2);
`;

//Smoke | Fine Texture Clouds
export function spCode() {
	let s = getSpace();
	let scale = .2;
	let amplitude = .9;
	let speed = 0.1 * time;
	let n = fractalNoise(s * amplitude + speed) * scale;
	sphere(0.3);
	expand(n);
}


//Bubbly Soup | Soft Clouds
export function spCode() {
	let scale = 2.0;
	let s = getSpace();
	let n = 0.1*noise(scale * s + time);
	sphere(0.7 + n);
}

//Atmosphere
export function spCode() {
	let noiseScale = 5.0;
	let s = getSpace();
	let n = 0.5 * noise(noiseScale * s + time) + 0.5;

	color(n,n,n);
	sphere(0.7);
}


//Fractal Flower
export function spCode() {
	let s = getSpace();
	sphere(0.5);

	let numPoints = input(40, 0, 100);
	let distro = sphericalDistribution(s, numPoints);
	expand(distro.w * -0.4);
}


//Hexagon Soccer Ball Fractal
export function spCode() {
	let s = getSpace();
	sphere(0.5);

	let numPoints = input(40, 0, 100);
	let distro = sphericalDistribution(s,  numPoints);
	expand(distro.w * 0.5);
}

//Geometry Quality via Set
export function spCode() {
	setGeometryQuality(90);
	sphere(0.5);

	let s = getSpace();
	let n = noise(s*10);
	expand(n*.2);
}




//Geometry Quality via Step
export function spCode() {
	setStepSize(.13);
	sphere(0.5);

	let s = getSpace();
	let n = noise(s*10);
	expand(n*.2);
}


//Geometry Quality via Step w/ Loop Limiter
export function spCode() {
	setStepSize(.13);
	sphere(0.5);
	//Raymarch loops for Step Size
	//Lower better performance, higher better quality
	setMaxIterations(1);

	let s = getSpace();
	let n = noise(s*10);
	expand(n*.2);
}




//Sharp Half Gradient Sphere
export function spCode() {
	rotateY(PI);
	let s = toSpherical(getSpace());
	color(vec3((s.z+PI)/TAU));
	sphere(0.5);
}



//Grid Ripple Sphere
export function spCode() {
	function oscillate(x) {
		return sin(24*x)*0.5;
	}
	let s = toSpherical(getSpace());
	let m = min(oscillate(s.y),oscillate(s.z));
	color(vec3(m+0.5));
	sphere(0.5);
	expand(0.02*m);
}


//Shapes
export function spCode() {
	//Sphere
	sphere(0.3);

	//Cube
	box(0.3, 0.3, 0.3);

	//Cube Outline
	boxFrame(vec3(.4), .02);

	//Torus
	rotateX(Math.PI/2);
	torus(0.3, 0.08);

	//Line
	let pos1 = vec3(-0.2, -0.2, -0.2);
	let pos2 = vec3(0.2, 0.2, 0.2);
	line(pos1, pos2, 0.02);

	//Cylinder
	cylinder(0.3, 0.3);

	//Cube Grid Space
	grid(2, .2, .04);
}


//Combine
export function spCode() {
	//Combine
	union();

	//Sphere
	sphere(0.35);
	//Cube
	box(0.3, 0.3, 0.3);
}

//Subtract
export function spCode() {

	//Cube
	box(0.3, 0.3, 0.3);
	//Subtract
	difference();
	//Sphere
	sphere(0.35);

	//Sphere
	sphere(0.35);
	//Subtract
	difference();
	//Cube
	box(0.3, 0.3, 0.3);

}




//intersect
export function spCode() {

	//Cube
	box(0.3, 0.3, 0.3);
	//intersect
	intersect();
	//Sphere
	sphere(0.35);

}


//Blend 2 Geometries
export function spCode() {
	blend(0.23);
	//Box
	displace(-0.25, 0, 0);
	box(0.2, 0.2, 0.2);
	//Sphere
	displace(0.5, 0, 0);
	sphere(0.2);

}


//Mix Between 2 Geometries | Animate
export function spCode() {
	sphere(0.3);
	mixGeo(abs(sin(time)));
	box(0.3, 0.3, 0.3);

}


//Hollow out a shape and creates a shell around with the provided thickness.
export function spCode() {
	lightDirection(0, 0.2, 0.2);
	sphere(0.3);
	shell(0.02);
	displace(0.2, 0.2, 0.2);
	difference();
	box(0.2, 0.2, 0.2);

}



//Expand Geometry
//Rounded Edge Cube
export function spCode() {
	box(0.2, 0.2, 0.2);
	expand(0.1);

}


//SDF
//Directly sets the distance field value.
//Loopy Morphing Loop
export function spCode() {

	let s = getSpace();
	let sphereSDF = length(s) - 0.5;
	setSDF(sphereSDF);



	// define any sdf
	function twirl(pn, tm) {
		let r = length(vec2(pn.x, pn.y));
		let th = atan(pn.x, pn.y);
		let r2 = r - 0.3;
		let f = 7.0;
		let amp = 0.1;
		let r3 = r2 + amp * sin(f * th + tm);
		let v = pn.z;
		let v2 = v + amp*cos(f * th - tm);
		let d = sqrt(v2 * v2 + r3 * r3) - 0.09;
		return [d * 0.28, v2, r3];
	}

	let s = getSpace();
	let rad = length(s);

	let ds = twirl(s, time);
	color(nsin(35*ds[1]),0,nsin(35*ds[2]));

	setSDF(ds[0]);

}

//Composition
//center white sphere with offset purple
export function spCode() {
	let purpleSphere = shape(() => {
	  color(1, 0, 1);
	  displace(.4, .4, 0);
	  sphere(0.2);
	});

	purpleSphere();
	sphere(0.2);
}

//Composition Simplified
//center white sphere with offset purple
export function spCode() {
	//since shape returns a funciton you can call it right after it's defined
	shape(() => {
	  color(1, 0, 1);
	  displace(.4, .4, 0);
	  sphere(0.2);
	})();

	sphere(0.2);
}



//Composition Construction
//Morphing box + sphere entity animated
export function spCode() {
	shape(() => {
	  displace(0, 0, .4);
	  box(.23, .23, .23);
	  difference();
	  sphere(.3);
	})();

	// without using shape mixGeo would just blend with the
	// previsouly defind object, in this case sphere(0.3);
	mixGeo(abs(sin(time)));
	sphere(0.33);
}


//Composition Parameters
//Cube with sphere void
export function spCode() {
	// creates a box with a sphere cut out of the center
	// draws at the provided x, y
	let cutOut = shape((x, y) => {
	  displace(x, y, 0);
	  rotateX(time);
	  rotateY(time);
	  box(0.21, 0.21, 0.21);
	  difference();
	  sphere(0.27);
	});

	cutOut(.2, .2, time);
}



//Composition Advanced
//4 Spinning Cubes with sphere void of diff colors
export function spCode() {
	// if higher order functions are new to you please check out this tutorial
	// https://www.youtube.com/watch?v=H4awPsyugS0

	// lays out the provided obj in a cirlcle with cound # of elements at the provided scale
	let layoutCircle = (obj, count, scale) => {
	  for(let i = 0; i < count; i++) {
		let circleStep = i / count;
		let inc = circleStep * TWO_PI;
		let x = sin(inc) * scale;
		let y = cos(inc) * scale;
		obj(x, y, circleStep);
	  }
	}

	// creates a box with a sphere cut out of the center
	// draws at the provided x, y and colors with the step
	let cutOut = shape((x, y, step) => {
	  displace(x, y, 0);
	  rotateX(time);
	  rotateY(time);
	  color(0, 1, step)
	  box(0.21, 0.21, 0.21);
	  difference();
	  sphere(0.27);
	});

	blend(0.1);
	layoutCircle(cutOut, 4, .4);
}




//Animation
//Sphere Orbit
export function spCode() {
	let xPos = sin(time * 2.0) * 0.3;
	let yPos = cos(time * 2.0) * 0.3;
	displace(xPos,yPos, 0);
	sphere(0.2);
}





//Offset Displace
//Additive, but resetable
//Reset the coordinate space back to (0, 0, 0) after it has been translated, or distorted using displace, mirror, or rotate.
export function spCode() {


	displace(.2, 0, 0)
	displace(.2, 0, 0)
	//displace(.4, 0, 0).
	sphere(0.2);
	reset();
	//displace(0, 0, 0).
	sphere(0.2);

}




//Set Space
//
export function spCode() {

	let s = getSpace();

	setSpace(s - vec3(.5, .5, 0));
	sphere(0.5);



}


//Set Space 2
//
export function spCode() {

	let s = getSpace();

	setSpace(s * vec3(1, .7, 1));
	sphere(0.5);

}



//Mirroring
export function spCode() {
	mirrorX();
	//mirrorY();
	//mirrorZ();
	displace(0.2, 0.2, 0.2);
	sphere(0.15);
}


//Mirroring All XYZ
export function spCode() {
	mirrorXYZ();
	displace(0.2, 0.2, 0.2);
	sphere(0.15);
}



//Mirroring N
//mirrorN(count, spacing);
//count Number: the number of times to mirror the space. Ranges from 0 to any number
//spacing Float: how much spacing to put between each mirror.
//Mirror all operations along the x, y, and z axis N number of times with the given spacing.
export function spCode() {
	mirrorN(3, .13);
	sphere(.1);
}




//Rotate
//amount Number: value in radians, which can rotate a full 360° by providing a value from -PI/2 to PI/2
export function spCode() {
	rotateX(PI/2);
	//rotateY(PI/2);
	//rotateZ(PI/2);
	torus(0.4, 0.2);
}


//Color RGB
//color(red, green, blue);
//red Float: value from 0.0 to 1.0
//green Float: value from 0.0 to 1.0
//blue Float: value from 0.0 to 1.0
export function spCode() {
	displace(-0.3, 0, 0);
	color(0.1, 1.0, 1.0);
	sphere(0.2);

	// Alternatively
	//translate the coordinate space to the right
	displace(0.6, 0, 0);
	let color2 = vec3(1, 0.2, 0.2);
	color(color2);
	sphere(0.2);
}

//Metalness
//Flat | Mid | Full
export function spCode() {
	color(0.1, 1.0, 1.0);
	metal(0.5);
	sphere(0.1);
	displace(-0.3, 0, 0);
	color(0.1, 1.0, 1.0);
	metal(0);
	sphere(0.1);
	displace(0.6, 0, 0);
	metal(1);
	sphere(0.1);
}


//Shine | albedo 
//value Float: value from 0.0 to 1.0. Defaults to ____
//Flat | Mid | Full
export function spCode() {
	color(0.1, 1.0, 1.0);
	shine(0.5);
	sphere(0.1);
	displace(-0.3, 0, 0);
	color(0.1, 1.0, 1.0);
	shine(0);
	sphere(0.1);
	displace(0.6, 0, 0);
	shine(1);
	sphere(0.1);
}



//Mixing Materials
//Mix between two materials. Works with color(), metal(), and shine()
//Great for animation control
//amount Number: value from 0 to 1.0 to mix
export function spCode() {
	color(0, 0, 1);
	box(vec3(.4));

	mixMat(.5);

	color(1, 0, 0);
	sphere(0.5);
}




//HSV Colors
//Color Range Animation 
export function spCode() {
	let hue = abs(sin(time*.2));
	let saturation = 1;
	let value = 1;
	let col = hsv2rgb(vec3(hue, saturation, value));
	color(col)
	sphere(0.5);
}


//HSV Colors
//Color Wheel Cylinder
export function spCode() {
	noLighting();
	let s = getSpace();
	let toCenter = vec2(s.x, s.y);
	let angle = atan(toCenter.x, toCenter.y) - PI / 4.;
	let radius = length(toCenter) * PI / 2.;
	let col = hsv2rgb(vec3((angle / TWO_PI), radius, s.z + 0.5));
	color(col);

	rotateX(PI / 2);
	cylinder(0.5, 0.5);
}



//No Lighting
export function spCode() {
	noLighting();
	color(vec3(0.4));
	cylinder(0.5, 0.5);
}




//RGB to HSV Colors 1
//Dual Sphere Color Animation
export function spCode() {
	// Define color and draw reference sphere
	let red = vec3(0.9,0.0,0.0);
	color(red);
	displace(-0.3,0.0,0.0);
	sphere(0.2);

	// Convert color to HSV
	let hsv = rgb2hsv(red);
	// Shift hue
	hsv.x += time*0.2;
	// Convert back to RBG
	let shifted = hsv2rgb(hsv);
	// Draw second sphere with shifted hue
	color(shifted);
	displace(0.6,0.0,0.0);
	sphere(0.2);
}



//RGB to HSV Colors 2
//Trippy Sphere Color Animation
export function spCode() {
	// Get 3d noise
	let s = getSpace();
	let n = 3*noise(8*s);
	// Define color
	let red = vec3(0.9,0.0,0.0);
	// Convert to HSV
	let hsv = rgb2hsv(red);
	// Shift hue
	hsv.x += n+time;
	// Convert back to RGB
	let shifted = hsv2rgb(hsv);
	// Draw sphere
	color(shifted);
	sphere(0.6);
}



//Occulusion | Approximates the soft shadows.
//Sphere on rounded pedestal
export function spCode() {
	sphere(0.3);

	occlusion(.8);

	displace(0, -.8, 0);
	box(1, .5, 1);
}

//Fresnel | Generates a radial gradient based on the camera direction that can be used to create edge glow. When used in reflections this technique will make something looked at straight on the least reflective and when turned nearly 90 degrees on edge the most reflective.
//Black Hole Sphere
//value Float: amount
export function spCode() {
	let f = fresnel(2);
	color(vec3(f));
	sphere(0.5);
}


//Light Direction
//x Float: value from 0.0 to 1.0. Defaults to 0
//y Float: value from 0.0 to 1.0. Defaults to 1
//z Float: value from 0.0 to 1.0. Defaults to 0
//position Vec3: defaults to vec3(0, 1, 0).
export function spCode() {
	lightDirection(0, 0, 1);
	//alternatively lightDirection(vec3(0, 0, 1));
	sphere(0.5);
}




//Get Ray Direction
//Viewpoint Warping Distortion - Screw
export function spCode() {
	let ray = getRayDirection();
	rotateX(ray.x * 4);
	box(0.5, .5, .5);
}


//Get Ray Direction
//Color Warping Distortation - Gradient
export function spCode() {
	let ray = getRayDirection();
	color(normalize(ray))
	sphere(0.5);
}



//Get Ray Direction - getRayDirection();
//Gets the direction that camera / ray is looking at. This can be helpful to add interaction based off the camera position.


//Get Ray Direction
//Edge Glow
export function spCode() {
	noLighting();
	let ang = 1.0-dot(-1.0*getRayDirection(), normal);
	let glow = 1;
	let ambient = 0;
	let c = ambient+glow*ang;
	color(vec3(c));
	torus(0.5,0.2);
}





//Animation | Time : Time is passed in by default which can be used for animation. Time is incremented every new frame that is drawn and is scaled to milliseconds.
//Oscillation
export function spCode() {
	let oscillation = abs(sin(time));
	let endSize = 0.5;
	sphere(endSize * oscillation);
}




//Normal
//Note: Only has an effect on color, cannot be used to influence geometry.
//Colorful Glass like Sphere
export function spCode() {
	color(normal.x, normal.y, normal.z);
	sphere(0.4);
}



//Normal
//Note: Only has an effect on color, cannot be used to influence geometry.
//Colorful Glass like Sphere
export function spCode() {
	color(normal.x, normal.y, normal.z);
	sphere(0.4);
}


//!Doesn't work in AUXL
//HTML Debug Menu
//Input
//Creates an input slider defaulting to the provided starting value that ranges from the given minimum and maximum values. Internally a uniform is created for your input slider, which allows the value to be updated without re-compiling the shader.
export function spCode() {
	let size = input(0.3);
	sphere(size);
}




//!Doesn't work in AUXL
//Interaction
//Mouse
//mouse contains the current x, y, and z position of the cursor relative to (0, 0, 0) in the center of the scene.
export function spCode() {
	// alternatively
	// dispace(mouse.x, mouse.y, mouse.z);
	displace(mouse);
	sphere(0.3);
}


//!Doesn't work in AUXL
//Interaction
//Mouse intersection
//mouse contains the current x, y, and z position of the cursor relative to (0, 0, 0) in the center of the scene.
export function spCode() {
	let  s = getSpace();
	let dotSize = pow(distance(s, mouseintersection())*10, 20)+.1;

	let dotColor = vec3(.1, abs(sin(time)), abs(cos(time)));
	let col =  dotColor/dotSize;
	color(col);
	sphere(0.4);
}


//GLSL Functions
//Example doesn't work in auxl, but idea is the same
export function spCode() {
	let branchingColor = glslFunc(`
	vec3 test(vec3 mouse, vec3 col1, vec3 col2) {
		if(mouse.x <0.) {
			return col1;
		} else {
			return col2;
		}
	}
	`);

	let col = branchingColor(mouse, vec3(0, 1, 0), vec3(1, 0, 0));
	color(col);
	sphere(.5);
}


//GLSL Functions
//func String: a String containing a GLSL function.
//Returns a Function: An encapsulated version of func. Any arguments given to this function will be forwarded as arguments to the provided glsl function.


//GLSL Functions
//func String: a String containing a GLSL function.
//Import Shader Toy
export function spCode() {
	let koch = glslFunc(`
	//https://www.shadertoy.com/view/Mlf3RX
	float koch(vec2 p)
	{
		float ft = mod(floor(time),6.)+1.;
		p = abs(fract(p)-0.5);
		for(int i=0;i<12;++i)
		{
			if (floor(float(i)*.5) > ft)break; //"animation"
			if(time == 0.0) {
			p += vec2(p.y*1.735, -p.x*1.735);
			p.x = abs(p.x)-0.58;
			p = -vec2(-p.y, p.x)*.865;
			} else {
			  p = -vec2(-p.y + p.x*1.735, abs(p.x + p.y*1.735) - 0.58)*.865; //One loc version
			}
		}
		return mod(floor(time*2.),2.)>0. ? abs(p.x)/(ft*ft)*14. : p.x/(ft*ft)*16.;
		//return p.x;
	}
	`);
	rotateX(PI/2);
	let s= getSpace();
	let col = koch(vec2(s.x, s.z));
	color(pow(vec3(col), vec3(.1))+normal)
	sphere(col*.005+.5)
}




//GLSL Functions
//func String: a String containing a GLSL function.
export function spCode() {
	let march = glslFunc(`
	struct Ray {
	  vec3 origin;
	  vec3 direction;
	};

	struct Sphere {
		vec3 position;
		float radius;
	};

	struct Plane {
		vec3 normal;
		float offset;
	};

	struct FarLight {
		vec3 direction;
		vec4 color;
	};        

	struct PointLight {
		vec3 position;
		vec4 color;
	};

	const vec4 ambient = vec4(0.1,0.05,0.07,1.0);
	const vec4 planeColor = vec4( 0.64, 0.68, 0.55, 1.0);
	const vec4 sphereColor = vec4( 0.84, 0.93, 0.07, 1.0);

	Plane p1 = Plane(vec3(0.0,1.0,0.0), 1.5);

	vec3 repeat( vec3 v ) {
		return vec3(mod(v.x,4.0)-2.0, v.y, mod(v.z,10.0));   
	}

	float distFromSphere(Sphere s, vec3 p) {
		return distance(repeat(p),s.position)-s.radius;  
	}

	float distFromPlane(Plane plane, vec3 p) {
		return dot(plane.normal, p) + plane.offset;
	}

	vec3 mainImage(vec3 rayDir, float iTime) {

		FarLight sun = FarLight(normalize(vec3(sin(iTime),0.4,cos(0.43*iTime))), vec4(1.0,0.8,0.75,1.0));

		Sphere sphere1 = Sphere(vec3(0.0,cos(iTime),8.0+0.5*sin(iTime)),1.5);

		vec3 mass = vec3(5.0*sin(0.6*iTime), 2.5, 15.0+5.5*iTime+4.0*cos(0.2*iTime));


		//vec2 uv = fragCoord.xy / iResolution.xy - vec2(0.5);
		//uv.x *= iResolution.x / iResolution.y;

		int pHits = 0;
		int sHits = 0;
		vec4 color =  vec4(0.0,0.0,0.0,1.0);
		vec3 reflectDirection;

		Ray ray = Ray(vec3(0.0,3.0,999.0)-6.0*rayDir, -rayDir);

		for (int bounce = 0; bounce<5; ++bounce) {

			for (int i=0; i<40; ++i) {
				float distS = distFromSphere(sphere1, ray.origin);
				float distP = distFromPlane(p1, ray.origin);

				if (distS < 0.005) {
					sHits++;
					vec3 norm = normalize(sphere1.position - repeat(ray.origin));
					ray.direction = reflect(ray.direction, norm);
					ray.origin += ray.direction * 0.08;
					break;
				}

				if (distP < 0.005) {
					pHits++;
					ray.direction = reflect(ray.direction, p1.normal);
					ray.origin += ray.direction * 0.08;
					break;	
				}


				vec3 difference = ray.origin - mass;
				float mDist = length(difference);
				float minDist =  min(min(distS, distP),mDist);
				if (mDist > 600.0) break;
				//float force = 0.02*((sin(0.23*iTime)+1.0)) / (mDist*mDist);
				//ray.direction = normalize(ray.direction - minDist * force * difference);
				ray.origin += ray.direction * minDist * 0.9;

			}
		} 

		if (pHits + sHits > 0) {
			float ph = float(pHits); 
			float sh = float(sHits);
			float angle = dot(sun.direction, ray.direction);
			//specular
			color += pow(max(angle, 0.0), 180.0) * vec4(0.8);
			color += (max(angle, 0.0) * sun.color * pow(planeColor, vec4(ph)) * pow(sphereColor, vec4(sh))) / pow(ph+sh,1.0);
			color += ambient;
		}

		return color.xyz;

	}`)

	let r = getRayDirection()
	let col = march(r, 100.0+2.0*sin(0.5*time))
	noLighting()
	setMaxIterations(0)
	color(col)
	sphere(2);

}





//GLSL SDF Function
//Crystal
export function spCode() {
	let octahedron = glslSDF(`
	//https://iquilezles.org/articles/distfunctions/
	float sdOctahedron( vec3 p, float s){
	  p = abs(p);
	  float m = p.x+p.y+p.z-s;
	  vec3 q;
		   if( 3.0*p.x < m ) q = p.xyz;
	  else if( 3.0*p.y < m ) q = p.yzx;
	  else if( 3.0*p.z < m ) q = p.zxy;
	  else return m*0.57735027;

	  float k = clamp(0.5*(q.z-q.y+s),0.0,s); 
	  return length(vec3(q.x,q.y-s+k,q.z-k)); 
	}`);

	octahedron(.6);
}



//GLSL SDF Function
//Animating Sphere Shell
export function spCode() {
	let hollowCutSphere = glslSDF(`
	//https://www.shadertoy.com/view/7tVXRt
	float sdCutHollowSphere( vec3 p, float r, float h, float t )
	{
	  // sampling independent computations (only depend on shape)
	  float w = sqrt(r*r-h*h);

	  // sampling dependant computations
	  vec2 q = vec2( length(p.xz), p.y );
	  return ((h*q.x<w*q.y) ? length(q-vec2(w,h)) : 
							  abs(length(q)-r) ) - t;
	}
	`);


	rotateZ(PI/2);
	hollowCutSphere(.5, sin(time)*.5, .02);
}



//GLSL SDF Function
//Generates an primitive from the provided GLSL function. The provided GLSL function must return a float(the distance filed) and the first parameter must be a vec3(position).
//Hexagon Prism
export function spCode() {
	let hexPrism = glslSDF(`
	//https://iquilezles.org/articles/distfunctions/
	float sdHexPrism( vec3 p, vec2 h ){
	  const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
	  p = abs(p);
	  p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
	  vec2 d = vec2(
		   length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
		   p.z-h.y );
	  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
	}`);

	hexPrism(vec2(.2, .2));
}



#FAQ

If you see artifacting / distortions in your shape you will most likely need to increase the geometry quality.

This is no built in scale function because it quickly distorts the objects. This can however be achieved using setSpace.
#
Known Issues / WIP

length, distance, dot, and normalize work only with with vec3s

pow, mod, min, max, atan, clamp, mix, and smoothstep work only with floats.

branching / using if statements that reference built-in variables will not work. Specifically variables like vec2, vec3, vec4, or using input variables like time. Eg:

if(time > 100) {
    //do something
}


--------------------


//Trippy Lined Goo
//https://shaderpark.com/user/liaselia
export function spCode() {
	let nscale = 1.2 
    let nAmplitude = .8 
    let hueVersetzung = .03
    let ringe = 67 
    let mixAmt = 1 
    let s = getSpace();
    let samplePos = s * nscale + vec3(0, 0, -time) * .2 
    let n = noise(samplePos);
    let n1 = nsin((noise(samplePos)) * ringe );
    let n2 = nsin((noise(samplePos + hueVersetzung)) * ringe);
    let n3 = nsin((noise(samplePos + hueVersetzung * 2.2)) * ringe);
    let col = pow(vec3(n1, n2, n3), vec3(13));
    color(col);
    shape(() => {
    rotateX(PI/2);
    torus(1.5, 1.39);
    expand(n*nAmplitude)
    setGeometryQuality(65)
    sphere(.1);
    blend(5);
    mixGeo(mixAmt);
    mirrorN(3, .1);
    shape(() => {
      rotateX(time*.1)
      rotateZ(time*.1)
      boxFrame(vec3(.1), .005);
      expand(n*nAmplitude)
      sphere(1);
      blend(5);
    })()
    })();  
}



//Mirrored Cube Fractal Animated Breathing
//https://shaderpark.com/user/liaselia
export function spCode() {
	let tint = vec3(3.0, 0.0, 3.0);
	occlusion(0.4);
	let pos1 = vec3(-0.1, -0.1, -0.1);
	let pos2 = vec3(0.1, 0.1, 0.1);
	blend(abs(0.1*sin(time*1)));
	let sz = 0.1;
	let s = 0.05;
	let sp = getSpace();
	color(tint*sp-normal.x/2);
	for (let i=1; i<7; i++) {
	  mirrorXYZ();
	  displace(sz);
	  rotateX(sin(time)*0.7*sin(0.4*time)*0.6);
	  rotateY(sin(time)*0.7*sin(0.6*time)*0.6);
	  rotateZ(sin(time)*0.7*sin(0.8*time)*0.6);
	 line(pos1, pos2, 0.1);
	}
}



//Template
//Rotating Spiral Galaxy Cube Rainbow Mushrooms
//https://shaderpark.com/user/liaselia
export function spCode() {
	setStepSize(0.5);
	let pilzli = shape((scale) => {
		shine(.5);
		sphere(scale.x * 0.5);
		displace(scale * vec3(0, -.4, 0));
		difference();
		box(scale * vec3(.6, .5, .6));
		union();
		displace(scale * vec3(0, .2, 0));
		cylinder(scale.x * .12, scale.y * .3);
	});
	const repShape = shape((targetShape, scale, spacing, counts) => {
		rotateX(getSpace().x + time*0.5);
		rotateY(getSpace().y + time*0.5);	
		const {
			index,
			local
		} = repeatLinear(scale, spacing, counts);
		rotateX(0.1 * index.x * 2 * time + PI);
		const n = noise(index * 0.1 + time * 0.2);
		color(hsv2rgb(vec3(n, 1, 1)));
		targetShape(scale);
	});
	const scale = vec3(0.2, 0.2, 0.2) * 0.25;
	const counts = vec3(6, 6, 6);
	const spacing = vec3(1, 1, 1) * 1.0;
	repShape(
		pilzli,
		scale,
		spacing,
		counts
	);
}



//Template
//Rotating Spiral Galaxy Cube Rainbow Mushrooms
//https://shaderpark.com/user/liaselia
export function spCode() {
	setStepSize(0.5);
	let pilzli = shape((scale) => {
		shine(.5);
		sphere(scale.x * 0.5);
		displace(scale * vec3(0, -.4, 0));
		difference();
		box(scale * vec3(.6, .5, .6));
		union();
		displace(scale * vec3(0, .2, 0));
		cylinder(scale.x * .12, scale.y * .3);
	});
	const repShape = shape((targetShape, scale, spacing, counts) => {
		rotateX(getSpace().x + time*0.5);
		rotateY(getSpace().y + time*0.5);	
		const {
			index,
			local
		} = repeatLinear(scale, spacing, counts);
		rotateX(0.1 * index.x * 2 * time + PI);
		const n = noise(index * 0.1 + time * 0.2);
		color(hsv2rgb(vec3(n, 1, 1)));
		targetShape(scale);
	});
	const scale = vec3(0.2, 0.2, 0.2) * 0.25;
	const counts = vec3(6, 6, 6);
	const spacing = vec3(1, 1, 1) * 1.0;
	repShape(
		pilzli,
		scale,
		spacing,
		counts
	);
}


//Template
//Animated Water
//https://shaderpark.com/user/motoroil
export function spCode() {
	//let pointerDown = input();

	setMaxIterations(5)

	let s = getSpace();
	let r = getRayDirection();

	let n1 = noise(r * 4 + vec3(0, 0, time*.1));
	let n = noise(s + vec3(0, 0, time*.1) + n1);

	metal(n*.5+.5);
	shine(n*.5+.5);

	displace(mouse.x*2, mouse.y*2, 0)
	color(normal * .1 + vec3(0, 0, 1));
	boxFrame(vec3(2), abs(n) * .1 + .04 );
	mixGeo(0)//pointerDown
	sphere(n * .5 + .8);
}

//Template
//Chroma Gradient Animation
//https://shaderpark.com/user/pbjiggles
export function spCode() {
	setStepSize(.8);
	setMaxIterations(40);
	let s = getSpace();

	let scaleValue = input(.50, 0, 2);
	let timeFactor = time * 0.2;

	// Creating a dynamic noise pattern
	let n = vectorContourNoise(s * scaleValue + timeFactor, .05, 6) * .5 + .5;
	n = pow(n, vec3(2));

	// Dynamic color change over time
	let dynamicColor = vec3(sin(timeFactor), cos(timeFactor), sin(timeFactor + PI / 2));
	dynamicColor *= n; // Applying noise effect on color

	color(dynamicColor);

	setMaxReflections(.01);

	// Creating an RGB delay effect
	let rgbDelay = vec3(n.x + 0.1 * sin(timeFactor), n.y + 0.1 * cos(timeFactor), n.z);
	expand(rgbDelay.z * .1);

	// Basic transformations
	rotateX(time * 0.1);
	rotateY(time * 0.1);

	sphere(0.5);

	reset();


}





//Template
//Web Fluid
//https://shaderpark.com/user/rbytes
export function spCode() {
	setStepSize(0.9);
	setMaxIterations(60);
	setGeometryQuality(10);

	let s = getSpace();
	let n = noise(s);

	shine(1.0);
	blend(0.2);
	for (let i = 0; i < 5; ++i) {
	  for (let j = 0; j < 2; ++j) {
		color(vec3(nsin(time) * 10/255, ncos(time) * 255/255, 200/255));
		rotateZ(time * 0.2);
		rotateY(time * i * 0.1);
		cylinder(vec2(0.01, 1.0));
	  }
	}

}


//Template
//Rainbow Poke Dot Fruit
//https://shaderpark.com/user/teh_sauce
export function spCode() {
	let p = getSpace();
	const rtp = toSpherical(p);
	let nsz = sphericalDistribution(p,300.0);
	// this can be replaced with a hash
	let v = (sin(5775.0*nsz.x+4.06)+cos(1524.2*nsz.y+32.9)+sin(2932.0*nsz.z))*0.2+0.8;
	let cl = hsv2rgb(vec3(v,1.0,1.0));
	let ms = 1.0;//*max(dot(normalize(mouse),vec3(nsz.x,nsz.y,nsz.z)),0.0);
	ms = min(pow(ms,10.0),1.0);
	const r = nsin(5.0*rtp.z)+0.4;
	let dsp = max(0.5*sin(time+v*190.0),2.0*ms)*0.005*exp(-1*pow(r*30.0*nsz.w,6.0));
	let glo = max(1.0-2.0*dot(-1.0*normal,getRayDirection()),0.0);
	shine(0.95);
	metal(0.3);
	color(cl*dsp*200.0+0.001);
	sphere(0.3-r*0.05*sin(1.0*rtp.y));
	expand(dsp);

}




//Template
//Gradient Morphing Goo
//https://shaderpark.com/user/drmbt
export function spCode() {
	let fres = input(2,0,10)
	let x = input(.1,0,1)
	let s = getSpace();
	let t = time*2
	let f = fresnel(fres)

	//let s = getRayDirection();
	//setStepSize(.4);


	rotateY(s.x*8);
	color(s * f );


	displace(sin(s.x*2+time)*.5, 0, 0);

	sphere(sin(.73*x + .21*t + .1 + .2 * sin(.15*x + .19*t + .1))/4 +.5);
	expand(.1);

}




//EPIC, but too much. low FPS
//Mobius Strip Prism Animation RayDirection
//https://shaderpark.com/user/tblankensmith
export function spCode() {
	//color + lighting
	setMaxReflections(2);
	let t = 3.5; //14
	let n = vectorContourNoise(getSpace()*.1 + vec3(0, 0, t+sin(time*.1)*.2), .1, 2);
	n = pow(sin(n*2)*.5 +.5, vec3(4));
	color(n);
	reflectiveColor(n+.1);
	metal(.3);
	occlusion(-10);

	//small dots intersected with a twisted torus
	mirrorN(5, .04);
	sphere(.02+ n.x * .2);
	reset();
	intersect();
	let twist = getRayDirection().x * 10 * sin(time * .1);
	rotateX(PI/2 + twist);
	torus(.5, .2);
	blend(.15);
	reset();

	//background box
	shape(() => {
		rotateX(twist);
		box(vec3(4.2));
		shell(.01);
	})();

	// floor
	displace(0, -.8, 0);
	box(4, .1, 4);
}




//Template
//Goo Strings Waves
//https://shaderpark.com/user/tblankensmith
export function spCode() {
	let t = 3.5//input(3.5, 0, 5)
	setMaxReflections(0)
	setStepSize(.4)

	//let n = vectorContourNoise(getSpace()*.2 + vec3(0, 0, time*.1), .03, 2);
	//n = pow(n +.5, vec3(6))
	//color(n)
	//reflectiveColor(n*1)

	let n = vectorContourNoise(getSpace()*.1 + vec3(0, 0, t +sin(time*.1)*.2), .1, 2);
	n = pow(sin(n*2)*.5 +.5, vec3(4))
	let mixG = input();

	occlusion(-5);
	color(n)
	reflectiveColor(n+.2)

	blend(0.4);
	metal(.3);
	shine(.9);
	occlusion(-10);
	let lineNum = 2;
	let p = getSpace();
	for(let i =0; i < lineNum; i++){
	  //color(p.y, p.x, sin(3*p.y+ 0.6)+0.5);
	  let yDis = .8 * sin(p.x + time*0.08*i);
	  displace(p.x, yDis, i / lineNum - 0.5);
	  sphere(0.01);
	  blend(0.3);
	  reset();
	};


	shape(() => {
		sphere(5)

		mixGeo(1-mixG)
		box(vec3(5));
		expand(.1)
		shell(.1)
	})()

	//reset();
	displace(0, -.5, 0);
	box(vec3(9, .01, 9));
}




//Template
//Random Egg Shell Glowing Internal
//https://shaderpark.com/user/fallspace
export function spCode() {
	lightDirection(0, 0.2, 0.2);
	shine(.8);
	metal(0.8);
	color(0.5,0.24,0);
	union();
	displace(0,0.3,0);
	sphere(0.25);
	displace(0,-0.6,0);
	sphere(0.25);
	displace(0,0.3,0.3);
	sphere(0.25);
	displace(0,0,-0.6);
	sphere(0.25);
	reset();
	color(0.9,0.5,0.1);
	sphere(0.5);
	reset();
	shell(0.03);
	difference();
	rotateZ(PI/2);
	rotateY(PI/4*time);
	box(0.2,0.8,0.2);
	reset();
	union();
	metal(2);
	color(0.1,0.05,1);
	let scale = 2;
	let s = getSpace();
	let n = 0.08*noise(scale * s + time*4);
	sphere(0.02+n);

}



//Template
//Liquid Drop Morphing
//https://shaderpark.com/user/hayk
export function spCode() {
	setStepSize(.8);
	setMaxIterations(40)
	let s = getSpace();

	let scale = input(.50, 0, 2)
	let n = vectorContourNoise(s*scale+time*0.2, .05, 6)*.5+.5;
	n = pow(n, vec3(2))
	//n = nsin(n*9)
	color(n)


	setMaxReflections(.01)
	//occlusion(-100)
	//displace(.1, 1, 1)
	let col = vec3(0, 1, 0);
	//color(col)
	//reflectiveColor(0.4, 1, 0.2)
	sphere(0.5);
	expand(n.z*.1)

	reset();

}


//Template
//Planet Atmosphere
//https://shaderpark.com/user/rbytes
export function spCode() {
	let s = getSpace();
	let n = fractalNoise(s);

	setMaxIterations(50);
	displace(vec3(0, 0, .8));
	rotateY(nsin(time + PI / 20) * 0.5 * PI + PI/4);
	rotateZ(PI/2);
	shine(1.4);
	color(vec3(nsin(n * 10 + time), ncos(n * 10 + time / 2.0), ncos(n * 10)));
	sphere(0.7);
	shine(0);
	color(0, 0, 0);
	shine(1.4);
	color(vec3(1, 1, 1));
	mixGeo(0.4);
	sphere(0.5);

}



//Template
//Donut Fire
//https://shaderpark.com/user/rbytes
export function spCode() {
	let scale = 1;
	let s = getSpace();
	let r = getRayDirection();
	let mX = mouse.x;
	let mY = mouse.y;
	let n = noise(s*scale+vec3(0,0,time) + fractalNoise(r*scale+vec3(0,0,time*.2)));
	let vn = vectorContourNoise(s*.1*time*0.2, .05, 6)*.5+.5;
	color(vec3(vn.x,0,0)*.5+vec3(0,4,.8)+normal*.8);
	torus(0.7+.1*n, .3);

}




//Template
//Sun Expansion Animation
//https://shaderpark.com/user/rcmt
export function spCode() {
	setGeometryQuality(50);
	let scale = 70.0;
	let s = getSpace();
	let n = 0.1*noise(scale * s + time/30);
	  let twist = getRayDirection().x * 15 * sin(time * .1);
	color(10, 0.6, 0);

	sphere(0.7 + n * twist);


}



//Template
//Screen Orb Distotion
//https://shaderpark.com/user/rcmt
export function spCode() {

	//let n = noise();
	let scale = 12.0;
	let s = getSpace();
	let n = 0.08 * noise(scale * s + time / 2);
	displace(vec3(0.0, 0.0, 1.5));
	color(vec3(n-0.3, n*0.1, n*1));
	box(vec3(0.4 + n));
	mixGeo(0.5)
	sphere(n);

	setMaxIterations(10);




}




//Template
//Morphing Orbs Colliding
//https://shaderpark.com/user/ronbruce
export function spCode() {
	setStepSize(.4);
	setMaxIterations(400)

	displace(0,0,0);

	let c = 0.6;
	let f = 2;
	let size = 0.3;

	let scale = 0.3;
	let s = getSpace();
	//color(1, smoothstep(0.5,0.5, scale*s.z), smoothstep(-scale*s.z,0.5,0.5));
	color((scale*(s.z+1)/1), smoothstep(scale*s.z, 0.5,0), smoothstep(-scale*s.z,0.5,0));


	//physics
	blend(0.07);
	rotateX(time);
	//Up and down (y and z)
	let p1 = 0;
	displace(0, c * sin(p1+f*time), -c*sin(p1+f*time));
	sphere(size);
	reset();

	rotateX(time);
	//Left to right (
	let p2 = PI/2;
	displace(c*sin(p2+f*time), c * sin(p2+f*time), c*sin(p2+f*time));
	sphere(size);
	reset();

	rotateX(time);
	let p3 = PI/3;
	displace(c*sin(p3+f*time), c * sin(p3+f*time), -c*sin(p3+f*time));
	sphere(size);
	let n = vectorContourNoise(s*0.6+time*0.2, .05, 6)*.5+.5;
	expand(n.z*.1)
	reset();

	//for (let i = 1; i < 1; i++){
	//  	let coef = 0.1;
	//  	let p = i * PI/2;
	//  	displace(coef * sin(p + time), coef*sin(p + time), coef*sin(p+time));
	//  	rotateX(p);
	//  	rotateY(p);
	//  	rotateZ(p);
	//	sphere(0.1);
	//}
}





//Template
//Morphing Scales Animation
//https://shaderpark.com/user/clemzio
export function spCode() {
	setGeometryQuality(50);

	let repeatSpace = (scale, spacing, counts) => {
	  spacing *= 2 * scale;
	  counts -= 1;
	  const s = getSpace();
	  const rounded = floor(s / spacing + 0.5);
	  const clamped = vec3(
		clamp(rounded.x, -1 * counts.x, counts.x),
		clamp(rounded.y, -1 * counts.y, counts.y),
		clamp(rounded.z, -1 * counts.z, counts.z)
	  );
	  displace(spacing * clamped);
	  // return instance x, y, z index
	  const coordScaled = s / (spacing);
	  const index = floor(coordScaled + 0.5);
	  return {
		"index": index, 
		"local": coordScaled-index 
	  };
	}

	const repeatBox = shape((scale, spacing, count) => {
	  const { index, local } = repeatSpace(scale, spacing, counts);
	  color(vec3(
		ncos(time), 
		nsin(time), 
		0.5
	  ));
	  displace(vec3(
		0, 
		0, 
		nsin(time * 2.6 + local.x) * 0.7 +
		ncos(time * 1.6 + local.y) * 0.7 - 1.0
	  ));

	  sphere(nsin(time * 1.2) * 1.5 + 0.3);
	});

	// dimensions of box
	const scale = vec3(0.5, 0.5, 0.5);
	// extra instances to add in each axis
	const counts = vec3(50, 50, 0);
	// spacing along each axis, in units of scale
	const spacing = vec3(1, 1, 1) * 0.3;
	// shape to draw at each instance
	repeatBox(
	  scale,
	  spacing, 
	  counts
	);
}


//Template
//Thin Layer Wave Distortion Animation
//https://shaderpark.com/user/martino
export function spCode() {
	let s = getSpace();
	let scale = input(2, 0, 10)
	let n = vectorContourNoise(s*scale+time, .05, 2)*.5+.5;
	//n = nsin(n*4)
	color(n)

	//sphere(0.5+n*.1);
	//torus(.5+n*.1, .2)
	box(1, n.y*.1+.02, 1)

}


//Template
//Spirals
//https://shaderpark.com/user/rbytes
export function spCode() {
	let halfSpiral = shape((x, y) => {
	  rotateX(Math.PI/2);
	  color(0, 1, 0);
	  torus(0.3, 0.08);
	  shell(0.005);
	  difference();
	  displace(0, 0, .21);
	  box(.5,.2,.2);
	});

	let spiral = shape((x, y) => {
	  halfSpiral();
	  rotateX(PI);
	  displace(.025,0,.119);
	  rotateY(-.4);
	  halfSpiral();
	})

	displace(.3, 0, -.6);
	rotateZ(time/2);
	for(let x=0; x<6; x++){
	  spiral();
	  displace(-.05,0,.236);
	  spiral();
	}

}



//Template
//Ripples
//https://shaderpark.com/user/rbytes
export function spCode() {
	setStepSize(0.2);
	  let buttonHover = 1;
	  let click = 1;
	  setStepSize(0.3);

	  rotateY(time * 0.2);
	  let warpedSpace = warpSpace(getSpace());
	  metal(0.9);
	  shine(1);
	  color(1 - warpedSpace);
	  torus(0.8, 0. + length(warpedSpace) * 0.2);
	  expand(buttonHover * 0.08);

	  function warpSpace(p) {
		let t = time / 4;
		rotateY(getRayDirection().y * (1 - click) * 4);
		p = getSpace().x * 2.0 * (vec3(0.5, 0.2, 0.1) + p);
		for (let i = 1.0; i < 3.0; i += 1.0) {
		  p.x = p.x + buttonHover * sin(3.0 * t + i * 1.5 * p.y) + t * 0.5;
		  p.y = p.x + buttonHover * cos(3.0 * t + i * 1.5 * p.x);
		}
		return 0.5 + 0.5 * cos(time + vec3(p.x, p.y, p.x) + vec3(0, 2, 4));
	  }
}




//Template
//Crystal
//https://shaderpark.com/user/tblankensmith
export function spCode() {
	setMaxReflections(2)

	setMaxIterations(4)
	rotateX(PI/4)

	function gyroid(scale) {
	  let s = getSpace();
	  s = floor(s*3+time*.1)* scale;
	  return dot(sin(s), cos(vec3(s.z, s.x, s.y) +PI))/ scale ;
	}
	//setMaxIterations(100)
	setStepSize(.3);
	let noiseScale = input(20, 0, 200);
	//let n = noise(getSpace()*3);
	//backgroundColor(n, n, n);

	shine(.4)
	metal(.6);

	let gyScale = input(16, 0, 200);
	let gy = gyroid(gyScale);
	let n = vectorContourNoise(getSpace()*5 + vec3(0, 0, time*.1), gy, 1.2);
	n = pow(sin(n*2)*.5 +.5, vec3(4))
	color(n)
	reflectiveColor(n*4)
	sphere(.6+n.x*.00);
	difference();
	setSDF(gy);



}



//Template
//Torus Ball Break Apart Combine Animation
//https://shaderpark.com/user/tblankensmith
export function spCode() {
	let duration = time / 30 * TWO_PI;
	let oscillation = clamp((abs(sin(duration)) - .8 ) * 2, 0.0, 0.5);

	let col = pow(sin(10 * length(getSpace())), 2);
	let normalOffset =  1 - vec3(normal.x, normal.y, normal.z + 2);
	//color(vec3(col, 0, 0) + normalOffset);
	color(vec3(0, 1, 0));

	let explodedTorus = shape(() =>{
	  color(vec3(0, 1, 0));
	  rotateX(PI / 2);
	  mirrorXYZ();
	  displace(0.09 * abs(sin(duration * 4)) - 0.01);
	  torus(0.2, 0.1);
	  shell(0.01);
	  displace(0.2, 0.2, 0.2);
	  intersect();
	  box(0.2, 0.2, 0.2);
	});

	let innerSpheres = shape((count) => {
	  for(let i = 0; i < count; i++) {
		displace(cos(duration * 20 + i) * .25, sin(duration * 20 + i) * .25, 0);
		color(vec3(0, .2, 1));
		sphere(0.04);
		reset();
	  }
	});

	let layoutGrid = (reps, spacerSize, draw) => {
	  for(let i = 0; i < reps; i++) {
		repeat(vec3(spacerSize * i, spacerSize * i , spacerSize * i) , vec3(reps, reps, reps));
		draw(i / reps);
	  }
	}

	blend(0.1);
	layoutGrid(3, 0.05, () => sphere(0.01));
	reset();
	rotateY(duration * -4);
	mixGeo(oscillation); // blends between geo
	shape(()=> {
	  explodedTorus();
	  displace(cos(duration * 4 + PI / 2) * .5, 0, sin(duration * 8 + PI) * .5);
	  color(vec3(1, 0, 0));
	  sphere(0.1);
	  reset();
	  innerSpheres(4);
	})();



}


//Template
//Rainbow Shell Melting
//https://shaderpark.com/user/tblankensmith
export function spCode() {
	setStepSize(1.1);
	setMaxIterations(50);

	let s = getSpace();
	let n = noise(s);

	color(normal + n);
	sphere(0.5 + ncos(time) * 0.2);

	difference();
	displace(vec3(0.1, 0.1, 0.1));
	sphere(0.5);

	color(vec3(1.0, 1.0, 0));
	shine(10.0 + nsin(time) * 1000.0);
	union();
	displace(vec3(-0.1, -0.1, -0.1));
	sphere(0.3 + nsin(time) * 0.2);

	difference();
	displace(vec3(-0.01, -0.01, -0.01));
	sphere(0.3 + sin(n * 0.4 + time));

}



//Template
//Morphing Cylinder Blend
//https://shaderpark.com/user/bswift84
export function spCode() {
	color(.2,.5,.9)
	metal(.9)
	shine(.9)


	cylinder(.5,1,1)

	difference()
	blend(.2)

	rotateX(time)
	rotateY(time)
	// Define the rectangle (box)
	let rectangle = box(1.2, 0.1, 0.05);
	difference();
	mixGeo(nsin(time))


	color(.5,.3,.1)
	// Define the circle (sphere)
	let circle = sphere(0.9);

}


//Template
//Plaid Block
//https://shaderpark.com/user/rbytes
export function spCode() {
	rotateY(time/2);
	rotateZ(time/2);
	color(.4,.2,.6);
	let s = getSpace();
	let sz = 0.65;
	s = sin(tan(sz+s+s+s+sz+s+s+s+sz));
	color(s);
	box(sz,sz,sz);

}




//Template
//Licorice Rotation Animation
//https://shaderpark.com/user/rbytes
export function spCode() {
	shape(() => {
	  let s = getRayDirection();
	  color(.8,0,0);
	  shine(3);
	  rotateZ(PI/2);
	  rotateX(s.y*14+time*6);
	  box(vec3(.9,.05,.05));
	})();
	difference();
	cylinder(.025,.95);
}

//Template
//Christmas Light Bulbs
//https://shaderpark.com/user/rbytes
export function spCode() {
	let ornament = shape(() => {
	  blend(0.2)
	  sphere(0.2)
	  displace(0,.15,0)
	  cylinder(0.02, 0.15);
	  displace(0,-.33,0)
	  cylinder(0.0, 0.15);
	});

	metal(.9)
	shine(0.9)
	displace(-.6,.4,0);
	let saturation = 1;
	let value = 1;


	for (let ct=0; ct<4; ct++){
	  let hue = ct/8;
	  let col = hsv2rgb(vec3(hue, saturation, value));
	  color(col)
	  ornament();
	  displace(0,.32,0);
	  color(.8,.8,.8);
	  cylinder(0.038, 0.02);
	  displace(0,.06,0);
	  rotateX(PI/2);
	  torus(.04,.005);
	  rotateX(-PI/2);
	  displace(.4,-.38,0);
	}


	displace(-1.6,-.8,0);
	for (let ct=0; ct<4; ct++){
	  let hue = .5+ct/8;
	  let col = hsv2rgb(vec3(hue, saturation, value));
	  color(col)
	  ornament();
	  displace(0,.32,0);
	  color(.8,.8,.8);
	  cylinder(0.038, 0.02);
	  displace(0,.06,0);
	  rotateX(PI/2);
	  torus(.04,.005);
	  rotateX(-PI/2);
	  displace(.4,-.38,0);
	}
}




//Template
//Sheriff Badge with Holes
//https://shaderpark.com/user/rbytes
export function spCode() {
	// from https://iquilezles.org/articles/distfunctions/
	// imported to Shader Park by Richard Bourne

	let prism = glslSDF(`
	float sdTriPrism( vec3 p, vec2 h )
	{
	  vec3 q = abs(p);
	  return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);
	}`);
	shine(1);
	lightDirection(0, 0, 1);
	//alternatively lightDirection(vec3(0, 0, 1));
	color(1,.7,0);
	shine(.7);
	prism(vec2(.5, .01));
	rotateX(PI);
	prism(vec2(.5, .01));
	displace(0,.5,0)
		sphere(.04);
		displace(0,-1,0)
		sphere(.04);
		displace(.43,.25,0)
		sphere(.04);
		displace(-.86,0,0)
		sphere(.04);
		displace(0,.5,0)
		sphere(.04);
		displace(.86,0,0)
		sphere(.04);
		reset();
	difference();
	rotateX(PI/2);
	displace(.06,.0,0);
	cylinder(.04,.03);
	displace(-.12,0,.1);
	cylinder(.04,.03);
	displace(.05,0,-.2);
	cylinder(.04,.03);

}


//Template
//Mountain Line Animation
//https://shaderpark.com/user/rbytes
export function spCode() {
	let floorScale = 5+abs(sin(time))*20

	let cosPallette = (t, brightness, contrast, osc, phase) => {
	  return brightness + contrast * cos(PI*2*(osc*t+phase));
	}

	let s = getSpace();
	color(cosPallette(2+8*s.y*4, vec3(0), vec3(.9), vec3(0, .92, .4), vec3(.1)));
	sphere(0.4);
	displace(0, -.8 + sin(s.x*floorScale)/floorScale + 
					  cos(s.z*floorScale)/floorScale, 0)
	box(100, .15, 100);

}

//Template
//Grid
//https://shaderpark.com/user/rbytes
export function spCode() {
	// Define the signed distance function (SDF) of your object here
	float surfaceDistance(vec3 p) {
		return sphere(p, 0.484);
	}

	float checkers(vec2 p, vec2 dpdx, vec2 dpdy ){
		vec2 w = max(abs(dpdx), abs(dpdy));
		vec2 i = 2.0*(abs(fract((p-0.5*w)*0.5)-0.5)-
					  abs(fract((p+0.5*w)*0.5)-0.5))/w;
		return 0.5 - 0.5*i.x*i.y;                  
	}

	float crosses( in vec2 p, in vec2 dpdx, in vec2 dpdy )
	{
		const float N = 3.0;
		vec2 w = max(abs(dpdx), abs(dpdy));
		vec2 a = p + 0.5*w;                        
		vec2 b = p - 0.5*w;           
		vec2 i = (floor(a)+min(fract(a)*N,1.0)-
				  floor(b)-min(fract(b)*N,1.0))/(N*w);
		return 1.0-i.x-i.y+2.0*i.x*i.y;
	}

	// Here you can define how your object at point p will be colored.
	vec3 shade(vec3 p, vec3 normal) {
		vec3 lightDirection = vec3(0.253,0.780,-0.079);
		float light = simpleLighting(p, normal, lightDirection);

		vec2 xp = vec2(0.170,0.020);
		vec2 yp = vec2(0.064* cos(time),-sin(time));

		float grid = checkers(p.xy*20.000*osc(0.05, 2.0), xp, yp);
		float crosses = crosses(p.xy*20.000*osc(0.05, 2.0), xp, yp);
		grid = mix(grid, crosses, osc(0.3, 2.0));    
		light = grid * light;
		vec3 color = vec3(light, 0, light);
		return color;
	}


}


//Template
//Cylinder Color Rainbow
//https://shaderpark.com/user/rbytes
export function spCode() {
	shine(10);
	displace(0,1, 0);
	for (let i=0; i<20; i++) {
	  let col = hsv2rgb(vec3((i / 20), 1.0, 1.0));
	  color(col);
	  cylinder(.75,.05);
	  displace(0,-.1, 0);
	}

}


//Template
//RIpple Cube in Cube
//https://shaderpark.com/user/kylehung
export function spCode() {
	let tScale = 2;
	let lineThickness = 3;
	let rings = nsin(time*tScale)*200+1;
	lightDirection(1,3,1)
	metal(.3);
	shine(.8)
	occlusion(-3);
	let col = getRayDirection()
	shape(() => {
	  rotateX(nsin(time*tScale)*PI);
	  rotateY(nsin(time*tScale)*PI);
	  rotateZ(nsin(time*tScale)*PI);
	  color(col)

	  boxFrame(vec3(.5, .5, nsin(time*tScale)*.5), lineThickness)
	})();
	rotateX(PI/3)
	mixMat(0.5);
	blend(.1);

	let v = sin(rings*getSDF());
	sphere(0.3);
	displace(0.0,-.5,0.0)


	color(col+(v*.3))
	box(10,0.3,10)

}




//Template
//RIpple Cube in Cube
//https://shaderpark.com/user/kylehung
export function spCode() {
	let tScale = 2;
	let lineThickness = 3;
	let rings = nsin(time*tScale)*200+1;
	lightDirection(1,3,1)
	metal(.3);
	shine(.8)
	occlusion(-3);
	let col = getRayDirection()
	shape(() => {
	  rotateX(nsin(time*tScale)*PI);
	  rotateY(nsin(time*tScale)*PI);
	  rotateZ(nsin(time*tScale)*PI);
	  color(col)

	  boxFrame(vec3(.5, .5, nsin(time*tScale)*.5), lineThickness)
	})();
	rotateX(PI/3)
	mixMat(0.5);
	blend(.1);

	let v = sin(rings*getSDF());
	sphere(0.3);
	displace(0.0,-.5,0.0)


	color(col+(v*.3))
	box(10,0.3,10)

}


//Template
//Pyramid Animations
//https://shaderpark.com/user/kylehung
export function spCode() {

	const pyramid = glslSDF(` 
	//pyramid from https://www.shadertoy.com/view/Xds3zN
	float sdPyramid( in vec3 p,   float scale, in float h )
	{
		float m2 = h*h + 0.25;

		// symmetry
		p.xz = abs(p.xz);
		p.xz = (p.z>p.x) ? p.zx : p.xz;
		p.xz -= 0.5*scale;

		// project into face plane (2D)
		vec3 q = vec3( p.z, h*p.y - 0.5*p.x, h*p.x + 0.5*p.y);

		float s = max(-q.x,0.0) ;
		float t = clamp( (q.y-0.5*p.z)/(m2+0.25), 0.0, 1.0 );

		float a = m2*(q.x+s)*(q.x+s) + q.y*q.y;
		float b = m2*(q.x+0.5*t)*(q.x+0.5*t) + (q.y-m2*t)*(q.y-m2*t);

		float d2 = min(q.y,-q.x*m2-q.y*0.5) > 0.0 ? 0.0 : min(a,b);

		// recover 3D and scale, and add sign
		return sqrt( (d2+q.z*q.z)/m2 ) * sign(max(q.z,-p.y));
	}

	`);

	const radialRepeat = (repeats) => {
	  const s = getSpace()
	  const p = vec3(s.x, 0, s.z)
	  const angle = 2 * PI / repeats
	  const a = atan(p.z, p.x) + angle / 2
	  const r = length(p)
	  let c = floor(a / angle)
	  const ma = mod(a, angle) - angle / 2
	  const px = cos(ma) * r
	  const pz = sin(ma) * r
	  setSpace(vec3(px, s.y, pz))
	  const absC = abs(c)
	  const diff = step(absC, (repeats/2))
	  c = diff*absC + (1-diff)*c;
	  return c;
	}


	const pointer = shape( (scale, height, dotScale, idx) => {
	  displace(0,-1*scale,0);
	  const col = hsv2rgb(vec3(idx*0.17+0.1*time,1,1))
	  color(col)
	  pyramid(scale, height);
	  displace(0,scale*height+scale*dotScale,0);
	  color(1-col)
	  sphere(scale*dotScale);
	})

	const rtp = getSpherical();
	const i = radialRepeat(11);
	const wiggle = 0.01*sin(30*rtp.y+time);
	displace(0.6+wiggle,0,0);
	pointer(0.25, 2*nsin(1*time)+0.1, 0.25*nsin(3*time), i);


}


//Template
//Heart
//https://shaderpark.com/user/kylehung
export function spCode() {
	// define any sdf
	// What about a heart? :)
	function myHeart(pn, tm) { 
	  let ani = 18.0 + 3.0 *(1/2 + 1/2 * sin(2 * tm + pn.y/25.0));
	  let r = 1.1;
	  let x = 1.1*abs(pn.x);
	  let y = pn.y-1.5;
	  let z = pn.z;
	  y = 4.0 + y*1.3 - x * sqrt(max((10.0-x)/30.0,0.0));
	  y -= 0.1*ani;
	  z *= 2.0 - y/9.0;
	  let d = sqrt(x*x+y*y+z*z) - r;
	  d = d/3.0;
	  return [d,1,0.5];
	}

	let s = getSpace();
	let rad = length(s);
	let ds = myHeart(s, time);
	shine(0.9);
	metal(0.4);
	color(nsin(3*ds[1]),0,nsin(35*ds[2]));

	setSDF(ds[0]);

}

//Template
//Morphing Ridges Sphere
//https://shaderpark.com/user/happy_chimp
export function spCode() {
	let audio = input();//audio reactive olması için gerekli kod
	let s = getSpace();
	let r = getRayDirection(); //based to camera direction
	let n = noise(s*2+vec3(0,0,time) + noise(s*2+vec3(0,0,time))); //nested noise func

	color(vec3(abs(n)*0.5)+normal*0.3+vec3(0,0,1));

	sphere(0.5+n*0.1);

}

//Template
//Shapes
export function spCode() {
	// some 2d sdfs and operations 
	// All ported from 
	// https://iquilezles.org/articles/distfunctions
	// and 
	// https://iquilezles.org/articles/distfunctions2d/



	const star = glslFunc(`
	float sdStar( in vec2 p, in float r, in float n, in float m)
	{
		// next 4 lines can be precomputed for a given shape
		float an = 3.141593/n;
		float en = 3.141593/m;  // m is between 2 and n
		vec2  acs = vec2(cos(an),sin(an));
		vec2  ecs = vec2(cos(en),sin(en)); // ecs=vec2(0,1) for regular polygon

		float bn = mod(atan(p.x,p.y),2.0*an) - an;
		p = length(p)*vec2(cos(bn),abs(sin(bn)));
		p -= r*acs;
		p += ecs*clamp( -dot(p,ecs), 0.0, r*acs.y/ecs.y);
		return length(p)*sign(p.x);
	}`);

	const parallel = glslFunc(`
	float sdParallelogram( in vec2 p, float wi, float he, float sk )
	{
		vec2 e = vec2(sk,he);
		p = (p.y<0.0)?-p:p;
		vec2  w = p - e; w.x -= clamp(w.x,-wi,wi);
		vec2  d = vec2(dot(w,w), -w.y);
		float s = p.x*e.y - p.y*e.x;
		p = (s<0.0)?-p:p;
		vec2  v = p - vec2(wi,0); v -= e*clamp(dot(v,e)/dot(e,e),-1.0,1.0);
		d = min( d, vec2(dot(v,v), wi*he-abs(s)));
		return sqrt(d.x)*sign(-d.y);
	}`);

	const moon = glslFunc(`
	float sdMoon(vec2 p, float d, float ra, float rb )
	{
		p.y = abs(p.y);
		float a = (ra*ra - rb*rb + d*d)/(2.0*d);
		float b = sqrt(max(ra*ra-a*a,0.0));
		if( d*(p.x*b-p.y*a) > d*d*max(b-p.y,0.0) )
			  return length(p-vec2(a,b));
		return max( (length(p          )-ra),
				   -(length(p-vec2(d,0))-rb));
	}`);

	const opRevolve = (s, sdfFunc, o) => {
	  const q = vec2( length( vec3( s.x, s.z, 0)), s.y);
	  //q.x -= 0.2
	  return sdfFunc(q);
	};

	const opExtrude = (s, sdfFunc, h) => {
	  const d = sdfFunc(vec2(s.x, s.y)); 
	  const w = vec3( d, abs(s.z) - h, 0);
	  const maxW = vec3(max(w.x,0), max(w.y,0), 0);
	  return min(max(w.x, w.y), 0.0) + length(maxW);
	};

	const boundStar = (s) => star(s, 0.25, 7, 3);
	const boundParallel = (s) => parallel(s, 0.15, 0.15, 0.08);
	const boundMoon = (s) => moon(s+vec2(-0.2*nsin(time),0), 0.07, 0.21, 0.17);

	const allShapes = [boundStar, boundParallel, boundMoon];
	const allOperators = [opRevolve, opExtrude];

	color(0.3,0.0,0.01)
	let hu = 0;

	for (const [i, bShape] of allShapes.entries()) {
	 for (const [j, op] of allOperators.entries()) {
	   displace((i-1)*0.6, j-0.5, 0)
	   let col = hsv2rgb(vec3(hu, 1, 1));
	   color(col);
	   hu += .15;
	   setSDF(op(getSpace(), bShape, 0.3))
	   reset()
	 }
	}


}

//Template
//Coffee Float Animation
export function spCode() {
	let diameter = input(.5);
	let height = input(.4);
	let offset = .05;

	let s = getSpace();

	let n = noise(s);

	color(0.2*n, 0, 0.3+2*n);
	displace(0, 0.2*sin(time), 0);

	cylinder(diameter, height);

	rotateY(time);

	rotateX(PI/2);
	displace(0.5, 0.3, 0);

	blend(.3);
	color(0.7+n, 0, 0.9*n);
	torus(0.3, .05);

	displace(0, -0.6, 0);
	torus(0.3, .05);

	reset();
	difference();
	displace(0, offset+0.2*sin(time), 0);
	cylinder(diameter-offset, height);


	reset();
	union();


	displace(0, 0.6+0.2*sin(PI/2+time), 0);

	let wave = 0.03*sin(28*s.y+time*10+10*n);

	color(0.5+n, 0, 0.75-n);
	sphere(0.3 + wave +0.1*sin(time) );


}


//Template
//Links
export function spCode() {
	const baseSegment = shape( (sz, reps) => {
	  link(sz, sz, sz*0.5)
	  rotateY(0.5*PI + 0)
	  displace(0,sz*1.0,0)
	  rotateX(0.5*PI/reps)
	  displace(0,sz*2,0)

	  link(sz, sz, sz*0.5)
	})

	const segmentToLoop = shape( (innerSegment, sz, reps) => {
	  // Two separate sets to avoid overlapping repeating regions
	  const idxA = repeatRadial(reps)
	  displace(0,0,-0.0*sz)
	  displace(sz*9.5,0,0)
	  rotateX (PI*0.5)
	  innerSegment(5*sz/reps, reps)
	  reset()

	  rotateY(1*PI/reps)
	  const idxB = repeatRadial(reps)
	  displace(0,0,-0.0*sz)
	  displace(sz*9.5,0,0)
	  rotateX (PI*0.5)
	  innerSegment(5*sz/reps, reps)
	})

	occlusion(0.5)
	const layers = 3
	const {index, local} = repeatLinear(vec3(1), vec3(1,0.14,1), vec3(1,layers,1))
	const nHeight = index.y+layers
	metal(0.1)
	shine(0.85)
	color(vec3(0.6,0.7,0.8)-0.5*pow(nHeight,0.2))
	const off = pow(2, nHeight)
	rotateY(0.1*time*(0.05+layers-index.y))
	segmentToLoop(baseSegment, 0.05, 2+off)



	//baseSegment(0.05, 1)

}


//Template
//Pully Reels
export function spCode() {
	let s = getSpace();
	setStepSize(.99);
	setMaxIterations(40);

	let pulley1 = shape(() => {  // 
	  displace(-.7,0,-.6);
	  rotateY(.5);
	  rotateX(PI/2);
	  color(.2,.2,.5);
	  shine(.8);
	  color(.2,.5,.2);
	  shine(.8);
	  displace(.9,0,0);
	  rotateY(4*time*5/7)
	  cylinder(0.7, 0.1);  // green pulley
	  difference();
	  torus(0.7, 0.06);    // green groove
	  cylinder(0.04,0.6);  // green center hole
	  displace(-.2,0,0);
	  cylinder(0.1,0.6);   // mauve side hole 1
	  displace(.4,0,0);
	  cylinder(0.1,0.6);   // mauve side hole 1
	})

	let pulley2 = shape(() => {
	  displace(-.7,0,-.6);
	  rotateY(.5);
	  rotateX(PI/2);
	  color(.2,.2,.5);
	  shine(.8);
	  displace(-.5,0,0);
	  rotateY(4*time)
	  cylinder(0.5, 0.1);  // mauve pulley
	  difference();
	  torus(0.5, 0.06);    // mauve groove
	  cylinder(0.04,0.6);  // mauve center hole
	  displace(-.2,0,0);
	  cylinder(0.1,0.6);   // mauve side hole 1
	  displace(.4,0,0);
	  cylinder(0.1,0.6);   // mauve side hole 2

	})
	pulley1()
	pulley2()

	let belt = shape(() => {
	  union();
	  color(0,0,0);
	  shine(.8);
	  displace(.1,0,-.16);
	  rotateX(PI/2);
	  rotateZ(.5);
	  torus(0.668, 0.03); // belt around green pulley
	  displace(-.45,0,0)
	  difference();
	  box(.4,.12,.7);     // box cutting green pulley belt
	  union();
	  displace(-.99,0,0);
	  torus(0.46, 0.03);  // belt around mauve pulley
	  displace(.22,0,0)
	  difference();
	  box(.3,.12,.57);    // box cutting mauve pulley belt
	  union();
	  displace(-.004,0,-.495);
	  rotateZ(PI/2);
	  rotateX(.144);
	  displace(0,-.46,0);
	  cylinder(.03, .76); // top belt between pulleys
	  rotateX(-.15);
	  displace(0,0,.985);
	  rotateX(-.14);
	  displace(0,0,.135);
	  cylinder(.03, .76); // bottom belt between pulleys
	})
	belt();

  

}

//Template
//Gears
export function spCode() {
	occlusion(0.6)
	//setMaxReflections(2)

	const gear = shape( (rad, thick, hole, teethCount, teethLength) => {
	  cylinder(rad-teethLength, thick);
	  difference()
	  cylinder(hole, thick*1.1)
	  union()
	  const idx = repeatRadial(teethCount);
	  const edge = thick*0.25;
	  const padded = thick-edge;//*1.01;
	  displace(rad,0,0)
	  shape( () => {
		displace(-0.5*teethLength,0,0)
		box(teethLength,padded,rad/teethCount)
		expand(edge)
	  })()
	});

	const gearASM = shape( (r, t, s) => {
	  rotateY(time*s)
	  metal(0.3)
	  shine(0.3)
	  color(0.0,0.1,0.5)
	  gear(r, 0.05, r*0.15, t, 0.02)
	  reset()
	  displace(r+0.5*r,0,0)
	  rotateY(-2*time*s)
	  color(0.9,0.1,0.0)
	  gear(r*0.5, 0.05, r*0.15, 0.5*t, 0.02)
	});

	displace(-0.5,0,0)
	rotateX(-PI*0.5)
	const {index, local} = repeatLinear(vec3(1), vec3(0.1), vec3(1,5,1));
	gearASM(0.5+0.0*index.y, 22, 0.8+0.5*index.y)
}




//Template
//Singularity
export function spCode() {
	setMaxIterations(50)

	function mapSliderToMinMax(sliderValue, value0, value1) {
	  const range = value0 - value1;
	  // Map the slider value to the range, but reverse the calculation using (1 - sliderValue)
	  const mappedValue = value0 - (1 - sliderValue) * range;
	  return mappedValue;
	}

	function mapValues(masterNormalized) {
	  const degreeRange1 = 3.2 - 1.8;
	  const relationRange2 = 0.8 - 0.37;
	  const degreeRange3 = 3.2 - 1.8;
	  let degree, relative;
	  degree = 1.8 + masterNormalized * (degreeRange1 / 0.3);
	  relative = 0;

	  relative += (masterNormalized > 0.3 && masterNormalized <= 0.6) * (masterNormalized - 0.3) * (relationRange2 / 0.3);

	  degree -= (masterNormalized > 0.6) * (masterNormalized - 0.6) * (degreeRange3 / 0.4);
	  relative += (masterNormalized > 0.6) * 0.8;

	  // Default values in case masterNormalized doesn't match any conditions
	  degree = degree || 1.8;
	  relative = relative || 0.5;  
	  return {degree: degree, relative: relative}
	}
	//setStepSize(.1)
	let attract = input(0.5,0,1)
	let speed = input(0.3, 0.1, 1.3)
	// movements
	let masterNormalized = input(0,0,1)

	// Default values in case masterNormalized doesn't match any conditions
	//relative = relative || 0.5;

	let relative = mapSliderToMinMax(masterNormalized,0.37,0.8)
	let degree = mapSliderToMinMax(masterNormalized,3.2,1.8)

	let nscale = input(1.2, 0, 10);
	let nAmplitude = input(2, 0, 2);
	let hueOffset = 0.3;
	let rings = input(1, 0, 100);
	let mixAmt = input(1)
	let s = getSpace();
	let samplePos = vec3(0, 0, -degree) * .2 +(degree*.1);
	let n = noise(samplePos);
	let n1 = nsin((noise(samplePos)) * rings );
	let n2 = nsin((noise(samplePos + hueOffset)) * rings);
	let n3 = nsin((noise(samplePos + hueOffset * 2.2)) * rings);
	let col = pow(vec3(n1, n2, n3), vec3(7));
	let horizon = shape(() => {
		rotateX(PI/2);
		torus(1.5, 1.39);
		expand(n*nAmplitude)
		setGeometryQuality(80)
		sphere(.1);
		blend(5);
		});  
	//
	let fractalBall = shape(() => {
		let s = getSpace();
		let position = vec3(mouse.x, mouse.y, s.z);
		let amplitude = .9;
		let k = fractalNoise(s + speed*time) * 0.1;
		sphere(0.5);
		expand(k);
	  });


	color(col);
	horizon();
	//color(30/255,157/255,196/255);
	//rotateY(time*1)
	mixGeo(relative)
	//rotateX(Math.PI/2);torus(1, .2)
	//reset()
	//mixGeo(relative)
	fractalBall()
}




//Template
//Breathing Cloud
export function spCode() {
	let s = getSpace();
	blend(.07);

	shape(() => {
	  displace(0.26,sin(s.y*2+time)*0.05, 0);
	  sphere(0.2);
	})();

	shape(() => {
	  displace(-.2,sin(s.y*2+time)*0.05+.2, 0);
	  sphere(0.19);
	})();

	displace(0,sin(s.y*2+time)*0.05, 0);
	//let n = 0.003*noise(1.0 * s + time);
	sphere(0.3);


}

//Template
//Bouncing Mutating Orbs
export function spCode() {
	let _x = input(.5) 
	_x = _x*.3
	let _y = input(.5) 
	_y = _y +.1
	let _s = input(.5)
	let _m = input(.5)
	let _t = input(.5)
	_m = _m*.5 + .1


	function psine(f, t, p) {
		return sin(2 * PI * f * t + p);
	}


	metal(0.8);
	shine(0.4);

	let oldpt = vec3(0, 0, 0);
	let newpt = vec3(0, 0, 0);

	blend(_t);

	for (let i = 0; i < 8; i++) {
		color(vec3(nsin(time),ncos(time),.5));
		reset();
		displace(-0.8, 0, 0);
		let x = i*_x;
		let y = _y*sin(2 * PI * 1/2 * time + 2*PI*(_m)*i)
		displace(x, y, 0);
		sphere(0.1*_s);
		newpt = vec3(x, y - 0.3, 0);
		reset();
		displace(-0.8, 0, 0);
		oldpt = newpt;
	}



}



//Template
//Morphin Sphere
export function spCode() {
	let strength = input(0.6, 0, 1);
	let twistMix = input();
	setStepSize(.3);

	color(0,0,0);
	box(1,1,.01);


	rotateY(time * .2);
	let warpedSpace = warpSpace(getSpace());
	metal(.9);
	shine(1);
	color(1 - warpedSpace);
	sphere(.2 + length(warpedSpace) * .2);

	function warpSpace(s) {
	  let t = time / 4.;
	  rotateY(getRayDirection().y * (1 - twistMix) * 12);
	  s = getSpace().x * 8.0 * (vec3(0.5, .2, .1) + s);
	  for(let i = 1.0; i < 3.0; i += 1.0) {
		s.x = s.x + strength * sin(2.0 * t + i * 1.5 * s.y) + t * 0.5;
		s.y = s.y + strength * cos(2.0 * t + i * 1.5 * s.x); 
	  }
	  return 0.5 + 0.5 * cos(time + vec3(s.x, s.y, s.x) + vec3(0., 2., 4.));

	}
}

//Template
//Lava Lamp Directional
export function spCode() {
	setStepSize(.2);

	lightDirection(mouse.x  ,mouse.y  , mouse.z );

	let ray = getRayDirection();
	let scale = 3.0;
	let s = getSpace();
	let n = .6 * noise(scale * s + time/4 );
	let red = vec3(9.14,.0,0.0);
	// Convert to HSV
	let hsv = rgb2hsv(red);
	// Shift hue
	hsv.y += n / 7;
	// Convert back to RGB
	let shifted = hsv2rgb(hsv);
	// Draw sphere
	metal(.8);
	mixMat(.1);
	color(shifted);
	displace(mouse.x / 15,mouse.y / 15,mouse.z / 15)
	sphere(0.1 + n);
}


//Template
//Stacked Sphere Crescents
export function spCode() {
	let hover = input(0, 0, 1);
	let click = input(0, 0, 1);
	let scroll = input();
	lightDirection(getRayDirection());
	metal(.4);
	shine(.7);
	let sCurve = shape((size, innerOffset) => {
		sphere(size);
		difference();
		let s = getSpace();
		displace(0.1, innerOffset, s.z);
		sphere(size-.03);
		expand(.00)
	});
	let s = getSpace();
	let col = vec3(0, .1, length(normal));
	color(col+normal*.1)
	rotateX((sin(time))*.04);
	rotateZ((sin(time))*.04);
	rotateY((cos(time))*.1);
	shape(() => {
	for(let i = 0; i < 3; i++) {
		blend(.1);
		// let rot = 4 * sin(time * .2) * .5 * hover;
		let rot = hover;
		rotateX(rot);
		rotateY(rot);
		rotateZ(rot);
		sCurve(1*(i/3)+.3, .2);
	}
	sphere(.15);
	})();

	mixGeo(nsin(time)*.22+.9 * 1-click);
	sphere(.8)   
}


//Template
//Clouds
export function spCode() {

	let scale = input(1.,0.01,2.);
	let s = getRayDirection();
	let n = noise(getSpace()+fractalNoise(s*scale+vec3(0.1,0.0,time/8)));

	color(.2,0.13,.2);
	occlusion(.6);

	box(vec3(3));
	expand(1)
	shell(.02);

	reset();


	color(vec3(n)*0.25+vec3(0.2,0.2,.3)+(normal/40));
	displace(0, -1, 0);
	box(5, .6+(n*0.1), 5)

	displace(0, 2, 0);
	box(5, .7-(n*0.1), 5)
}

//Template
//Marble Animation
export function spCode() {
	// idea from https://www.iquilezles.org/www/articles/warp/warp.htm

	function fbm(p) {
	  return vec3(
	  fractalNoise(p),
	  fractalNoise(p+20000),
	  0
	  )
	}

	let t = time*0.0001
	let s = enable2D()
	s = 0.7*vec3(s.x, s.y, 0)+5 * (t / 200)
	let n = fbm(fbm(fbm(fbm(s)/2*sin(time/4))))*0.9+2
	color(n)

	console.log(fbm)
}


//Template
//Reverse Fire
export function spCode() {
	let s = getSpace();

	let n = noise(s*8+time*.5);
	setStepSize(.7);
	setMaxIterations(100);
	color(s);
	sphere(0.6+n*.04);
	blend(.4);

	displace(.42)
	box(s*n*.5)
}



//Template
//Shader
export function spCode() {
	//Shader Park Code
}

*/

//I need to automate the export process and component creation or just buck up and do it one day, don't forget to index it and create a scene showcase as well as base auxl object cores to dup

//
//Exported Shaders

//Testing
export function spCodeTest() {
//
}

//Bubbly Soup | Soft Clouds
export function spCloud() {
	let scale = 1.5;
	let s = getSpace();
	let n = 0.1*noise(scale * s + time);
	sphere(0.42 + n);
}


//Template
//Breathing Cloud
export function spRandom0() {
	//union();
	//difference();
	//intersect();


	difference();

	//Sphere
	sphere(0.3);

	//Cube
	box(0.2, 0.2, 0.2);
	expand(0.1);
	displace(0, 0, 2);
	//union();
	//Cube Outline
	boxFrame(vec3(.4), .02);

	//Torus
	rotateX(Math.PI/2);
	torus(0.3, 0.08);
	//intersect();
	//Line
	let pos1 = vec3(-0.2, -0.2, -0.2);
	let pos2 = vec3(0.2, 0.2, 0.2);
	line(pos1, pos2, 0.02);

	//Cylinder
	cylinder(0.3, 0.3);

	//Cube Grid Space
	grid(2, .2, .04);

//
}














/*

//Shapes
export function spCode() {
	//Sphere
	sphere(0.3);

	//Cube
	box(0.3, 0.3, 0.3);

	//Cube Outline
	boxFrame(vec3(.4), .02);

	//Torus
	rotateX(Math.PI/2);
	torus(0.3, 0.08);

	//Line
	let pos1 = vec3(-0.2, -0.2, -0.2);
	let pos2 = vec3(0.2, 0.2, 0.2);
	line(pos1, pos2, 0.02);

	//Cylinder
	cylinder(0.3, 0.3);

	//Cube Grid Space
	grid(2, .2, .04);
}


//Combine
export function spCode() {
	//Combine
	union();

	//Sphere
	sphere(0.35);
	//Cube
	box(0.3, 0.3, 0.3);
}

//Subtract
export function spCode() {

	//Cube
	box(0.3, 0.3, 0.3);
	//Subtract
	difference();
	//Sphere
	sphere(0.35);

	//Sphere
	sphere(0.35);
	//Subtract
	difference();
	//Cube
	box(0.3, 0.3, 0.3);

}




//intersect
export function spCode() {

	//Cube
	box(0.3, 0.3, 0.3);
	//intersect
	intersect();
	//Sphere
	sphere(0.35);

}


//Blend 2 Geometries
export function spCode() {
	blend(0.23);
	//Box
	displace(-0.25, 0, 0);
	box(0.2, 0.2, 0.2);
	//Sphere
	displace(0.5, 0, 0);
	sphere(0.2);

}


//Mix Between 2 Geometries | Animate
export function spCode() {
	sphere(0.3);
	mixGeo(abs(sin(time)));
	box(0.3, 0.3, 0.3);

}


//Hollow out a shape and creates a shell around with the provided thickness.
export function spCode() {
	lightDirection(0, 0.2, 0.2);
	sphere(0.3);
	shell(0.02);
	displace(0.2, 0.2, 0.2);
	difference();
	box(0.2, 0.2, 0.2);

}



//Expand Geometry
//Rounded Edge Cube
export function spCode() {
	box(0.2, 0.2, 0.2);
	expand(0.1);

}
*/





