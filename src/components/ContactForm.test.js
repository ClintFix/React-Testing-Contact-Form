import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

//Sanity Check Test
test("Sanity check", ()=> {
    render(<ContactForm/>)
})

//Test 1: Validation on First Name works as expected
describe('Validation on First Name works as expected', ()=> {
    test('Test validation: minlength of 3', async ()=> {
        //Arrange:
        render(<ContactForm/>)

        //Act
        // - get first name input
        const firstNameInput = screen.getByLabelText('First Name*')
        // - add in value
        userEvent.type(firstNameInput, 'Hi')
        // - move to next input
        userEvent.tab()
        userEvent.tab()

        //Assert
        // - minLength of form input should be on the screen
        await waitFor(()=> {
            const firstNameValidation = screen.queryByText(/minLength/i)
            expect(firstNameValidation).toBeInTheDocument();
        });
    });

    test('Test input happy path - name longer than 3 letters', ()=> {
        //Arrange:
        render(<ContactForm/>)

        //Act
        // - get first name input
        // - add in value
        // - move to next input

        //Assert
        // - minLength of form input should be on the screen
        
    });
});


//Test 2: Test email validation works as expected

//Test 3: Information appears on screen after submit

