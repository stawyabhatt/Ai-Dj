function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotResults);
}
leftwristX=0;
rightwristX=0;
leftwristY=0;
rightwristY=0;
scoreleftwrist=0;


song="";
function preload()
{
    song=loadSound("Drive-Forever.mp3")
}
function draw()
{
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");

    if(scoreleftwrist>0.2)
    {
        circle(leftwristX,leftwristY,20);
        Numberleft=Number(leftwristY);
        remove_decimals=floor(Numberleft);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume)
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}
function gotResults(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;


        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;

    }
}
function modelloaded()
{
    console.log("model is loaded")
}