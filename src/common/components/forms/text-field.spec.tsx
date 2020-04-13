import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextField }  from './text-field';

describe('TextField component tests', () => {
    it('it should display the text field', () => {
        // Arrange
        const meta = {
            error: 'text field error'
        };
        
        const props = {
            input: {
                name: 'text field name',
                value: 'text field value',
                onChange: jest.fn(),
                onBlur: jest.fn(),
                onFocus: jest.fn(),
                type: 'text',
                checked: false,
                multiple: false,
            },
            meta: meta,
            'data-testid':'text-field'
        };

        // Act
        const { getByTestId  } = render(<TextField {...props} />);
        const inputElement = getByTestId('text-field') as HTMLInputElement;

        // Assert
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toEqual('text field value');
    });

    it('it should update value when the text field changes', () => {
        // Arrange
        const meta = {
            error: 'text field error'
        };
        const changePrueba = () => {
            props.input.value = '';
        }
        const props = {
            input: {
                name: 'text field name',
                value: 'text field value',
                onChange: jest.fn(),
                onBlur: jest.fn(),
                onFocus: jest.fn(),
                type: 'text',
                checked: false,
                multiple: false,
            },
            meta: meta,
            'data-testid':'text-field'
        };

        // Act
        const { getByTestId  } = render(<TextField {...props} />);
        const inputElement = getByTestId('text-field') as HTMLInputElement;

        fireEvent.change(inputElement, {
            target: {
                value: 'text field new value',
            },
        })

        // Assert
        expect(inputElement).toBeInTheDocument();
        expect(props.input.onChange).toHaveBeenCalled();
    });    
});