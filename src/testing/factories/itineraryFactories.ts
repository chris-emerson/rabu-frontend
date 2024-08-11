import { 
    ItineraryItemGroup, 
    ItineraryItem,
    Itinerary, 
    ItineraryState } from "../../features/itinerary/itinerarySlice";
    
import { faker } from '@faker-js/faker';

export const itineraryItemFactory = 
    (overrides: Partial<ItineraryItem> = {}): ItineraryItem => {
    
        const defaults: ItineraryItem = {
            id: faker.number.int().toString(),
            activity: faker.word.words(5),
            updatedAt: faker.date.recent().toISOString(),
            createdAt: faker.date.past().toISOString(),
            longitude: faker.location.longitude(),
            latitude: faker.location.latitude(),
            image: faker.image.url(),
            description: faker.word.words(8),
            itemGroup: faker.number.int().toString()
        }
        
        return {...defaults, ...overrides}
    }

export const itineraryItemGroupFactory = 
    (overrides: Partial<ItineraryItemGroup> = {}): ItineraryItemGroup => {
    
        const defaults: ItineraryItemGroup = {
            id: faker.number.int().toString(),
            items: [],
            label: faker.word.words(5),
            updatedAt: faker.date.recent().toISOString(),
            createdAt: faker.date.past().toISOString()
        }
        
        return {...defaults, ...overrides}
    }
    

export const itineraryFactory = 
(overrides: Partial<Itinerary> = {}): Itinerary => {

    const defaults: Itinerary = {
        id: faker.number.int().toString(),
        label: faker.word.words(5),
        itemGroups: [],
        updatedAt: faker.date.recent().toISOString(),
        createdAt: faker.date.past().toISOString()
    }
    
    return {...defaults, ...overrides}
}

export const itineraryStateFactory = 
(overrides: Partial<ItineraryState> = {}) : ItineraryState => {

    const defaults: ItineraryState = {
        itineraries: [itineraryFactory()],
        generateItineraryStatus: 'idle',
        cursorPosition: {latitude: 51.5012, longitude: -0.1419},
        searchCursorPosition:  {latitude: 51.5012, longitude: -0.1419},
        activeItineraryId: null,
        activeItineraryItemId: null,
        activeItineraryItemGroupId: null
    }

    return {...defaults, ...overrides}
}

export const EMPTY_ITINERARY = itineraryFactory()
export const THREE_DAY_ITINERARY = itineraryFactory({
    label: "Three Day Itinerary",
        itemGroups: [
            itineraryItemGroupFactory({
                label: 'Day 1',
                items: [itineraryItemFactory()]}),
            itineraryItemGroupFactory({
                label: 'Day 2',
                items: [itineraryItemFactory()]}),
            itineraryItemGroupFactory({
                label: 'Day 3',
                items: [itineraryItemFactory()]})
        ]
    })

