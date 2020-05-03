import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginComponent } from './login.component';

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('Login component tests', () => {

    it('should render Login component', () => {
        //Arrange
        const props = {
            onLogin: jest.fn(),
            initialLogin: {
                login: '',
                password: '',
            },
        };
    
        //Act
        const { getByTestId } = render(<LoginComponent {...props} />);
    
        const loginCard = getByTestId('login-card');
        const nameInput = getByTestId('name-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('login-button');
    
        //Assert
        expect(loginCard).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();

        expect(nameInput).toHaveValue(props.initialLogin.login);
        expect(passwordInput).toHaveValue(props.initialLogin.password);
    });

    it('should call login validation when submit valid login', async () => {
        //Arrange
        const props = {
          onLogin: jest.fn(),
          initialLogin: {
            login: '',
            password: '',
          },
        };
    
        //Act
        const { getByTestId } = render(<LoginComponent {...props} />);
    
        const nameInput = getByTestId('name-input') as HTMLInputElement;
        const passwordInput = getByTestId('password-input') as HTMLInputElement;
        const loginButton = getByTestId('login-button');
    
        await waitFor(() => {
          fireEvent.change(nameInput, {
            target: {
              value: 'admin',
            },
          });
    
          fireEvent.change(passwordInput, {
            target: {
              value: 'test',
            },
          });
    
          fireEvent.submit(loginButton);
        });
    
        //Assert
        expect(nameInput.value).toEqual('admin');
        expect(passwordInput.value).toEqual('test');
        expect(props.onLogin).toHaveBeenCalled();
    });
    
    it('should not call login validation when submit invalid login', async () => {
        //Arrange
        const props = {
          onLogin: jest.fn(),
          initialLogin: {
            login: '',
            password: '',
          },
        };
    
        //Act
        const { getByTestId } = render(<LoginComponent {...props} />);
    
        const loginButton = getByTestId('login-button');
    
        await waitFor(() => {
          fireEvent.click(loginButton);
        });
    
        //Assert
        expect(props.onLogin).not.toHaveBeenCalled();
    });      

});