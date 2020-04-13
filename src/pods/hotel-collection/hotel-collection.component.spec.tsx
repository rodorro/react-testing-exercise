import React from "react";
import { HotelEntityVm } from "./hotel-collection.vm";
import * as hotelCollectionHook from './hotel-collection.hook';
import { render, waitForElement  } from "@testing-library/react";
import { HotelCollectionContainer } from "./hotel-collection.container";
import { HotelCollectionComponent } from "./hotel-collection.component";

describe('Hotel collection component tests', () => {

    it("should not display hotels before useEffect", () => {
        // Act
    
        // Assert
      });     

    it('should render hotel components with empty collection when hotel collection is empty', () => {
        // Arrange
        const hotelCollection: HotelEntityVm[] = [];

        // Act
        const { getByTestId } = render(<HotelCollectionComponent hotelCollection={hotelCollection} />);
        const hotelCollectionElement = getByTestId('div-hotel-collection-component');
    
        // Assert
        expect(hotelCollectionElement).toBeInTheDocument();
    });

    it('should render hotel component with one hotel when hotel collection has one element', () => {
      //Arrange
      const hotelCollection: HotelEntityVm[] = [
        {
          id: 'ID-1',
          picture: 'picture.jpg',
          name: 'Hotel name',
          description: 'Hotel description',
          rating: 4,
          address: 'Hotel address',
        },
      ];
  
      //Act
      const { getByTestId, getByText, queryAllByTestId } = render(<HotelCollectionComponent hotelCollection={hotelCollection} />);

      const hotelCollectionElement = getByTestId('div-hotel-collection-component');
      const hotelNameElement = getByText(hotelCollection[0].name);
      const hotelList = queryAllByTestId("hotel-card");
  
      //Assert
      expect(hotelCollectionElement).toBeInTheDocument();
      expect(hotelNameElement).toBeInTheDocument();
      expect(hotelList.length).toStrictEqual(1);
    });    

});