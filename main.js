status ="";

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(325, 400);
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    objectName = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
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

function draw()
{
    image(video, 0, 0, 600, 500);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "The number of objects are ";
            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + percent + "%", objects[i].y + 15, objects[i].x + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == objectName)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = "Object Mentioned Found";
            }
            else
            {
                document.getElementById("object_status").innerHTML = "Object Mentiones Not Found";
            }
        }
    }
}