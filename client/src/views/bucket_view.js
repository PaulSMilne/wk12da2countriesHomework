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

  displayBucketList: function(countries){
    var list = document.getElementById('bucket_list');
    var counter = 0;
    for (country of countries){
      var listItem = document.createElement('li');
      listItem.innerText = country[counter].name;
      list.appendChild(listItem);
      counter ++;
    }
    console.log("rendering");
  }


};

module.exports = BucketView;
