$(document).ready(function() {

  // destroy reviews modal on close
  $("#hotelReviews").on('hidden.bs.modal', function () {
      $(".modal-body").html("");
  });

  // destroy error modal on close
  $("#error").on('hidden.bs.modal', function () {
      $(".modal-body").html("");
  });

  // reviews button click handler + AJAX data
    $('.hotels').on('click', 'button.reviews', function() {
        // API call for displaying reviews
        $.ajax({
            type: "GET",
            dataType: 'json',
            data: {
                hotel_id: $(this).attr('data-hotel-id')
            },
            url: "http://fake-hotel-api.herokuapp.com/api/reviews",
            success: function(data) {
                $.each(data, function(key, value) {
                    let customer = data[key].name;
                    let comment = data[key].comment;
                    let positive = data[key].positive;

                    // rating check and adding minus or plus sign
                    let review = positive ? "<i class='fa fa-plus-circle rating' aria-hidden='true'>" + "</i>" : "<i class='fa fa-minus-circle rating' aria-hidden='true'>" + "</i>"

                    // initialize modal and append data
                    $("#hotelReviews")
                    .find('.modal-body')
                    .append(
                      review
                      + "<span class='customer'>" + customer + "</span>"
                      + "<p class='comment'>" + comment + "</p>"
                    );

                    $("#hotelReviews").modal('show');
                });
            }
        });
    });

    $('.button').click(function(){
        // API call for displaying hotel info
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "http://fake-hotel-api.herokuapp.com/api/hotels",
            data: {
              count: 5
            },
            success: function(data) {
              $.each(data, function(key, value) {
                let id = data[key].id;
                let name = data[key].name;
                let city = data[key].city;
                let country = data[key].country;
                let description = data[key].description;
                let price = data[key].price;
                let images = data[key].images;
                let rating = data[key].stars;
                let date_start = new Date(data[key].date_start);
                let date_end = new Date(data[key].date_end);

                // German time format, using moments.js
                let from = moment(date_start).locale('de').format('DD.MM.YYYY');
                let to = moment(date_end).locale('de').format('DD.MM.YYYY');
                let stars = "";

                // Fontawesome stars + JSON data makes magic
                stars += "<i class='star-"+ rating +"'></i> <br>";

                // form the HTML template for displaying hotels
                $('.hotels').append(
                  "<div class='col-md-12 col-lg-12'>"
                  + "<img class='img-responsive thumbnail col-md-6' src='"+ images[0] +"'>"
                  + "<div class='col-md-6 pull-right'>"
                  + '<div class="rating pull-right">' + stars + '</div>'
                  + '<h1 class="hotel-name">'+ name + '</h1>'
                  + "<span class='location'>"+ city + ' - '+ country + '</span>' + '<br />' + '<br />'
                  + "<p class='hotel-description'>" + "Hotel description: " + description + '</p>'
                  + "<br />" + "<span class='price pull-right'>" + price + "&#8364;" + "</span>"
                  + "<br />" + "<span class='dates-available pull-right'>" + from + ' - ' + to + "</span>"
                  + "<button class='reviews button btn-responsive' data-toggle='modal' data-target='#myModal' data-hotel-id=\"" + id + "\">SHOW REVIEWS" + "</button>"
                  + "</div></div></div>" + "<br/>"
                  );
              });
            },
            // handle errors in modal
            error: function(request, status, error) {
              $("#error")
              .find('.modal-body')
              .append("<h2 class='errors'>Something went wrong! Please try again." + "</h2>");
              $("#error").modal('show');
            }
        });
    });
});
