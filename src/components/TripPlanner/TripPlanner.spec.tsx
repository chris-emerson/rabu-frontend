import { renderWithProviders } from '../../testing/renderComponent';
import { THREE_DAY_ITINERARY, itineraryStateFactory } from '../../testing/factories/itineraryFactories';
import { TripPlanner } from './TripPlanner';
import { waitFor, screen } from '@testing-library/react';

const mockGenerateItinerary = jest.fn()

jest.mock('../../features/itinerary/api', () => ({
    generateItinerary: () => mockGenerateItinerary()
}))

describe('TripPlanner Component Test', () => {
    it('should display the summary text of the first group item', async () => {
        const itinerary = THREE_DAY_ITINERARY
        const preloadedState =  {
            itinerary: itineraryStateFactory({
                itineraries: [itinerary],
                activeItineraryId: itinerary.id,
                activeItineraryItemId: itinerary.itemGroups[0].items[0].id,
                activeItineraryItemGroupId: itinerary.itemGroups[0].id
        })}

        renderWithProviders(<TripPlanner/>, {
            preloadedState: preloadedState
        })

        const activeItineraryItem = itinerary.itemGroups[0].items[0]
        await waitFor(async()=>{
            expect(screen.getByTestId('ActivitySummaryTitle'))
            .toHaveTextContent(activeItineraryItem.activity)
        })
    })

    it('should display the detailed text of the first group item', async () => {
        const itinerary = THREE_DAY_ITINERARY
        const preloadedState =  {
            itinerary: itineraryStateFactory({
                itineraries: [itinerary],
                activeItineraryId: itinerary.id,
                activeItineraryItemId: itinerary.itemGroups[0].items[0].id,
                activeItineraryItemGroupId: itinerary.itemGroups[0].id
        })}

        renderWithProviders(<TripPlanner/>, {
            preloadedState: preloadedState
        })

        const activeItineraryItem = itinerary.itemGroups[0].items[0]
        await waitFor(async()=>{
            expect(screen.getByTestId('ActivitySummaryDescription'))
            .toHaveTextContent(activeItineraryItem.description)
        })
    })

    // it('should call the generateItinerary fn when New Trip button clicked',  async() => {
    //     const itinerary = THREE_DAY_ITINERARY

    //     const preloadedState =  {
    //         itinerary: itineraryStateFactory({
    //             itineraries: [itinerary],
    //             activeItineraryId: itinerary.id,
    //             activeItineraryItemId: itinerary.itemGroups[0].items[0].id,
    //             activeItineraryItemGroupId: itinerary.itemGroups[0].id
    //     })}

    //     mockGenerateItinerary.mockResolvedValue(() => itinerary)

    //     renderWithProviders(<TripPlanner/>, {
    //         preloadedState: preloadedState
    //     })

    //     await waitFor(() => screen.getByText(/new trip/i))

    //     fireEvent.click(screen.getByText(/new trip/i))
    //     expect(mockGenerateItinerary).toHaveBeenCalled()
    // })
})
