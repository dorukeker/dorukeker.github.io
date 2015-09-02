$(document).ready(function(){
  // Define variables for later use
  var ballCurrentX, ballCurrentY, ballNewX, ballNewY, containerWidth, containerHeight, ballWidth, ballHeight;

  // Set initial width and hieght for the container and the ball
  containerWidth = $('#container').width();
  containerHeight = $('#container').height();

  ballWidth = $('#ball').width();
  ballHeight = $('#ball').height();

  // Move the ball to the center of the screen
  var ballInitialX = (containerWidth - $('#ball').width()) / 2;
  $('#ball').css('left',ballInitialX);

  var ballInitialY = (containerHeight - $('#ball').height()) / 2;
  $('#ball').css('top',ballInitialY);

  // Initialize GyroNorm
  var gn = new GyroNorm();

  gn.init().then(function(){
      gn.start(onGyronormCallback);
  }).catch(function(e){
    // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
    console.log(e);
  });

  // Callback function for gn.start();
  var onGyronormCallback = function(data){

    ballCurrentX = parseInt($('#ball').css('left'));
    ballNewX = Math.max(ballCurrentX + (data.dm.gx * 5),0);
    ballNewX = Math.min(ballNewX,containerWidth - ballWidth);
    $('#ball').css('left',ballNewX);

    ballCurrentY = parseInt($('#ball').css('top'));
    ballNewY = Math.max(ballCurrentY - (data.dm.gy * 5),0);
    ballNewY = Math.min(ballNewY,containerHeight - ballHeight);
    $('#ball').css('top',ballNewY);

  }

});
