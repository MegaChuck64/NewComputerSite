
function command(e) {
    // look for window.event in case event isn't passed in

    e = e || window.event;
    if (e.keyCode === 13) {
        var output = document.getElementById("output");
        var input = document.getElementById("input");

        var outstr = input.value.toLowerCase();
        var commands = outstr.split(" ");
        switch (commands[0]) {
            case "h":
                outstr = "Help: "
                    + "&#13;&#10;"
                    + "shape "
                    + "&#13;&#10;"
                    + "\t [circle | square | triangle] [x] [y] [size]";
                break;
            case "shape":
                if (commands.length > 4) {
                    var x, y, s, t;
                    t = commands[1];
                    x = commands[2];
                    y = commands[3];
                    s = commands[4];
                    if (ShapeTypes.hasOwnProperty(t.toUpperCase())) {
                        shapes.push(
                            new Shape(x, y, t, s)
                        );
                    }
                    else {
                        outstr = "shape type not implimented.";
                    }
                }
                else if (commands.length === 2)
                {
                    switch (commands[1])
                    {
                        case "clear":
                            shapes.length = 0;
                            break;
                        default:
                    }
                }
                else {
                    outstr = "missing arguments. (shape [circle | square | triangle] [x] [y] [size]) Example: shape square 100 100 40";
                }
                break;

            case "objects":
                if (commands[1] === "x") {
                    objects[0].x = Number(commands[2]);
                }
                if (commands[3] === "y") {
                    objects[0].y = Number(commands[4]);
                }
                break;
            default:
                outstr = "unknown command: " + commands[0];
                break;
        }
        console.log(outstr);

        output.innerHTML = output.innerHTML + "&#13;&#10;" + outstr;

        input.value = "";

        output.scrollTop = output.scrollHeight;

        return false;
    }
    return true;
}

function AddObject() {
    var nameInput = document.getElementById("objectNameInput");
    var objectName = nameInput.value;
    var select = document.getElementById("objectSelect");
    var option = document.createElement("option");
    option.text = objectName;
    option.selected = true;
    select.add(option);
    nameInput.value = "";

    objects.push(new GameObject(0, 0, objectName, new Sprite(10, 10)));
}




var shapes = [];
var objects = [];

function setup() {
    // Create the canvas
    var canvas = createCanvas(720, 400);
    canvas.parent("game-window");


}

function draw() {
    background(200);
    for (var i = 0; i < objects.length; i++) {
        objects[i].display();
    }

    for (var j = 0; j < shapes.length; j++) {
        shapes[j].display();
    }
}



class GameObject {
    constructor(x, y, name, sprite) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.sprite = sprite;
    }

    display() {
        push();
        translate(this.x, this.y);
        this.sprite.display();
        pop();
    }
}

class Sprite {

    pixels = [];

    constructor(width, height)
    {
        this.width = width;
        this.height = height;

        for (var x = 0; x < width; x++)
        {
            this.pixels[x] = [];

            for (var y = 0; y < height; y++)
            {
                this.pixels[x][y] = color(255, 0, 0);
            }
        }
    }

    display()
    {
        for (var x = 0; x < this.width; x++)
        {
            for (var y = 0; y < this.height; y++)
            {
   
                fill(this.pixels[x][y]);
                square(x, y, 1);
            }
        }

    }

}

//class Color {
//    constructor(r, g, b, a) {
//        this.r = r;
//        this.g = g;
//        this.b = b;
//        this.a = a;
//    }
//}

const ShapeTypes = {
    CIRCLE: 'circle',
    SQUARE: 'square',
    TRIANGLE: 'triangle'
};


class Shape {
    constructor(x, y, type, size) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = size;
    }

    display() {
        push();
        fill(255, 0, 0);
        switch (this.type) {
            case ShapeTypes.CIRCLE:
                circle(this.x, this.y, this.size);
                break;
            case ShapeTypes.SQUARE:
                square(this.x - this.size/2, this.y - this.size/2, this.size);
                break;
            case ShapeTypes.TRIANGLE:

                triangle(
                    Number(this.x) - Number(this.size / 2),     Number(this.y) + Number(this.size / 2),
                    Number(this.x),                             Number(this.y) - Number(this.size / 2),
                    Number(this.x) + Number(this.size / 2),     Number(this.y) + Number(this.size / 2)
                );
                break;
            default:
        }

        pop();
    }
}
