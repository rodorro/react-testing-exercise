import React from "react";
import { HotelEntityVm } from "./hotel-collection.vm";
import * as hotelCollectionHook from './hotel-collection.hook';
import { render, waitForElement  } from "@testing-library/react";
import { HotelCollectionContainer } from "./hotel-collection.container";

describe('Hotel collection container component tests', () => {

    it("should not display hotels before useEffect", () => {
        // Act
        const { queryAllByTestId } = render(<HotelCollectionContainer />);
        const hotelCollection = queryAllByTestId("hotel-card");
    
        // Assert
        expect(hotelCollection.length).toStrictEqual(0);
      });     

    it('should render hotel collection components after useEffect and load hotels from api', () => {
        // Arrange
        const hotelCollectionVM: HotelEntityVm[] = [
            {
              id: 'ID-1',
              picture: 'image.jpg',
              name: 'Hotel name',
              description: 'Hotel description',
              rating: 4,
              address: 'Hotel address',
            },
        ];

        const loadHotelCollectionStub = jest.fn();

        // Act
        const getHotelCollectionStub = jest.spyOn(hotelCollectionHook, 'useHotelCollection').mockReturnValue({
          hotelCollection: hotelCollectionVM,
          loadHotelCollection: loadHotelCollectionStub
        });        

        const { getByText  } = render(<HotelCollectionContainer />);
        const nameElement = getByText(hotelCollectionVM[0].name);
        const descriptionElement = getByText(hotelCollectionVM[0].description);
        
        // Assert
        expect(getHotelCollectionStub).toHaveBeenCalled();
        expect(loadHotelCollectionStub).toHaveBeenCalled();
        expect(nameElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
    });

});