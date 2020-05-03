import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextField }  from './text-field';
import { FieldInputProps } from 'react-final-form';

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
            textFieldDiv: 'textFieldDiv',
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
            textFieldDiv: 'textFieldDiv',
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

    it('should display error when meta.touched is true and error equal test error', () => {
        // Arrange
        const props = {
          input: {
            name: "inputText",
            value: "",
            onBlur: jest.fn(),
            onChange: jest.fn(),
            onFocus: jest.fn()
          } as FieldInputProps<any,any>,
          meta: {
            touched: true,
            error: 'test error',
          },
          textFieldDiv: 'textFieldDiv',
        };
    
        // Act
        const { getByTestId } = render(<TextField {...props} />);
        const textFieldDiv = getByTestId("textFieldDiv") as HTMLDivElement;
        const errorElement = textFieldDiv.childNodes[1] as HTMLParagraphElement;
    
        // Assert
        expect(textFieldDiv).toBeInTheDocument();
        expect(textFieldDiv.childElementCount).toStrictEqual(2);
        expect(errorElement.className).toStrictEqual("MuiFormHelperText-root Mui-error");
    });

    it('should not display error when meta.touched is false and error equal test error', () => {
        // Arrange
        const props = {
          input: {
            name: "inputText",
            value: "",
            onBlur: jest.fn(),
            onChange: jest.fn(),
            onFocus: jest.fn()
          } as FieldInputProps<any,any>,
          meta: {
            touched: false,
            error: 'test error',
          },
          textFieldDiv: 'textFieldDiv',
        };
    
        // Act
        const { getByTestId } = render(<TextField {...props} />);
        const textFieldDiv = getByTestId("textFieldDiv") as HTMLDivElement;
        const errorElement = textFieldDiv.childNodes[1] as HTMLParagraphElement;
    
        // Assert
        expect(textFieldDiv).toBeInTheDocument();
        expect(textFieldDiv.childElementCount).toStrictEqual(1);
        expect(errorElement.className).toEqual(undefined);
    });    
});