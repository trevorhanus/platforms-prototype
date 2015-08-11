var Controller = (function(){

  /*
    Controller
    Description:
      This object will manage the connection from each controller to the server.
    author: Rene Loperena
  */
  function Controller(){
    this.io = null;
    this.data = {
      velocity: {
        x: 0,
        y: 0
      },
      start: false,
      a: false,
      b: false
    };
  }

  /*
    .connect
    params: (nothing)
    returns: (nothing)
    description:
      Will connect the object to the server using socket.io
    author: Rene Loperena
  */
  Controller.prototype.connect = function(){
    var self = this;
    self.io = io.connect();
    self.io.on('identity',function(){
      self.io.emit('identity', 'client');
    });
  };

  /*
    .updateVelocity
    params: x, y
    returns: (nothing)
    description:
      Will update the Controller's velocity to the given values
    author: Rene Loperena
  */
  Controller.prototype.updateVelocity = function(x,y){
    this.data.velocity.x = x;
    this.data.velocity.y = y;
  };

  /*
    .pressStart
    params: (nothing)
    returns: (nothing)
    description:
      Will update the Controller's 'start' value to true
    author: Rene Loperena
  */
  Controller.prototype.pressStart = function() {
    this.data.start = true;
  };

  /*
    .releaseStart
    params: (nothing)
    returns: (nothing)
    description:
      Will update the Controller's 'start' value to false
    author: Rene Loperena
  */
  Controller.prototype.releaseStart = function() {
    this.data.start = false;
  };

  /*
    .pressA
    params: (nothing)
    returns: (nothing)
    description:
      Will update the Controller's 'A' value to true
    author: Rene Loperena
  */
  Controller.prototype.pressA = function(){
    this.data.a = true;
  };

  /*
    .releaseA
    params: (nothing)
    returns: (nothing)
    description:
      Will update the Controller's 'A' value to false
    author: Rene Loperena
  */
  Controller.prototype.releaseA = function(){
    this.data.a = false;
  };

  /*
    .pressB
    params: (nothing)
    returns: (nothing)
    description:
      Will update the Controller's 'B' value to true
    author: Rene Loperena
  */
  Controller.prototype.pressB = function(){
    this.data.b = true;
  };

  /*
    .releaseB
    params: (nothing)
    returns: (nothing)
    description:
      Will update the Controller's 'B' value to false
    author: Rene Loperena
  */
  Controller.prototype.releaseB = function(){
    this.data.b = false;
  };
  /*
    .emitData
    params: (nothing)
    returns: (nothing)
    description:
      Will emit the controller data to the server.
    author: Rene Loperena
  */
  Controller.prototype.emitData = function(){
    var self = this;
    if(!self.io){
      throw new Error("Controller not connected");
    }else{
      self.io.emit('updateData', self.data);
    }
  };


  /*
    .startCommunication
    params: intervalTime
    returns: (nothing)
    description:
      Will start sending information to the display client every 'intervalTime' (in ms)
    author: Rene Loperena
  */
  Controller.prototype.startCommunication = function(intervalTime) {
    var self = this;
    var interval = intervalTime || 50;
    setInterval(function(){
      self.emitData();
    },interval);
  };

  return Controller;

})();