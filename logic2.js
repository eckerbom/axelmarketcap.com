// EXCHANGES

//document ready makes sure that the page loads before and script is activated
$(document).ready(function(){

//dividing the url in a base and a endpoint. we could skip it but its good preparation if we want to take more APIs from the same base url
let BASE_URL ="https://api.coingecko.com/api/v3/";
let COINDATA_ENDPOINT = "exchanges?per_page=250";
let GLOBAL_ENDPOINT = "global";

//we combine the parts of the url into one with a variable that we refer to lateron
let urlCoindata = BASE_URL + COINDATA_ENDPOINT;
let urlGlobalData = BASE_URL + GLOBAL_ENDPOINT;

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
                // creating a for loop that will ad rows with coindata
                for (i=0; i<250; i++){

                // cretaing variables for the data
                let rank = data[i].trust_score_rank;
                let name = data[i].name;
                let image = data[i].image;
                let trustScore = data[i].trust_score;
                // using toFixed() to controll number of decimals
                let volume = data[i].trade_volume_24h_btc.toFixed(2);
                let country = data[i].country;
                let year = data[i].year_established;
                let url = data[i].url;

                // accessing the table in html.index and adding
                $('#exchangeTable').append(
                //adding rows to coinTable with our variabels
                $('<tr class="content-row"></tr>').append(
                // adds data to each cell in each row in the table
                $('<td id = "rank"></td>').text(rank),
                $('<td id = "image"></td>').append(`<img src = "${image}" width="40" height="40">`),
                $('<td id = "name"></td>').text(name),
                // using thousand separators function to make the data more displayable, function is further down in the code
                $('<td id = "trustScore"></td>').html(trustScore),
                $('<td id = "volume"></td>').html(thousands_separators(volume) + " BTC"),
                $('<td id = "country"></td>').html(country),
                $('<td id = "year"></td>').html(year),
                $('<td id = "url"></td>').html(`<a href="${url}">${url}</a>`),
                )
                );
              }
            });
        });
};


/*            Separates the number into thousands, to make it more readable.
              from: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-39.php
*/
          function thousands_separators(num)
            {
              var num_parts = num.toString().split(".");
              num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return num_parts.join(".");
            }
// calling the function
adList();


// first we make a function so hackers can´t hack
function adGlobal(){
      // with fetch(url) we get the data from the url above
      fetch(urlGlobalData)
      //.then makes sure we wont continue until above is complete
      .then(function(res){
        // we test with a console.log that we get data
        console.log(res);
          //with json we make the data readable
          res.json().then(function(data){
                // we test with console.log that we get the whole array as intended
                console.log(data);
                let coins = data.data.active_cryptocurrencies;
                $("#hMarketCoins").text("Coins: " + coins);
                console.log(data.data.active_cryptocurrencies);
                let markets = data.data.markets;
                $("#hMarketMarkets").html("Markets: " + markets);

                let icos = data.data.ongoing_icos;
                $("#hMarketIcos").html("Ongoing ICOs: " + icos);

                let marketVolume = data.data.total_volume.usd.toFixed(0);
                $("#hMarketVolume").html("24h Volume: " + "$" + thousands_separators(marketVolume));

                let totalMcap = data.data.total_market_cap.usd.toFixed(0);
                $("#hMarketCap").html("Market cap: " + "$" + thousands_separators(totalMcap));

                let mCapChange = data.data.market_cap_change_percentage_24h_usd.toFixed(2);
                $("#hMarketCapChange").html("24h: " + thousands_separators(mCapChange) + "%");

                let dominanceBTC = data.data.market_cap_percentage.btc.toFixed(2);
                let dominanceETH = data.data.market_cap_percentage.eth.toFixed(2);
                let dominanceADA = data.data.market_cap_percentage.ada.toFixed(2);
                $("#hDominance").html("Dominance: BTC: " + thousands_separators(dominanceBTC) + "%  " + "ETH: " + thousands_separators(dominanceETH) + "%  " + "ADA: " + thousands_separators(dominanceADA) + "%");

                function colorChange24HMarket(){
                  const list = $('<tr class="content-row table-dark"></tr>');

                  if (mCapChange > 0){
                    const green = $("#hMarketCapChange").html("24h: " + thousands_separators(mCapChange) + "%").css('color', '#25e8b4');
                    return green;
                  } else {
                    const red = $("#hMarketCapChange").html("24h: " + thousands_separators(mCapChange) + "%").css('color', '#ff4545');
                    return red;
                  }
                };
                colorChange24HMarket();
          });
      });
  };

adGlobal();

});
