$(document).ready(function(){

//dividing the url in a base and a endpoint. we could skip it but its good preparation if we want to take more APIs from the same base url
let BASE_URL ="https://api.coingecko.com/api/v3/";
let COINDATA_ENDPOINT = "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d";

//we combine the parts of the url into one with a variable that we refer to lateron
let urlCoindata = BASE_URL + COINDATA_ENDPOINT;

// first we make a function so hackers can´t hack
function adList(){
      // with fetch(url) we get the data from the url above
      fetch(urlCoindata)
      //.then makes sure we wont continue until above is complete
      .then(function(res){
        // we test with a console.log that we get data
        console.log(res);
          //with json we make the data readable
          res.json().then(function(data){
                // we test with console.log that we get the whole array as intended
                console.log(data);
                //creating a for loop that will ad rows with coindata
                for (i=0; i<250; i++){

                //cretaing variables for the data
                let rank = data[i].market_cap_rank;
                let name = data[i].name;
                let symbol = data[i].symbol;
                let image = data[i].image;
                let price = data[i].current_price;
                let change24Hpercentage = data[i].price_change_percentage_24h.toFixed(2);
                let marketCap = data[i].market_cap;
                let volume = data[i].total_volume;
                let supply = data[i].circulating_supply;

                //adding rows to coinTable with our variabels - OBS!!! se att det är komma efter varje rad!!!
                $('#coinTable').append(
                $('<div class="row"></div>').append(
                $('<div class="col-md-1 col-sm-1 col-xs-1 rank"></div>').text(rank),
                $('<div class="col-md-1 col-sm-1 col-xs-1 image"></div>').append(`<img src = "${image}" width="20" height="20">`),
                $('<div class="col-md-1 col-sm-1 col-xs-1 name"></div>').text(name),
                $('<div class="col-md-1 col-sm-1 col-xs-1 symbol"></div>').text(symbol.toUpperCase()),
                $('<div class="col-md-1 col-sm-1 col-xs-1 price"></div>').text("$" + price),
                $('<div class="col-md-1 col-sm-1 col-xs-1 24h"></div>').text(change24Hpercentage + "%"),
                $('<div class="col-md-2 col-sm-2 col-xs-2 marketCap"></div>').html("$" + marketCap),
                $('<div class="col-md-2 col-sm-2 col-xs-2 volume"></div>').html("$" + volume),
                $('<div class="col-md-2 col-sm-1 col-xs-2 supply"></div>').html(supply + " " + symbol.toUpperCase())
              )
            );
              }
            });

        });


};
// calling the function
adList();
});

















  /*    BELOW IS JUST OLD CODE - WILL BE REMOVED IN THE END
________________________________________________________________________________


      fetch(urlCoindata)
      .then(function(res){
          res.json().then(function(data){
            function redrawList(){
                var list = $("#coinList");
                list.html("");

                $.each(urlCoindata, function(index,value){     //loop through fruits array, fruits list

                    console.log(value);

                    $("<li/>").text(value.name + ", " + value.market_cap_rank + ", " + value.market_cap).appendTo(list);    //li = listitem
                });
            };
            redrawList();
          });
        });


________________________________________________________________________________

        let BASE_URL ="https://api.coingecko.com/api/v3/";
        let COINDATA_ENDPOINT = "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d";

        let urlCoindata = BASE_URL + COINDATA_ENDPOINT;


              fetch(urlCoindata)                                           //fetch data from URL
              .then(function(res){
                  res.json().then(function(data){                         //json making it readable
                      for(i = 0; i<100; i++){                             //for loop to go thru the list
                        var list = $("#coinList");                //accessing the list #-for id. will point to the ol-list in html


                          $.each(urlCoindata, function(index,value){     //loop through url array, - anonymous function

                              $("<li/>").text(value.name + ", " + value.market_cap_rank + ", " + value.market_cap).appendTo(list);    //li = listitem. adding data to the list - name, market cap and market cap rank
                          });
                      }
                    });

                });

        var mcaprank = data[i].market_cap_rank;


*/
