import { HotelEntityApi } from "./hotel-collection.api";
import { HotelEntityVm } from "./hotel-collection.vm";
import { mapFromApiToVm } from "./hotel-collection.mapper";
import { basePicturesUrl } from 'core';

describe('Hotel collection mapper tests', () => {

  it('should return null hotel when passing undefined', () => {
      // Arrange
      const hotel: HotelEntityApi = undefined;

      // Act
      const result: HotelEntityVm = mapFromApiToVm(hotel);

      // Assert
      expect(result).toBe(null);
  });

  it('should return null hotel when passing null', () => {
      // Arrange
      const hotel: HotelEntityApi = null;

      // Act
      const result: HotelEntityVm = mapFromApiToVm(hotel);

      // Assert
      expect(result).toBe(null);
  });

  it('should return empty hotel when passing empty values', () => {
      // Arrange
      const hotel: HotelEntityApi = {
          id: '',
          type: '',
          name: '',
          created: new Date(),
          modified: new Date(),
          address1: '',
          airportCode: '',
          amenityMask: 0,
          city: '',
          confidenceRating: 0,
          countryCode: '',
          deepLink: '',
          highRate: 0,
          hotelId: 0,
          hotelInDestination: false,
          hotelRating: 0,
          location: {
            latitude: 0,
            longitude: 0,
          },
          locationDescription: '',
          lowRate: 0,
          metadata: {
            path: ''
          },
          postalCode: 0,
          propertyCategory: 0,
          proximityDistance: 0,
          proximityUnit: '',
          rateCurrencyCode: '',
          shortDescription: '',
          stateProvinceCode: '',
          thumbNailUrl: '',
          tripAdvisorRating: 0,
          tripAdvisorRatingUrl: '',
        };

      // Act
      const result: HotelEntityVm = mapFromApiToVm(hotel);

      // Assert
      expect(result).toEqual({
          id: '',
          picture: `${basePicturesUrl}`,
          name: '',
          description: '',
          rating: 0,
          address: ''
        });
  });

  it('should return same values hotel when passing values', () => {
      // Arrange
      const hotel: HotelEntityApi = {
          id: '1',
          type: '',
          name: 'Hotel1',
          created: new Date(),
          modified: new Date(),
          address1: 'hotel address',
          airportCode: '',
          amenityMask: 0,
          city: '',
          confidenceRating: 0,
          countryCode: '',
          deepLink: '',
          highRate: 0,
          hotelId: 0,
          hotelInDestination: false,
          hotelRating: 3,
          location: {
            latitude: 0,
            longitude: 0,
          },
          locationDescription: '',
          lowRate: 0,
          metadata: {
            path: ''
          },
          postalCode: 0,
          propertyCategory: 0,
          proximityDistance: 0,
          proximityUnit: '',
          rateCurrencyCode: '',
          shortDescription: 'Desc from hotel',
          stateProvinceCode: '',
          thumbNailUrl: 'picturecl',
          tripAdvisorRating: 0,
          tripAdvisorRatingUrl: '',
        };

      // Act
      const result: HotelEntityVm = mapFromApiToVm(hotel);

      // Assert
      expect(result).toEqual({
          id: '1',
          picture: `${basePicturesUrl}${hotel.thumbNailUrl}`,
          name: 'Hotel1',
          description: 'Desc from hotel',
          rating: 3,
          address: 'hotel address'
        });
    });
});