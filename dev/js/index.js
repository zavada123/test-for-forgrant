window.onload = function() {
    getCurrency();
    $(".currency__select-trigger").on("click", function(event) {
        $('html').one('click', function() {
            $(".currency__select").removeClass("opened");
        });
        $(this).parents(".currency__select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".currency-option").on("click", function() {
        $(this).parents(".currency__select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".currency-options").find(".currency-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".currency__select").removeClass("opened");
        $(this).parents(".currency__select").find(".currency__select-trigger").text($(this).text());
        getCurrency();
    });
    var inputCheked = document.querySelectorAll("input");

    inputCheked.forEach(function(element) {
        element.addEventListener('change', function() {
            getCurrency();
        })
    });


    function getCurrency() {
        var currencyValue = document.querySelector('select').value;
        var fetchResultBTC = fetch("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC" + currencyValue);
        var fetchResultETC = fetch("https://apiv2.bitcoinaverage.com/indices/local/ticker/ETC" + currencyValue);
        var fetchResultLTC = fetch("https://apiv2.bitcoinaverage.com/indices/global/ticker/LTC" + currencyValue);
        fetchResultBTC.then(function(response) {
            return response.text();
        }).then(function(text) {
            let parsedJson = JSON.parse(text);
            let currency_list_percent = [parsedJson.last, parsedJson.changes.percent.hour, parsedJson.changes.percent.day, parsedJson.changes.percent.week, parsedJson.changes.percent.month];
            let currency_list_price = [parsedJson.last, parsedJson.changes.price.hour, parsedJson.changes.price.day, parsedJson.changes.price.week, parsedJson.changes.price.month];
            let currency = document.querySelectorAll("[data-id='bitcoin']");
            let procentChanger = document.querySelector(".bitcoin input");
            procentChanger.checked ? currency.list = currency_list_percent : currency.list = currency_list_price;
            currency.forEach((element, index) => {
                element.innerHTML = currency.list[index];
                if (index == 0) {
                    if (currencyValue == 'USD') {
                        element.innerHTML = '$' + currency.list[index];
                    } else if (currencyValue == 'EUR') { element.innerHTML = '€' + currency.list[index] } else if (currencyValue == 'RUB') { element.innerHTML = '₽' + currency.list[index] } else { element.innerHTML = '£' + currency.list[index] }
                }
                if (index > 0) {
                    currency.list[index] < 0 ? element.classList.add('pricedown') : element.classList.add('priceup');
                    procentChanger.checked ? element.innerHTML += '%' : false;
                }

            });
        });
        fetchResultETC.then(function(response) {
            return response.text();
        }).then(function(text) {
            let parsedJson = JSON.parse(text);
            let currency_list_percent = [parsedJson.last, parsedJson.changes.percent.hour, parsedJson.changes.percent.day, parsedJson.changes.percent.week, parsedJson.changes.percent.month];
            let currency_list_price = [parsedJson.last, parsedJson.changes.price.hour, parsedJson.changes.price.day, parsedJson.changes.price.week, parsedJson.changes.price.month];
            let currency = document.querySelectorAll("[data-id='etherium']");
            let procentChanger = document.querySelector(".etherium input");
            procentChanger.checked ? currency.list = currency_list_percent : currency.list = currency_list_price;
            currency.forEach((element, index) => {
                element.innerHTML = currency.list[index];
                if (index == 0) {
                    if (currencyValue == 'USD') {
                        element.innerHTML = '$' + currency.list[index];
                    } else if (currencyValue == 'EUR') { element.innerHTML = '€' + currency.list[index] } else if (currencyValue == 'RUB') { element.innerHTML = '₽' + currency.list[index] } else { element.innerHTML = '£' + currency.list[index] }
                }
                if (index > 0) {
                    currency.list[index] < 0 ? element.classList.add('pricedown') : element.classList.add('priceup');
                    procentChanger.checked ? element.innerHTML += '%' : false;
                }

            });
        });
        fetchResultLTC.then(function(response) {
            return response.text();
        }).then(function(text) {
            let parsedJson = JSON.parse(text);
            let currency_list_percent = [parsedJson.last, parsedJson.changes.percent.hour, parsedJson.changes.percent.day, parsedJson.changes.percent.week, parsedJson.changes.percent.month];
            let currency_list_price = [parsedJson.last, parsedJson.changes.price.hour, parsedJson.changes.price.day, parsedJson.changes.price.week, parsedJson.changes.price.month];
            let currency = document.querySelectorAll("[data-id='litecoin']");
            let procentChanger = document.querySelector(".litecoin input");
            procentChanger.checked ? currency.list = currency_list_percent : currency.list = currency_list_price;
            currency.forEach((element, index) => {
                element.innerHTML = currency.list[index];
                if (index == 0) {
                    if (currencyValue == 'USD') {
                        element.innerHTML = '$' + currency.list[index];
                    } else if (currencyValue == 'EUR') { element.innerHTML = '€' + currency.list[index] } else if (currencyValue == 'RUB') { element.innerHTML = '₽' + currency.list[index] } else { element.innerHTML = '£' + currency.list[index] }
                }
                if (index > 0) {
                    currency.list[index] < 0 ? element.classList.add('pricedown') : element.classList.add('priceup');
                    procentChanger.checked ? element.innerHTML += '%' : false;
                }
            });
        });
    }
}