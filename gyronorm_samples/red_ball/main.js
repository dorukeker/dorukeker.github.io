$(document).ready(function(){
  // Define variables for later use
  var ballCurrentX, ballCurrentY, ballNewX, ballNewY, containerWidth, containerHeight;

  containerWidth = $('#container').width();
  containerHeight = $('#container').height();

  // Listen for any change in the orientation
  window.addEventListener("orientationchange", onOrientationChangeHandler, false);

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
});

// Callback function for gn.start();
var onGyronormCallback = function(data){
  ballCurrentX = parseInt($('#ball').css('left'));
  ballNewX = Math.max(ballCurrentX-(data.dm.gx * 5),0);
  ballNewX = Math.min(ballNewX,containerWidth);
  $('#ball').css('left',ballNewX);
    // data.dm.gx       ( devicemotion event accelerationIncludingGravity x value )
    // data.dm.gy       ( devicemotion event accelerationIncludingGravity y value )
    // data.dm.gz       ( devicemotion event accelerationIncludingGravity z value )

}

var onOrientationChangeHandler = function(){

}
