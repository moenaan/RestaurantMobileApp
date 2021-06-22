// variables to add city to fetch query on button click
var userFormEl = document.querySelector("#form");
var cityInputEl = document.querySelector("#cityInput");

$(document).foundation(); // use to start foundation js utilities
//added below code to pull in city input from the user
var formSubmitHandler = function (event) {
     event.preventDefault();
   
     var cityName = cityInputEl.value.trim();
   
     if (cityName) {
      getLocationId(cityName);

       cityInputEl.value = '';
     } else {
       alert("Please enter city");
     }
   };

//city is added to fetch query, but wont change seach results
var getLocationId = function(cityName){
     
     fetch("https://travel-advisor.p.rapidapi.com/locations/search?query=" + cityName + "&limit=5&offset=0&units=mi&location_id=2&currency=USD&sort=relevance&lang=en_US", {
     "method": "GET",
     "headers": {
          "x-rapidapi-key": "b9b5183d85msh693e7ff1575baf9p1c92abjsnf938cef3869b",
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
          }
     })
     .then(response => {
          console.log(response);
     })
     .catch(err => {
          console.error(err);
     });
};
//searched only for location ID generated for the Irving TX area.

     fetch("https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=56032&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=mi&limit=5&open_now=false&lang=en_US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b9b5183d85msh693e7ff1575baf9p1c92abjsnf938cef3869b",
		"x-rapidapi-host": "travel-advisor.p.rapidapi.com"
	}
})
.then(response => {
     if(!response.ok){
          throw Error("ERROR with the response from API");
     }
	return response.json();
})
.then(data => {
     console.log(data.data);
    
     var restaurantName = data.data
     .map(restaurant => {
          console.log(restaurant.name);
          if(restaurant.name != undefined){
          return `
          <div class="media-object" data-animate="slide-in-down">
               <div class="media-object-section align-self-middle">
                    <div class="thumbnail">
                         <img src="${pictures(restaurant.photo)}">
                    </div>
               </div>
          <div class="media-object-section">
            <h4>${restaurant.name}</h4>
            <p><span class="label primary">${restaurant.parent_display_name}</span>
            ${restaurant.is_closed ? '<span class="label success">Open</span>': '<span class="label success">Open</span>'}
            </p>
            <p>Address: ${restaurant.address}</p>
            <p>${restaurant.description}</p>
            <p>Restaurant Website: <a href="${restaurant.web_url}">${restaurant.website}</a><br>
            <i class="fas fa-phone"></i> ${restaurant.phone}<br>
            Price Level: ${restaurant.price_level}
            <p>
            <p>Cuisine: ${cuisine(restaurant.cuisine)}</p>
          </div>
        </div>`
          };
          
     }).join("");
     document.querySelector("#restaurants").insertAdjacentHTML("afterbegin",restaurantName);
})
.catch(err => {
	console.error(err);
});

var cuisine = function(cuisine){
     return `
     ${cuisine.map(function(food){
          return `
          <span class="label primary">${food.name}</span> 
          `
     }).join('')}
     `
}

var pictures = function(pictures){
      return pictures.images['small'].url;
};

userFormEl.addEventListener('submit', formSubmitHandler);