import { renderWithProviders } from '../../testing/renderComponent';
import Loader from './Loader';
import {screen} from '@testing-library/react'

describe('Loader test', () => {
    it('should return render successfully', () => {
        renderWithProviders(<Loader/>, {})

        expect(screen.getByTestId("Loader")).toBeTruthy()
    })
})
