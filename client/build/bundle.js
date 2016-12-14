/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Bucket = __webpack_require__(1);
	var Country = __webpack_require__(1);
	var BucketView = __webpack_require__(2);
	
	window.onload = function() {
	  var bucket = new Bucket();
	  var bucketView = new BucketView(bucket);
	  
	  var url = "http://localhost:3000/countries";
	  var request = new XMLHttpRequest();
	  request.open("GET", url);
	  request.onload = function(){
	     if(request.status == 200){
	          var desirableCountries = JSON.parse(request.responseText);
	          for(country of desirableCountries) {
	          Bucket.addCountry(new Country(country));
	          }
	          bucketView.bindEvents();
	          bucketView.render();
	     }
	  }
	  request.send();
	}
	//add the request for the country data

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Bucket = function() {
	  this.countries = [];
	};
	
	Bucket.prototype = {
	  addCountry: function(country) {
	    this.countries.push(country);
	  }
	};
	module.exports = Bucket;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var BucketView = function(bucket) {
	  this.bucket = bucket;
	};
	
	BucketView.prototype = {
	
	  populateSelectList: function(countries){
	    var selectList = document.getElementById('country_list');
	    for (country of countries){
	      var option = document.createElement('option');
	      option.setAttribute('value', country.name);
	      option.innerText = country.name;
	      selectList.appendChild(option);
	    }
	  },
	
	  bindEvents: function(){
	    var form = document.getElementById('add_country');
	    form.onsubmit = function(e){
	      e.preventDefault();
	      var country = {
	        name: e.target.country_list.value,
	      }
	      this.bucket.addCountry(new Country(country));
	      this.render();
	      this.saveCountry(country);
	    }.bind(this);
	  },
	
	  saveAccount: function(country){
	    var url= "http://localhost:3000/countries";
	    var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function(){
	      if(request.status == 200){
	        console.log("Country Added");
	      }
	    }
	    request.send(JSON.stringify(country));
	  },
	
	  render: function(){
	    console.log("rendering");
	  }
	
	
	};
	
	module.exports = BucketView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map