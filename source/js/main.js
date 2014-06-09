jQuery(function($) {
    var $form = $('.yelp-search'),
        $results = $('.results');

    function restaurantFormatResult (restaurant) {
        var markup = "<table class='restaurant-result'><tr>";
        if (restaurant.image_url !== undefined) {
            markup += "<td class='restaurant-image'><img src='" + restaurant.image_url + "'/></td>";
        }
        markup += "<td class='restaurant-info'><div class='restaurant-name'>" + restaurant.name + "</div>";
        if (restaurant.rating !== undefined) {
            markup += "<div class='restaurant-rating'>" + restaurant.rating + "</div>";
        }
        markup += "</td></tr></table>";
        return markup;
    }

    function restaurantFormatSelection (restaurant) {
        return restaurant.name;
    }

    $form
        .find('.yelp-search__field--text').select2({
            minimumInputLength: 2,
            ajax: {
                url: '/search',
                quietMillis: 150,
                data: function (term, page) {
                    return {
                        'restaurant': term,
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
            var data = $form.find('.yelp-search__field--text').select2('data');

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

    $results.on('click touchend', '.results__list__item__delete', function () {
        console.log('touched');
        $.ajax({
            url: '/restaurant',
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
});