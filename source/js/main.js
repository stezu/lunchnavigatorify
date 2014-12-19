jQuery(function($) {
    var $document = $(document),
        $orgForm = $('.org-form'),
        $searchForm = $('.yelp-search'),
        $results = $('.results');

    function restaurantFormatResult (restaurant) {
        var markup = "<table class='restaurant-result'><tr>";
        if (restaurant.image_url !== undefined) {
            markup += "<td class='restaurant-image'><img src='" + restaurant.image_url + "'/></td>";
        }
        markup += "<td class='restaurant-info'><div class='restaurant-name'>" + restaurant.name + "</div>";
        if (restaurant.location.display_address !== undefined) {
            markup += "<div class='restaurant-address'>" + restaurant.location.display_address + "</div>";
        }
        if (restaurant.rating !== undefined) {
            markup += "<div class='restaurant-rating'>Rating: " + restaurant.rating + "</div>";
        }
        markup += "</td></tr></table>";
        return markup;
    }

    function restaurantFormatSelection (restaurant) {
        return restaurant.name;
    }

    $('.add-org').on('click', function (e) {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition(function (location) {
            $.ajax({
                type: 'get',
                url: '/location/' + location.coords.latitude + '/' + location.coords.longitude,
                success: function (data) {
                    $('input[name="zip"]').val(data.zip_code);
                }
            });
        });

        $orgForm.slideDown();
    });

    $orgForm
        .on('submit', function (e) {
            e.preventDefault();

            // TODO validate submitted data
            $.ajax({
                type: this.method,
                url: this.action,
                data: {
                    orgName: e.currentTarget[1].value,
                    url: e.currentTarget[2].value,
                    zip: e.currentTarget[3].value
                },
                success: function (data) {
                    $('.organization').html(data);
                }
            });

            $(this).hide();
        });

    $searchForm
        .find('.yelp-search__field--text').select2({
            minimumInputLength: 2,
            ajax: {
                url: '/search',
                quietMillis: 150,
                data: function (term, page) {
                    return {
                        'restaurant': term,
                        'location': $('.zip').text(), // this is super ugly right meow, this should be set server side, or something
                        'page_limit': 10
                    };
                },
                results: function (data, page) {
                    return {results: data.businesses};
                }
            },
            formatResult: restaurantFormatResult, // omitted for brevity, see the source of this page
            formatSelection: restaurantFormatSelection,  // omitted for brevity, see the source of this page
            dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
            escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
        })
        .end()
        .submit(function() {
            var data = $searchForm.find('.yelp-search__field--text').select2('data');

            // If we submit an empty form, that's stupid.
            if (data !== null || data.length) {
                $.ajax({
                    data: data,
                    type: 'post',
                    success: function(results) {
                        $results.html(results);
                    }
                });
            }

            return false;
        });

    $document.on('click touchend', '.results__list__item__delete', function () {
        $.ajax({
            data: {
                id: $(this).data('id')
            },
            type: 'delete',
            success: function(results) {
                console.log(results);
                $results.html(results);
            }
        });
        return false;
    });

    $document.on('click touchend', '.page-header__random', function () {
        var $items = $results.find('.results__list__item').removeClass('selected');

        $($items[Math.floor(Math.random() * $items.length)]).addClass('selected');
        return false;
    });
});