import * as React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import {
    render,
    fireEvent,
    waitFor,
} from '@testing-library/react';
import { SessionProvider } from 'core';
import * as api from './login.api';
import * as loginVm from './login.vm';
import { LoginContainer } from './login.container';
import { HotelCollectionScene } from 'scenes';


const renderWithRouter = component => {
    return {
      ...render(
        <HashRouter>
          <Switch>
            <Route path="/hotel-collection" component={HotelCollectionScene} />
          </Switch>
          <SessionProvider>{component}</SessionProvider>
        </HashRouter>
      ),
    };
};

describe('Login container tests', () => {

    it('should call credentials validation when submitted login', async () => {

      //Arrange
      const loginStub = jest.spyOn(loginVm, 'createEmptyLogin').mockReturnValue({
        login: 'admin',
        password: 'test',
      });

      const validateCredentialsStub = jest
        .spyOn(api, 'validateCredentials')
        .mockResolvedValue(true);
  
      //Act
      const { getByTestId } = renderWithRouter(<LoginContainer />);
      const loginButton = getByTestId('login-button');
  
      await waitFor(() => {
        fireEvent.click(loginButton);
      });
  
      //Assert
      expect(loginStub).toHaveBeenCalled();
      expect(validateCredentialsStub).toHaveBeenCalled();
    });
  });