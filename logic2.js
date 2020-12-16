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

                function adRow(){
                  for (i=0; i<100; i++){
                    var table = document.getElementById("cointable");

                    var row = table.insertRow(-1);

                    // $("#cointable").last().append("<tr><td>New row</td></tr>");

                    //insert new cells at the row
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);

                    //add some text to the new cells
                    var mcaprank = data[i].market_cap_rank;
                    var name = data[i].name;
                    var symbol = data[i].symbol;
                    var image = data[i].image;
                    var price = data[i].price;
                    var volume = data[i].total_volume;
                    var supply = data[i].circulating_supply;
                    var change = data[i].price_change_percentage_24h;

                    cell1.innerhtml = mcaprank;
                    cell2.innerhtml = name;
                    cell3.innerhtml = symbol;
                    cell4.innerhtml = image;
                    cell5.innerhtml = price;
                    cell6.innerhtml = volume;
                    cell7.innerhtml = supply;
                    cell8.innerhtml = change;
                };
              };
              adRow();

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
