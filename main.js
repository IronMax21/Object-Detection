img = "";
status = "";
objects = [];

//called before loading
function preload()
{
    img = loadImage('office.jpg');
}
//used to create canvas
function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    //initialize cocossd and store cocossd into object detector variable and run modelLoaded function
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status  =  detecting objects"
}
function modelLoaded()
{
    console.log("model is loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
//executed in every frame
function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status : object detected ";
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " "+percent+"%", objects[i].x + 20, objects[i].y+ 20);
        noFill();
        stroke("purple");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}