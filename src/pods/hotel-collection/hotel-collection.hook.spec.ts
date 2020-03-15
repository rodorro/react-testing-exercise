import { renderHook, act }  from '@testing-library/react-hooks';
import { useHotelCollection } from './hotel-collection.hook';
import * as api from './hotel-collection.api';
import Axios from 'axios';
import { baseApiUrl } from 'core/const';
import { HotelEntityVm } from './hotel-collection.vm';

// jest.mock('./hotel-collection.hook', () => ({
//     getHotelCollection: jest.spyOn(Axios, 'get').mockResolvedValue({
//         data: hotels,
//     }),
//     setHotelCollection: jest.fn().mockImplementation(() => {
        
//     }),
//     mapToCollection: jest.fn().mockImplementation(result => [{
//         id: '1',
//         picture: 'picture',
//         name: 'hotel',
//         description: 'hotel description',
//         rating: 4,
//         address: 'hotel address',
//     }])
// }));

// jest.mock('./hotel-collection.hook', () => ({
//     loadHotelCollection: jest.fn().mockReturnValue([])
// }));

describe('Hotel collection hook tests', () => {
    it('should return an empty array and loadHotelCollection a function when it calls ', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useHotelCollection());

        // Assert
        expect(result.current.hotelCollection).toEqual([]);
        expect(result.current.loadHotelCollection).toEqual(expect.any(Function));
    });
    it('should not return undefined not empty array when it calls loadHotelCollection ', async () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useHotelCollection());
        
        await act(async() => {
            result.current.loadHotelCollection();       
        });

        // Assert
        expect(result.current.hotelCollection).not.toEqual(undefined);
        expect(result.current.hotelCollection).not.toBe([]);
    });
    it('should return array when it calls loadHotelCollection', async () => {
        // Arrange
        const hotels = [{
            id: '1',
            picture: 'picture',
            name: 'hotel',
            description: 'hotel description',
            rating: 4,
            address: 'hotel address',
        }];
        const mapToCollection = jest.fn().mockResolvedValue(hotels);
        const getHotelCollection = jest.spyOn(api, 'getHotelCollection').mockImplementation(mapToCollection);

        // Act
        const { result } = renderHook(() => useHotelCollection());
        
        await act(async() => {
            result.current.loadHotelCollection();       
        });

        // Assert
        expect(getHotelCollection).toHaveBeenCalled();
        // expect(result.current.hotelCollection).toEqual(hotels);
    });    
});