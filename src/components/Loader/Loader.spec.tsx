import { renderWithProviders } from '../../testing/renderComponent';
import Loader from './Loader';

describe('Loader test', () => {
    it('should return render successfully', () => {
        const component = renderWithProviders(<Loader/>, {})

        expect(component.getByTestId("Loader")).toBeTruthy()
    })
})
