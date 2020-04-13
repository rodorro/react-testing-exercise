import { renderHook, act }  from '@testing-library/react-hooks';
import { useHotelCollection } from './hotel-collection.hook';
import { mapFromApiToVm } from './hotel-collection.mapper';
import { mapToCollection } from '../../common/mappers/collection.mapper';
import * as api from './hotel-collection.api';

describe('Hotel collection hook tests', () => {
    it('should return an empty array and loadHotelCollection a function when it calls ', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useHotelCollection());

        // Assert
        expect(result.current.hotelCollection).toEqual([]);
        expect(result.current.loadHotelCollection).toEqual(expect.any(Function));
    });
    it('should return array when it calls loadHotelCollection ', async () => {
        // Arrange
        const hotels: api.HotelEntityApi[] = [{
            id: '1',
            type: '',
            name: 'hotel',
            created: new Date(),
            modified: new Date(),
            address1: 'address',
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
            shortDescription: 'description',
            stateProvinceCode: '',
            thumbNailUrl: '/picture.jpg',
            tripAdvisorRating: 0,
            tripAdvisorRatingUrl: '',
          }
        ];

        const getHotelColecctionStub = jest.spyOn(api, 'getHotelCollection').mockResolvedValue(hotels);
        const hotelsMapped = mapToCollection(hotels, mapFromApiToVm);  

        // Act
        const { result, waitForNextUpdate } = renderHook(() => useHotelCollection());
        
        // Assert
        expect(result.current.hotelCollection).toEqual([]);

        // Act
        act(() => {
            result.current.loadHotelCollection();
        });

        await waitForNextUpdate();
        
        // Assert
        expect(getHotelColecctionStub).toHaveBeenCalled();
        expect(result.current.hotelCollection).toEqual(hotelsMapped);
    });
});