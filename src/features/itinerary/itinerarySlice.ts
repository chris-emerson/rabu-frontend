import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {itineraryGeneration} from './api';

export interface ItineraryItem {
    id: string,
    activity: string
    updatedAt: string,
    description: string,
    createdAt: string,
    longitude: number | null,
    latitude: number | null,
    image: string | null,
    itemGroup: string
}

export interface ItineraryItemGroup {
    id: string,
    label: string
    items: ItineraryItem[]
    updatedAt: string
    createdAt: string
}
export interface Itinerary {
    id: string,
    label: string,
    itemGroups: ItineraryItemGroup[]
    updatedAt: string
    createdAt: string
}
export interface MapCoordinates {
    longitude: number,
    latitude: number,
    zoom?: number
}

export interface ItineraryState {
    itineraries: Itinerary[],
    generateItineraryStatus: 'idle' | 'loading' | 'failed';
    cursorPosition: MapCoordinates,
    searchCursorPosition: MapCoordinates,
    activeItineraryId: string | null,
    activeItineraryItemGroupId: string | null,
    activeItineraryItemId: string | null
}
export const newForest: MapCoordinates = {
    latitude: 54.2379333607472,
    longitude: -2.36966957036279,
    zoom: 7
}
export const initialState: ItineraryState = {
    itineraries: [],
    generateItineraryStatus: 'idle',
    cursorPosition: newForest,
    searchCursorPosition: newForest,
    activeItineraryId: null,
    activeItineraryItemId: null,
    activeItineraryItemGroupId: null
};

export const generateItinerary = createAsyncThunk<Itinerary>(
    'itinerary/generate-itinerary',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState

        const placename = "test";
        const response = await itineraryGeneration(
            state.itinerary.searchCursorPosition.latitude,
            state.itinerary.searchCursorPosition.longitude,
            placename);

        try {
            return response
        } catch (e) {
            throw thunkAPI.rejectWithValue({ error: e })
        }

    }
);

export const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
        moveCusor: (state, action: { payload: MapCoordinates }) => {
            state.cursorPosition = action.payload
        },
        moveSearchCusor: (state, action: { payload: MapCoordinates }) => {
            state.searchCursorPosition = action.payload
        },
        setActiveItinerary: (state, action: { payload: string }) => {
            state.activeItineraryItemId = action.payload
        },
        setActiveItineraryItemGroup: (state, action: { payload: string }) => {
            state.activeItineraryItemGroupId = action.payload
        },
        setActiveItineraryItem: (state, action: { payload: string }) => {
            state.activeItineraryItemId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateItinerary.pending, (state) => {
                state.generateItineraryStatus = 'loading';
            })
            .addCase(generateItinerary.fulfilled, (state, action) => {
                state.generateItineraryStatus = 'idle';
                state.itineraries.push(action.payload);
                state.activeItineraryId = action.payload.id
                state.activeItineraryItemId = action.payload.itemGroups[0].items[0].id
                state.activeItineraryItemGroupId = action.payload.itemGroups[0].id
                state.cursorPosition = state.searchCursorPosition
            })
            .addCase(generateItinerary.rejected, (state) => {
                state.generateItineraryStatus = 'failed';
            });
    },
});

export default itinerarySlice.reducer;

const matchesId = (element: any, id: number) => element.id === id.toString();
export const isLoading = (state: RootState) => state.itinerary.generateItineraryStatus === 'loading'
export const selectCursor = (state: RootState) => state.itinerary.cursorPosition
export const selectSearchCursor = (state: RootState) => state.itinerary.searchCursorPosition
export const selectActiveItineraryItemGroupId = (state: RootState) => state.itinerary.activeItineraryItemGroupId

export const selectItinerary = (state: RootState, id: string) => state.itinerary.itineraries.find(matchesId)

export const selectActiveItinerary = (state: RootState) => {
    if (state.itinerary.activeItineraryId) {
        return state.itinerary.itineraries.find(elem => elem.id === state.itinerary.activeItineraryId) || null
    } else {
        return null
    }
}
export const selectActiveItineraryItemGroup = (state: RootState) => {
    if (state.itinerary.activeItineraryId) {
        const itinerary = state.itinerary.itineraries.find(elem => elem.id === state.itinerary.activeItineraryId)
        const groups = itinerary?.itemGroups.find(elem => elem.id === state.itinerary.activeItineraryItemGroupId)
        return itinerary?.itemGroups.find(elem => elem.id === state.itinerary.activeItineraryItemGroupId) || null
    }
}
export const selectActiveItineraryItem = (state: RootState) => {
    if (state.itinerary.activeItineraryId) {
        const itinerary = state.itinerary.itineraries.find(elem => elem.id === state.itinerary.activeItineraryId)
        const activeItineraryItemId = state.itinerary.activeItineraryItemId
        const activeGroups = itinerary?.itemGroups.find(elem => elem.id === state.itinerary.activeItineraryItemGroupId)

        return activeGroups?.items.find(elem => elem.id === activeItineraryItemId)

    }
}

export const actions = itinerarySlice.actions

export const {
    setActiveItinerary,
    setActiveItineraryItem,
    setActiveItineraryItemGroup,
    moveCusor,
    moveSearchCusor
} = itinerarySlice.actions
