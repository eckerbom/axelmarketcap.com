$(document).ready(function(){

let BASE_URL ="https://api.coingecko.com/api/v3/";
let COINDATA_ENDPOINT = "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d";

let urlCoindata = BASE_URL + COINDATA_ENDPOINT;

function adList(){
      fetch(urlCoindata)
      .then(function(res){
        console.log(res);
          res.json().then(function(data){
                console.log(data);

//https://stackoverflow.com/questions/171027/add-table-row-in-jquery
                var table = $("cointable");

                for (i=0; i<100; i++){
                    var table = $("cointable");

                    $("#cointable").last().append("<tr><td>New row</td></tr>");
                }


                let rank = data[0].market_cap_rank;
                $("#mcaprank").html(rank);
                console.log(rank);

                let name = data[0].name;
                $("#name").html(name);

                let symbol = data[0].symbol;
                $("#symbol").html(symbol.toUpperCase());

                // FUNGERAR INTE ATT FÅ FRAM BILDEN :( :( :(
                /*let image = data[0].image;
                $("#image").append(""<img src="${image}" width="20" height="20">");*/

                let price = data[0].current_price;
                $("#price").html("$" + price);

                // will fix if else here green/red +/- I know how to do it
                let change24Hpercentage = data[0].price_change_percentage_24h.toFixed(2);
                $("#change24h").html(change24Hpercentage + "%");

                let marketCap = data[0].market_cap;
                $("#marketCap").html("$" + marketCap);

                let volume = data[0].total_volume;
                $("#volume").html("$" + volume);

                let supply = data[0].circulating_supply;
                $("#supply").html(supply + " " + symbol.toUpperCase());
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
