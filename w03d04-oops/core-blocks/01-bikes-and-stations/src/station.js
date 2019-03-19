var Station = function(name, location, args) {
  this.name = name;
  this.location = location;
  this.bikes = args;
};

Station.prototype.empty= function() {
  if (this.bikes.length === 0){
    return true;
  }
};

Station.prototype.newestBike = function(){
  var newBike = 0;
  this.bikes.forEach(function(bike) {
    if (bike.modelYear > newBike) {
      newBike = bike;
    }
  });
  return newBike;
};

Station.prototype.take = function(bike){
  this.bikes.push(bike);
};
