var Bucket = require('./bucket_list/bucket.js');
var Country = require('./bucket_list/bucket.js');
var BucketView = require('./views/bucket_view.js');

window.onload = function() {
  var bucket = new Bucket();
  var bucketView = new BucketView(bucket);
  
  var url = "http://localhost:3000/countries";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
     if(request.status == 200){
          var countries = JSON.parse(request.responseText);
          console.log(countries);
          for(country of countries) {
            Bucket.addCountry(new Country(country));
          }
          bucketView.bindEvents();
          bucketView.render();
     }
  }
  request.send();
}
//add the request for the country data