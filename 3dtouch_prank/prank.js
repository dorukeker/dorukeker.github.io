var sound = new Howl({
  urls: ['crack.mp3']
});



$(document).ready(function(){
  // Current index
  var currentLabelIndex = 0;

  var labels = [$('#label1'),$('#label2'),$('#label3')];
  var tresholds = [1,1,0.8];

  // Init Force Touch class
  var forceTouch = new ForceTouch();
  var button = document.getElementById('button')
  forceTouch.startListen(button);

  var updateLabel= function(forceValue){

    // Show current force touch on the label
    render(forceValue , labels[currentLabelIndex]);

    if(forceValue >= tresholds[currentLabelIndex]){
      if(currentLabelIndex + 1 == labels.length){
        crack();
      } else {
        labels[currentLabelIndex].addClass('done');
        labels[currentLabelIndex].removeClass('current');
        forceTouch.callback = switchLable;
      }
      return;
    }
  }

  var switchLable = function(forceValue){
    if(forceValue == 0){
      currentLabelIndex++;
      forceTouch.callback = updateLabel;
      labels[currentLabelIndex].addClass('current');
    }
  }

  var render = function(value , label){
    value = (value > 1)?1:value;
    label.html(value.toFixed(2));
  }

  // Start listening for label
  forceTouch.callback = updateLabel;

  function crack(){
    forceTouch.callback = function(){return;};
    sound.play();
    $('#crack').css('display','block');
  }

});
