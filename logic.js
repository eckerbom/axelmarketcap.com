
let BASE_URL ="https://api.coingecko.com/api/v3/";
let COINDATA_ENDPOINT = "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d";

let urlCoindata = BASE_URL + COINDATA_ENDPOINT;



      fetch(urlCoindata)                                           //fetch data from URL
      .then(function(res){
          res.json().then(function(data){                         //json making it readable?
                var list = $("#coinList");                //accessing the list #-for id. will point to the ol-list in html

                $.each(urlCoindata, function(index,value){     //loop through url array, - this is an anonymous function

                    $("<li/>").text(value.name + ", " + value.color + ", " + value.weight).appendTo(list);    //li = listitem
                });
            });

        });





  /*
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
*/
