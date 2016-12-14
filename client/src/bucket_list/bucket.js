var Bucket = function() {
  this.countries = [];
};

Bucket.prototype = {
  addCountry: function(country) {
    this.countries.push(country);
  }
};
module.exports = Bucket;
