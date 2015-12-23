var Arrangement = require('../../models/arrangementModel');
var Hotel = require('../../models/hotelModel');
var Booking = require('../../models/bookingModel');
var Destination = require('../../models/destinationModel');
var Payment = require('../../models/paymentModel');
var Country = require('../../models/countryModel');

var faker = require('faker');

var staticData = function () {
    var destinationsPerCountry = 1;
    var hotelsPerDestination = 1;

    var dest1 = new Destination();
    var dest2 = new Destination();
    var dest3 = new Destination();
    var dest4 = new Destination();
    var dest5 = new Destination();
    var dest6 = new Destination();

    dest1.name = 'Aruba';
    dest2.name = 'Carucao';
    dest3.name = 'Bonaire';
    dest4.name = 'New York';
    dest5.name = 'Washington';
    dest6.name = 'Los Angeles';

    dest1.description = 'Iets over Aruba';
    dest2.description = 'Iets over Carucao';
    dest3.description = 'Iets over Bonaire';
    dest4.description = 'Iets over New York';
    dest5.description = 'Iets over Washington';
    dest6.description = 'Iets over Los Angeles';

    var destinationList = [
        dest1,
        dest2,
        dest3,
        dest4,
        dest5,
        dest6
    ];

    var country1 = new Country();
    var country2 = new Country();

    country1.name = 'Antillen';
    country1.description = 'Iets over de antillen';
    country2.name = 'Amerika';
    country2.description = 'Freedom, guns, obesity and more!';
    country1.destinations = [destinationList[0], destinationList[1], destinationList[2]];
    country2.destinations = [destinationList[3], destinationList[4], destinationList[5]];

    var countryList = [
        country1,
        country2
    ];

    var arrangementList = [{
        name: 'Full pension',
    }, {
        name: 'Half pension',
    }, {
        name: 'Breakfast'
    }];

    var generateCountries = function (count) {
        var countries = [];

        for (var i = 0; i < count; ++i) {
            var country = new Country();

            country.name = faker.address.country();
            country.description = faker.lorem.sentence();
            country.destinations = generateDestinations(destinationsPerCountry);

            countries.push(country);
        }

        for (var j = 0; j < countryList.length; j++) {
            countries.push(countryList[j]);
        }

        return countries;
    };

    var generateDestinations = function (count) {
        var destinations = [];

        for (var i = 0; i < count; i++) {
            var destination = new Destination();

            destination.name = faker.address.state();
            destination.description = faker.lorem.sentence();
            destination.hotels = generateHotels(hotelsPerDestination);

            destinations.push(destination);
        }

        return destinations;
    };

    var generateHotels = function (count) {
        var hotels = [];

        for (var i = 0; i < count; i++) {
            var hotel = new Hotel();

            hotel.name = faker.address.country();
            hotel.description = faker.lorem.sentence();
            hotel.rating = faker.random.number({min: 1.0, max: 10.0});
            hotel.arrangements = generateArrangements();

            hotels.push(hotel);
        }

        return hotels;
    };

    var generateArrangements = function () {
        var arrangements = [];

        for (var i = 0; i < arrangementList.length; i++) {
            var arr = new Arrangement();

            arr.name = arrangementList[i].name;
            arr.description = faker.lorem.sentence();
            arr.people = faker.random.number({min: 1, max: 10});
            arr.price = faker.random.number({min: 50, max: 1050});

            arrangements.push(arr);
        }

        return arrangements;
    };

    dest1.hotels = generateHotels(hotelsPerDestination);
    dest2.hotels = generateHotels(hotelsPerDestination);
    dest3.hotels = generateHotels(hotelsPerDestination);
    dest4.hotels = generateHotels(hotelsPerDestination);
    dest5.hotels = generateHotels(hotelsPerDestination);
    dest6.hotels = generateHotels(hotelsPerDestination);

    return {
        generateCountries: generateCountries,
        generateDestinations: generateDestinations,
        generateArrangements: generateArrangements,
        generateHotels: generateHotels
    }
};

module.exports = staticData;
