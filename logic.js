// CRYPTOCURRENCIES

//document ready makes sure that the page loads before and script is activated
$(document).ready(function(){

//dividing the url in a base and a endpoint. we could skip it but its good preparation if we want to take more APIs from the same base url
let BASE_URL ="https://api.coingecko.com/api/v3/";
let COINDATA_ENDPOINT = "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d";
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
                let rank = data[i].market_cap_rank;
                let name = data[i].name;
                let symbol = data[i].symbol;
                let image = data[i].image;
                let price = data[i].current_price;
                // using toFixed() to controll number of decimals
                let change24Hpercentage = data[i].price_change_percentage_24h.toFixed(2);
                let marketCap = data[i].market_cap;
                let volume = data[i].total_volume;
                let supply = data[i].circulating_supply;
                // should actually be max supply I think, but when I take total supply it matches with coinmarket.com´s values (even though they claim its cirulating over max)
                let totalSupply = data[i].total_supply;
                let ath = data[i].ath;
                // using split from "T" to get rid of the time in the data and only present the date
                let athDate = data[i].ath_date.split("T")[0];
                let fromAth = data[i].ath_change_percentage;
                // not available from the API but easily calculated anyways. Displays how much price have to gain to get back to ATH
                let toAth = (((ath/price)-1)*100);

                // accessing the table in html.index and adding
                $('#coinTable').append(
                //adding rows to coinTable with our variabels
                $('<tr class="content-row"></tr>').append(
                // adds data to each cell in each row in the table
                $('<td id = "rank"></td>').text(rank),
                $('<td id = "name"></td>').append(`<img src = "${image}" width="20" height="20">` + "&nbsp " + name + "&nbsp " + symbol.toUpperCase()),
                // using thousand separators function to make the data more displayable, function is further down in the code
                $('<td id = "price"></td>').text("$" + thousands_separators(price)),
                // this is a function that will generate a row depending on the variable value, se further below
                colorChange24H(),
                $('<td id = "marketCap"></td>').html("$" + thousands_separators(marketCap)),
                $('<td id = "volume"></td>').html("$" + thousands_separators(volume)),
                $('<td id = "supply"></td>').html(thousands_separators(((supply*100)/totalSupply).toFixed(2)) + "%" + " " + symbol.toUpperCase()),
                $('<td id = "ath"></td>').text("$" + thousands_separators(ath)),
                $('<td id = "athDate"></td>').text(athDate),
                // this is a function that will generate a row depending on the variable value, se further below
                colorChangeFromAth(),
                // this is a function that will generate a row depending on the variable value, se further below
                colorChangeToAth(),
                )
                );

                // these functions are called above. depending of if the variable is positive or negative it will generate the green or red color of the text
                function colorChange24H(){
                  const list = $('<tr class="content-row table-dark"></tr>');

                  if (change24Hpercentage > 0){
                    const green = $('<td id = "change24"></td>').text(change24Hpercentage + "%").css('color', '#25e8b4').appendTo(list);
                    return green;
                  } else {
                    const red = $('<td id = "change24"></td>').text(change24Hpercentage + "%").css('color', '#ff4545').appendTo(list);
                    return red;
                  }
                };

                function colorChangeFromAth(){
                  const list = $('<tr class="content-row table-dark"></tr>');

                  if (fromAth > 0){
                    const green = $('<td id = "fromAth"></td>').text(fromAth.toFixed(2) + "%").css('color', '#25e8b4').appendTo(list);
                    return green;
                  } else {
                    const red = $('<td id = "fromAth"></td>').text(fromAth.toFixed(2) + "%").css('color', '#ff4545').appendTo(list);
                    return red;
                  }
                };

                function colorChangeToAth(){
                  const list = $('<tr class="content-row table-dark"></tr>');

                  if (toAth > 0){
                    const green = $('<td id = "toAth"></td>').text(toAth.toFixed(2) + "%").css('color', '#25e8b4').appendTo(list);
                    return green;
                  } else {
                    const red = $('<td id = "toAth"></td>').text(toAth.toFixed(2) + "%").css('color', '#ff4545').appendTo(list);
                    return red;
                  }
                };
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
