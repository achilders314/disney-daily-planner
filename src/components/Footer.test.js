import { screen, render } from '@testing-library/react';
import React from 'react'
import Footer from './Footer'


describe('Footer', () => {
    it('Displays my copyright message', () => {
        render(<Footer/>);

        expect(screen.getByText("2023 by Alison Childers", {
            exact: false,
        })).toBeInTheDocument();
    })
})