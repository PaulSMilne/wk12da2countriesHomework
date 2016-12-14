var Bucket = function() {
  this.bucketList = [];
};

Bucket.prototype = {
  addCountry: function(country) {
    this.bucketList.push(country);
  }
};
module.exports = Bucket;
