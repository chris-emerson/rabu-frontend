import { ImageList, ImageListItem, ListSubheader, Typography, useTheme } from '@mui/material';
import { selectActiveItinerary, selectActiveItineraryItemGroup } from '../../features/itinerary/itinerarySlice';
import { useAppSelector } from '../../app/hooks';
import { Activity } from '../Activity/Activity';

export const Activities = () => {
    const activeItineraryItemGroup = useAppSelector(selectActiveItineraryItemGroup)
    const activeItinerary = useAppSelector(selectActiveItinerary)
    const theme = useTheme();

    return activeItineraryItemGroup ? (
        <>
            <ImageList sx={{}} >
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">
                        <Typography
                            fontFamily={"Dancing Script"}
                            style={{
                                padding: 10,
                                color: theme.palette.primary.main,
                                fontSize: "1.5em",
                                fontWeight: 700
                            }}>
                            {activeItineraryItemGroup.label} - {activeItinerary!.label}
                        </Typography>
                    </ListSubheader>
                </ImageListItem>
                {activeItineraryItemGroup.items.map((item, index) => (
                    <Activity itineraryItem={item} key={index} />
                ))}
            </ImageList>

        </>) : <></>
}