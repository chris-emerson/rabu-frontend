import { renderWithProviders } from '../../testing/renderComponent';
import { THREE_DAY_ITINERARY, itineraryStateFactory } from '../../testing/factories/itineraryFactories';
import { Activities } from './Activities';

// jest.mock("react-redux", () => ({
//     ...jest.requireActual("react-redux"),
//     useAppSelector: jest.fn()
//   }));

describe('Activities Component Test', () => {
    it('should render the activities and display the expected description', () => {
        const itinerary = THREE_DAY_ITINERARY
        const preloadedState =  {
            itinerary: itineraryStateFactory({
                itineraries: [itinerary],
                activeItineraryId: itinerary.id,
                activeItineraryItemId: itinerary.itemGroups[0].items[0].id,
                activeItineraryItemGroupId: itinerary.itemGroups[0].id
        })}
        const container = renderWithProviders(<Activities/>, {
            preloadedState: preloadedState})

        const expected_description = itinerary.itemGroups[0].items[0].description
        expect(container.getByText(expected_description)).toBeTruthy()
    })

})
