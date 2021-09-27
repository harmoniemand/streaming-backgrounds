
let url = new URL(window.location.href);

console.log(url.searchParams.get("speed"))

const SEGMENT_LENGTH = 20;
const SCALING = url.searchParams.get("scale") ? parseInt(url.searchParams.get("scale")) : 1500;
const DRAW_SPEED = url.searchParams.get("speed") ? parseInt(url.searchParams.get("speed")) : 3000;

console.log(DRAW_SPEED)

const pallete = [
    // enzianblau
    "#19317b",
    // persischrot
    "#e6007e",
    // pressed persischrot
    "#cd0372",
    // signalorange
    "#ea5b0c",
    // exp safrangold
    "#f59d24",
    // presser safrangold
    "#da8716",
    // exp Korallenrot
    "#e40521",
    // exp light gray
    "#e0e0e0",
    // exp medium gray
    "#b2b2b2",
];

function generateFlow(x, y) {
    //line style
    let line = new paper.Path();
    line.strokeColor = pallete[Math.floor(Math.random() * pallete.length)];
    // line.strokeColor = new Color('#e40521') + Color.random()*0.6
    line.strokeWidth = 5;
    line.strokeCap = 'round';
    line.opacity = 0.5;
    let startPoint = new paper.Point(x, y)
    line.addSegment(startPoint)

    //here is the interesting part :)
    while (paper.view.bounds.contains(line.lastSegment.point)) {
        //get an angle from the perlin noise depending on where the line end currently is
        let dir = perlin.get(line.lastSegment.point.x / SCALING, line.lastSegment.point.y / SCALING) * 360
        //make it into an vector of a certain length
        let vec = new paper.Point(0, 1).rotate(dir).multiply(SEGMENT_LENGTH);
        //add vector to and of your line
        line.lineBy(vec)
    }
    line.smooth();

    //drawing animation
    line.dashArray = [line.length, line.length];
    line.dashOffset = line.length;
    line.tweenTo({ dashOffset: 0 }, DRAW_SPEED).then(() => {
        let x = Math.floor(Math.random() * paper.view.bounds.size.width);
        let y = Math.floor(Math.random() * paper.view.bounds.size.height);
        let point = new paper.Point(x, y);
        generateFlow(point);
    })

    console.log("drawing");
    paper.view.draw();

}


window.onload = () => {

    document.body.style.backgroundColor = '#161045';

    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);

    let x = Math.floor(Math.random() * paper.view.bounds.size.width);
    let y = Math.floor(Math.random() * paper.view.bounds.size.height);
    let point = new paper.Point(x, y);
    generateFlow(point);

}

