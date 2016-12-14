var Bucket = require('./bucket_list/bucket.js');
var Country = require('./bucket_list/bucket.js');
var BucketView = require('./views/bucket_view.js');
var bucket = new Bucket();
var bucketView = new BucketView(bucket);

var app = function() {

  var remoteUrl = "https://restcountries.eu/rest/v1/all";
  var url = "http://localhost:3000/countries";

  makeRequest(remoteUrl, requestComplete);
  makeRequest(url, requestComplete2);
}


var makeRequest = function(url, callback){
   var request = new XMLHttpRequest();
   request.open("GET", url);
   request.onload = callback;
   request.send();
}

var requestComplete = function(){
     console.log("Whoot! Success!");
     if(this.status !==200) return;
     var jsonString = this.responseText;
     var countries = JSON.parse(jsonString);
     bucketView.populateSelectList(countries); 
     console.log(countries[0]);    
}

  var requestComplete2 = function(){
    if(this.status == 200){
         var countries = JSON.parse(this.responseText);
         console.log(countries);
         for(country of countries) {
           bucket.addCountry(new Country(country));
         }
         bucketView.bindEvents();
         bucketView.render();
    }

  }

window.onload = app;
//add the request for the country data