(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return (root.ForceTouch = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = (root.ForceTouch = factory());
  } else {
    root.ForceTouch = factory();
  }
}(this, function() {

  var ForceTouch = function() {}

  ForceTouch.prototype.callback = null;

  ForceTouch.prototype.startListen = function(elem){
    elem.addEventListener('touchstart', this.onTouchStart.bind(this), false);
    elem.addEventListener('touchmove', this.onTouchMove.bind(this), false);
    elem.addEventListener('touchend', this.onTouchEnd.bind(this), false);
  }

  ForceTouch.prototype.stopListen = function(elem){
    elem.removeEventListener('touchstart', this.onTouchStart.bind(this) , false);
    elem.removeEventListener('touchmove', this.onTouchMove.bind(this) , false);
    elem.removeEventListener('touchend', this.onTouchEnd.bind(this) , false);
  }

  ForceTouch.prototype.touch = null;

  ForceTouch.prototype.onTouchStart = function(e) {
    e.preventDefault();
    this.checkForce(e);
  }

  ForceTouch.prototype.onTouchMove = function(e) {
    e.preventDefault();
    this.checkForce(e);
  }

  ForceTouch.prototype.onTouchEnd = function(e) {
    e.preventDefault();
    this.touch = null;
  }

  ForceTouch.prototype.checkForce = function(e) {
    this.touch = e.touches[0];
    setTimeout(this.refreshForceValue.bind(this), 10);
  }

  ForceTouch.prototype.refreshForceValue = function() {
    var touchEvent = this.touch;
    var forceValue = 0;
    if(touchEvent) {
      forceValue = touchEvent.force || 0;
      setTimeout(this.refreshForceValue.bind(this), 10);
    }else{
      forceValue = 0;
    }

    this.callback(forceValue);

  }

  return ForceTouch;
}));
