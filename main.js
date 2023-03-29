song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWristX = 0;
scoreRightWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)

}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    circle(rightWristX,rightWristY,20);
    if(rightWristY >0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5";
        song.rate(0.5);
    }
    if(rightWristY >100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "speed = 1px";
        song.rate(1);
    }
    if(rightWristY >200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "speed = 1.5";
        song.rate(1.5);
    }
    if(rightWristY >300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    if(rightWristY >400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    if (scoreLeftWristX > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimal = floor(InNumberleftWristY);
        volume = remove_decimal / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWristX = results[0].pose.keypoints[9].score;
        console.log("RightWrist = " + scoreRightWrist + "LeftWrist = " + scoreLeftWristX);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX + " right wrist y = " + rightWristY);
    }
}



