jQuery(function($) {
    var $document = $(document),
        $orgForm = $('.org-form'),
        $yelpForm = $('.yelp-search'),
        $results = $('.results');

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
            var $this = $(this);

            e.preventDefault();

            // TODO validate submitted data
            $.ajax({
                type: this.method,
                url: this.action,
                data: $this.serialize(),
                success: function (data) {
                    $('.group').html(data);
                }
            });

            $this.hide();
        });

    $yelpForm
        .on('submit', function() {
            var data = $yelpForm.find('.yelp-search__field--text').select2('data');

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
        })
        .find('.yelp-search__field--text').select2({
            minimumInputLength: 2,
            ajax: {
                url: $yelpForm.length ? $yelpForm[0].action : '',
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
            formatResult: function (restaurant) {
                var markup = '<div class="restaurant">';
                if (restaurant.image_url !== undefined) {
                    markup += '<img class="restaurant__image" src="' + restaurant.image_url + '">';
                }
                markup += '<div class="restaurant__info"><h3 class="restaurant__name">' + restaurant.name + '</h3></div>';
                if (restaurant.location.display_address !== undefined) {
                    markup += '<div class="restaurant__address">' + restaurant.location.display_address + '</div>';
                }
                if (restaurant.rating !== undefined) {
                    markup += '<div class="restaurant__rating">Rating: ' + restaurant.rating + '</div>';
                }
                markup += '</div>';
                return markup;
            },
            formatSelection: function (restaurant) {
                return restaurant.name;
            },
            dropdownCssClass: "bigdrop",
            escapeMarkup: function (m) {
                return m;
            }
        });

    $document
        .on('click touchend', '.results__list__item__delete', function () {
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
        })
        .on('click touchend', '.page-header__random', function () {
            var $items = $results.find('.results__list__item').removeClass('selected');

            $($items[Math.floor(Math.random() * $items.length)]).addClass('selected');
            return false;
        });

    window.chat.init();

});
