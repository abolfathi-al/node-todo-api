var mongoose = require('mongoose');

var Hotel = mongoose.model('hotel', {
  HotelId: {
    type: String
  },
  NameHotel: {
    type: String
  },
  CodeIataCity: {
    type: String
  },
  BuiltYear: {
    type: String
  },
  CheckIn: {
    type: String
  },
  CheckOut: {
    type: String
  },
  FloorsCount: {
    type: String
  },
  LatitudeHotel: {
    type: String
  },
  LongitudeHotel: {
    type: String
  },
  NativeCurrency: {
    type: String
  },
  PostalCode: {
    type: String
  },
  RenovatedYear: {
    type: String
  },
  Fax: {
    type: String
  },
  ReservationPhone: {
    type: String
  },
  RoomsCount: {
    type: String
  },
  Star: {
    type: String
  },
  UpdatedAt: {
    type: String
  },
  Permalink: {
    type: String
  },
  NameTranslations: {
    type: String
  },
  DistanceToCityCentre: {
    type: String
  },
  DistanceToNearestAirport: {
    type: String
  },
  NearestAirportCode: {
    type: String
  },
  Description: {
    type: String
  },
  Address: {
    type: String
  },
  FormerName: {
    type: String
  },
  Website: {
    type: String
  },
  Email: {
    type: String
  }
});

module.exports = {
  Hotel
}