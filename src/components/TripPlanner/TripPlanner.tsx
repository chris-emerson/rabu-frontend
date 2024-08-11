import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Activities } from "../Activities/Activities"
import { useEffect, useState } from 'react';
import { Button, Paper, Typography, useTheme } from '@mui/material';
import { actions, selectActiveItinerary, generateItinerary, isLoading, selectActiveItineraryItem, selectActiveItineraryItemGroupId } from '../../features/itinerary/itinerarySlice';
import Loader from '../Loader/Loader'
import { useAppDispatch, useAppSelector } from '../../app/hooks';



export const TripPlanner = () => {
    const theme = useTheme()
    const itinerary = useAppSelector(selectActiveItinerary)
    const itineraryItem = useAppSelector(selectActiveItineraryItem)
    const dispatch = useAppDispatch()
    const loading: boolean = useAppSelector(isLoading)

    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        dispatch<any>(generateItinerary())
    }, [])

    const onGenerateItineraryClick = (e: any) => {
        dispatch<any>(generateItinerary())
    };

  
    return loading ? <Loader /> : (<>
        <Typography
            data-testid="ActivitySummaryTitle"
            fontFamily={"Dancing Script"}
            style={{
                backgroundColor: theme.palette.primary.main,
                color: "#FFFFFF",
                padding: 20,
                fontSize: "1.5em",
                fontWeight: 700
            }}>
            {itineraryItem?.activity}...
        </Typography><br />
        <Typography
            variant="subtitle2"
            data-testid="ActivitySummaryDescription"
            style={{ 'padding': 10 }}>
            {itineraryItem?.description}
        </Typography>
        <br />
        <Paper elevation={9}>
            <Tabs
                value={activeTab}
                onChange={(e, newTabIndexValue) => {
                    setActiveTab(newTabIndexValue)
                    const newActiveItemGroupId = itinerary!.itemGroups[newTabIndexValue].id
                    dispatch(actions.setActiveItineraryItemGroup(newActiveItemGroupId))

                }}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >

                <Tab label="Day 1" value={0} />
                <Tab label="Day 2" value={1} />
                <Tab label="Day 3" value={2} />

            </Tabs>

            <Activities />
        </Paper>
        <Button 
        variant="contained" 
        onClick={onGenerateItineraryClick}>New Trip</Button>
    </>)
}