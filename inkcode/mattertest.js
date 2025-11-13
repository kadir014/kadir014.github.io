const { Engine, Render, Runner, Bodies, Composite } = Matter;

let images = [];
let runner;
let stopped = false;
let engine;
let times = [];
let frame = 0;

const width = window.innerWidth;
const height = window.innerHeight;

setup = function(element) {
    // Configuration
    const DT = 1.0 / 1.0;
    const GRAVITY = 9.81;
    const POS_ITERS = 10;
    const VEL_IERS = 10;

    // Module aliases
    var Engine = Matter.Engine,
        Events = Matter.Events,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Body = Matter.Body;

    // Create engine
    engine = Engine.create({
        options: {
            positionIterations: POS_ITERS,
            velocityIterations: VEL_IERS,
            }
        }
    );
    engine.gravity.y = 1.0;
    engine.gravity.scale = 0.0001; // WHY???

    let zoom = 10.0;

    // Create renderer
    var render = Render.create({
        element: element,
        engine: engine,
        options: {
            width: width,
            height: height,
            background: "rgb(255.0, 255.0, 255.0, 255.0)",
            wireframes: false,

        }
    });

    render.canvas.style.filter = 'blur(0px) brightness(0.38)'; 

    Render.run(render);

    // Create runner
    runner = Runner.create();
    //runner.delta = DT;
    //runner.isFixed = true;
    Runner.run(runner, engine);

    // Create ground & walls

    let ground = Bodies.rectangle(
        (width/20)       * 10.0 / zoom,
        ((height/10) + 0) * 10.0 / zoom + 3,
        500       * 10.0 / zoom,
        5        * 10.0 / zoom,
        {
            render: {
                fillStyle: "rgb(0, 0, 0, 0)",
                strokeStyle: "rgb(0, 0, 0, 1)",
                lineWidth: 0.7 / zoom,
            }
        }
    );
    Body.setStatic(ground, true);
    ground.friction = 0.7;
    ground.restitution = 0.1;
    Composite.add(engine.world, ground);

    let walll = Bodies.rectangle(
        -3 * 10.0 / zoom,
        36 * 10.0 / zoom,
        5  * 10.0 / zoom,
        500 * 10.0 / zoom,
        {
            render: {
                fillStyle: "rgb(0, 0, 0, 0)",
                strokeStyle: "rgb(0, 0, 0, 1)",
                lineWidth: 0.7 / zoom,
            }
        }
    );
    Body.setStatic(walll, true);
    walll.friction = 0.7;
    walll.restitution = 0.1;
    Composite.add(engine.world, walll);

    let wallr = Bodies.rectangle(
        ((width / 10.0)) * 10.0 / zoom + 3,
        36         * 10.0 / zoom,
        5          * 10.0 / zoom,
        150         * 10.0 / zoom,
        {
            render: {
                fillStyle: "rgb(0, 0, 0, 0)",
                strokeStyle: "rgb(0, 0, 0, 1)",
                lineWidth: 0.7 / zoom,
            }
        }
    );
    Body.setStatic(wallr, true);
    wallr.friction = 0.7;
    wallr.restitution = 0.7;
    Composite.add(engine.world, wallr);

    // Create stacked bxes

    let cols = 10; // Columns of the stack
    let rows = 55; // Rows of the stack
    let r = 1.0 * (10.0 / zoom); // Size of the boxes
    let ygap = 0;
    let starty = -300.0;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            //let offset = 0.0;
            //let offset = y % 10 * 1.0 / zoom;
            let offset = (Math.random() * 2.0 - 1.0) * (20.0 / zoom);

            //let r2 = Math.random() * (25 - 7.5) + 7.5;
            //let r2 = Math.random() * (18.75 - 3.75) + 3.75;

            let rw = r + 7.5;

            hue = Math.random() * 360.0;

            let box = Bodies.rectangle(
                (width / (2*zoom) - cols * (rw/2) + (rw/2) + rw * x + offset),
                ((starty/zoom) - r - y * (r + ygap)),
                r + Math.random() * 4.0,
                r + Math.random() * 4.0,
                {
                    render: {
                        fillStyle: `hsl(${hue}, 100%, 50%, 1)`,
                        strokeStyle: "rgb(0, 0, 0, 1)",
                        lineWidth: 0.7 / zoom,
                    }
                }
            );
            box.friction = 0.5;
            box.restitution = 0.1;
            box.frictionAir = 0.0;

            Composite.add(engine.world, box);
        }
    }

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(
            engine, 
            {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            }
        );
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: width / zoom, y: height / zoom}
    });

    let fps_list = []
    const average = array => array.reduce((a, b) => a + b) / array.length;

    Events.on(render, "beforeRender", function(event) {
        render.context.fillStyle = "red";
        render.context.fillRect(0, 0, width, height);
    });

    Events.on(render, "afterRender", function(event) {
        render.context.font = "12px Montserrat";
        render.context.fillStyle = "black";
        let fps = 1.0 / engine.timing.lastElapsed * 1000.0;
        fps_list.unshift(fps);
        if (fps_list.length > 15) {
            fps_list.pop();
        }
        let avg_fps = average(fps_list);
        if (avg_fps == Infinity) avg_fps = 165.0;
        // render.context.fillText("FPS: " + avg_fps.toFixed(1), 8, 15);
        // render.context.fillText("Physics: " + engine.timing.lastElapsed.toFixed(2) + "ms", 8, 31);
        // render.context.fillText("Render: " + 0.0 + "ms", 8, 47);
        // render.context.fillText("Frame: " + frame, 8, 63);
        times.push(engine.timing.lastElapsed);
        frame++;

        // if (!stopped) {
        //     images.push(render.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        //     console.log(images.length);
        // }
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


setup(document.querySelector('#matter_canvas'));