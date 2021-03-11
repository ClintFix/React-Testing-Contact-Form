import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'
import { act } from 'react-dom/test-utils'

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
       
        act(()=> {
             // - get first name input
            const firstNameInput = screen.getByLabelText('First Name*')
            // - add in value
            userEvent.type(firstNameInput, 'Hi')
            // - move to next input
            const button = screen.getByRole("button");
            userEvent.click(button);
        })
       

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
       
        act(()=> {
             // - get first name input
             const firstNameInput = screen.getByLabelText('First Name*')
            // - add in value
            userEvent.type(firstNameInput, 'Clint')
            // - move to next input
            const button = screen.getByRole("button");
            userEvent.click(button);
        })

        
        //Assert
        // - minLength of form input should be on the screen
        const firstNameValidation = screen.queryByText(/minLength/i)
        expect(firstNameValidation).not.toBeInTheDocument();
    });
});


//Test 2: Test email validation works as expected
test('Validates Email field - makes sure email in correct format (incorrect input)',async ()=>{
    render(<ContactForm />)

    const emailInput = screen.getByLabelText('Email*')
    userEvent.type(emailInput, "test")
    
    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(()=> {
        const emailValidation = screen.queryByText(/invalid email/i)
        expect(emailValidation).toBeInTheDocument();
    });
})


//Test 3: Information appears on screen after submit
test('Form works - entered info appears below',async ()=>{
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'TestFirstName')

    const lastNameInput = screen.getByLabelText('Last Name*')
    userEvent.type(lastNameInput, 'TestLastName')

    const emailInput = screen.getByLabelText('Email*')
    userEvent.type(emailInput, "test@test.com")
    
    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(()=> {
        const firstNameLog = screen.queryByText(/TestFirstName/i)
        const lastNameLog = screen.queryByText(/TestLastName/i)
        const emailLog = screen.queryByText(/test@test.com/i)
        expect(firstNameLog).toBeInTheDocument();
        expect(lastNameLog).toBeInTheDocument();
        expect(emailLog).toBeInTheDocument();
    });
})
