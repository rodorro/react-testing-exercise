import { renderHook }  from '@testing-library/react-hooks';
import { useHotelCollection } from './hotel-collection.hook';
import { getHotelCollection } from './hotel-collection.api';

jest.mock('./hotel-collection.api', () => {
    return {
        getHotelCollection: jest.fn()
    }
});

describe('Hotel collection hook tests', () => {
    it('should return an empty array and loadHotelCollection a function when it calls it ', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useHotelCollection());

        // Assert
        expect(result.current.hotelCollection).toEqual([]);
        expect(result.current.loadHotelCollection).toEqual(expect.any(Function));
    });
    xit('should return array when it calls loadHotelCollection ', () => {
        // Arrange
        const hotels = [{
            id: '1',
            picture: '',
            name: 'hotel1',
            description: 'hotel desc',
            rating: 3,
            address: 'hotel address',
        }];

        // Act
        const { result } = renderHook(() => useHotelCollection());

        result.current.loadHotelCollection();
    
        // Assert
        expect(result.current.hotelCollection).toEqual([]);
    });
    it('', () => {
        // Arrange

        // Act

        // Assert
    });    
});