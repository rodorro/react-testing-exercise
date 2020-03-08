import { mapToCollection } from "./collection.mapper";

describe('Collection mapper tests', () => {
    it('should return empty array when it feeds undefined', () => {
        // Arrange
        const collection: [] = undefined;
        const mapFromApiToVm = jest.fn();

        // Act
        const result = mapToCollection(collection, mapFromApiToVm);

        // Assert
        expect(result).toEqual([]);
    });

    it('should return empty array when it feeds null', () => {
        // Arrange
        const collection: [] = null;
        const mapFromApiToVm = jest.fn();

        // Act
        const result = mapToCollection(collection, mapFromApiToVm);

        // Assert
        expect(result).toEqual([]);
    });

    it('should return array one mapped item when it feeds array with one item', () => {
        // Arrange
        const item = {
            id: 1,
            name: 'Juan',
            surname: 'Martin'
        }
        const mappedItem = {
            id: 1,
            name: 'Juan Martin'
        }
        const collection = [item];
        const mapFromApiToVm = jest.fn().mockImplementation(result => {
            return mappedItem;
        });

        // Act
        const result = mapToCollection(collection, mapFromApiToVm);

        // Assert
        expect(result).toEqual([mappedItem]);
    });    

    it('should call mapFromApiToVm when it feeds item on array', () => {
        // Arrange
        const item = {
            id: 1,
            name: 'Juan',
            surname: 'Martin'
        }
        const collection = [item];
        const mapFromApiToVm = jest.fn();

        // Act
        const result = mapToCollection(collection, mapFromApiToVm);

        // Assert
        expect(mapFromApiToVm).toHaveBeenCalled();
    });
});