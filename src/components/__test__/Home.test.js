import { render, screen } from '@testing-library/react';
import Home from '../Home';
describe("Home Test Suit", () => {
    test('Test for heading', () => {
        render(<Home />);
        const linkElement = screen.getByText(/BlockChain based/i);
        expect(linkElement).toBeInTheDocument();
    });
    test('Test for button', () => {
        render(<Home />);
        const buttonElement = screen.getByRole('button', { name: /Download Metamask Extension/i })
        expect(buttonElement).toBeInTheDocument();
    });
})
