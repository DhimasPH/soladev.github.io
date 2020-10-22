var TxtRoll = function(el, toRoll, period) {
    this.toRoll = toRoll;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRoll.prototype.tick = function() {
    var i = this.loopNum % this.toRoll.length;
    var fullTxt = this.toRoll[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-roll');
    for (var i=0; i<elements.length; i++) {
      var toRoll = elements[i].getAttribute('data-roll');
      var period = elements[i].getAttribute('data-period');
      if (toRoll) {
        new TxtRoll(elements[i], JSON.parse(toRoll), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-roll > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };