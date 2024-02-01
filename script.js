let priceData = [];
let priceLabel = [];
let priceDataHistory = [];
let days = [];

async function getDataCoingecko() {
    let url1 = 'https://api.coingecko.com/api/v3/coins/bitcoin?tickers=true&market_data=true&sparkline=true';
    let response = await fetch(url1);
    let responseAsJson = await response.json();
    getDataCoingecko2();
    renderCourse1(responseAsJson);
}

async function getDataCoingecko2(){
    let url2 = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=90&interval=daily&precision=2';
    let response2 = await fetch(url2);
    let responseAsJson2 = await response2.json();
    console.log(responseAsJson2);
    console.log(responseAsJson2['prices']);
    renderCourseHistory(responseAsJson2);
}

function renderCourseHistory(responseAsJson2){
    for (let j = 0; j < responseAsJson2['prices'].length; j++) {
        priceDataHistory.push(responseAsJson2['prices'][j]['1']);
        days.push(j);
    };
    console.log('history' ,priceDataHistory);
    console.log(days)
    const ctx = document.getElementById('chart2');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Bitcoin last 90 days',
                data: priceDataHistory,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: Math.min(priceDataHistory),
                    suggestedMax: Math.max(priceDataHistory),
                }
            }
        }
    }); 
}

function renderCourse1(responseAsJson) {
    for (let i = 0; i < responseAsJson['tickers'].length; i++) {
        priceData.push(responseAsJson['tickers'][i]['converted_last']['usd']);
        priceLabel.push(responseAsJson['tickers'][i]['timestamp'].slice(11, 19));
    };
 
    const ctx = document.getElementById('chart');

   new Chart(ctx, {
        type: 'line',
        data: {
            labels: priceLabel,
            datasets: [{
                label: 'Bitcoin',
                data: priceData,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: Math.min(priceData),
                    suggestedMax: Math.max(priceData),
                }
            }
        }
    }); 
} 


