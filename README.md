# Introduction 
This is Rails 7 app that is a demo of using MapBox for address autofill and geocoding. It also includes a simple demo of MapKick to show a map.

## Getting Started
This is a Rails 7 app, I use Ruby 3.1.2 currently. For background the app was created with the following command `rails new mapbox_demo -j esbuild --css tailwind -d postgresql`. 

To start using it clone the repo and run `bundle install` and `yarn install` to get the dependencies.
Create and migrate the database with `rails db:create` and `rails db:migrate`.
Then run `./bin/dev` to start the server.

The MapBox elements won't work unless you have a MapBox account and a public access token and have set the environment variable MAPBOX_ACCESS_TOKEN to that token (used this name as that is what MapKick uses). This application uses [dotenv](https://github.com/bkeepers/dotenv) to manage environment variables so you can create a .env file in the root of the app and add the following line to it `MAPBOX_ACCESS_TOKEN=your_token_here`.

## Seeing it in Action
Once you have app up and running start at /maps to see the demos.
You can use the Customers and Addresses link to see the Autofill demo working with a real Rails forms.

## Geocoding

### Background 
Basically similar to [this](https://github.com/railsdrill/Episode-10-GeoSearch-with-Mapbox-and-Rails/tree/main) approach it utilises the Temporary Geocoding API (which has a very high request limit on the free tier). The approach would be similar to the example on the Mapbox [site](https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/).

### Getting it Working 
First, need to add a couple of things via yarn 
`yarn add mapbox-gl`
`yarn add @mapbox/mapbox-gl-geocoder`

Then add links to CSS in application.html 
`<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">`

Then I create a stimulus controller `map-controller' that initialises the mapboxgl and sets up on result function to update fields on the page when a search is complete. 

This depends on a couple of divs with ids "map" and "geocoder" which is where Mapbox puts the map and search control. 

### Issues/Notes
Need to put a height and width on the "map" div otherwise will not display `<div id="map" class="w-full h-96 mb-6"></div>`
Styling is not working with Tailwind nicely. See the /maps and geocoder example in the middle search box messed up.
Also added a small bit of specific CSS to `application.tailwind.css` from the sample app above to help the map and box appear better.
_**It does not appear that this is really code for filling in a whole address form the result returned you can consistently get the lat/long out but you can't get the address fields in clean format so as it is described good for geocoding **_
 
## Address Autofill

### Background 
This is based on the [example](https://docs.mapbox.com/mapbox-search-js/example/autofill-checkout-js/) from MapBox. This uses Autofill - Session API, this is a session limited to 1000 per month on Free Tier. Not sure what exactly constitutes a "Session". 

### Getting it Working 
Add this via yarn 
`yarn add @mapbox/search-js-web`

I created a stimulus controller 'map-search-controller' This will create an autofill session with minimap and event listener on the retrieve which will show a map and update some fields that are required manually. 

The controller also has methods for the "Add Address Manually Link" to show the address fields if want to do manual entry. 

The minimap just needs to be div on the page (using a stimulus target to identify it). 

The various form fields need the `autocomplete` attribute set so that MapBox can populate the fields. 

There is no auto-complete for lat/long so the method there is to do that manually based on stimulus targets. Also, see below issue on line1 

### In Action 
On /maps, you can see it as the third of the three demos just populating a demo form. 

If you look at addresses/new you can see it in action working on a real rails form. 

### Issues/Notes
The MapBox JS added `address_search` to the name of the control it used to search which was line 1 on the address record. This means that when the form was submitted the controller didn't get line_1 as a parameter but an invalid parameter that it rejected. So had to change it slightly from the MapBox demo so that there is an input box called find_address this is one MapBox takes over, and a normal one for line_1, it did mean the stimulus controller has to manually update line_1 in a similar way to the lat/long boxes. 
_**Overall this method seems to work pretty well for address autofill. There is some work to do regards the edit flow on a form to get that right. **_

## MapKick Demo

All I did here (so far) was add a MapKick map to the /maps page to see it working. 

The instruactions for MapKick are [here](https://github.com/ankane/mapkick) and work well.

## Access Token

As there is no real way to hide the token on client should check out the MapBox documentation on securely using tokens. In the application you will see in `app/javascript/controllers/application.js` that there is small function to retrieve the variable from meta tag (that is set in the `application.html.erb`)for use in the two stimulus controllers written for this demo app.