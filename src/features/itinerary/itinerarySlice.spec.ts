import { itineraryStateFactory } from '../../testing/factories/itineraryFactories'
import reducer, {
  moveCusor,
  initialState,
  ItineraryState,
  MapCoordinates,
  moveSearchCusor
} from './itinerarySlice'
import { faker } from '@faker-js/faker';

describe('itinerarySlice Tests', () => {
  describe('intital state Tests', () => {
    test('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(
        initialState
      )
    })
  })

  describe('moveCursor action Tests', () => {
    test('should handle the cursor being moved', () => {
      const previousState: ItineraryState = itineraryStateFactory()
      const newPosition: MapCoordinates = {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        zoom: faker.number.int({ min: 1, max: 15 })

      }
      const newState = reducer(previousState, moveCusor(newPosition))
      expect(newState.cursorPosition).toEqual(newPosition)
    })
  })

  describe('moveSearchCursor action Tests', () => {
    test('should handle the cursor being moved', () => {
      const previousState: ItineraryState = itineraryStateFactory()
      const newPosition: MapCoordinates = {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        zoom: faker.number.int({ min: 1, max: 15 })

      }
      const newState = reducer(previousState, moveSearchCusor(newPosition))
      expect(newState.searchCursorPosition).toEqual(newPosition)
    })
  })

})


