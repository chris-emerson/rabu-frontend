import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material"
import { ItineraryItem, MapCoordinates, actions } from "../../features/itinerary/itinerarySlice";
import { useAppDispatch } from "../../app/hooks";
import { Info } from "@mui/icons-material";
import { useMap } from "react-map-gl/maplibre";

export const  DEFAULT_IMAGE = "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQXxLOQRv9_WKXHV_HU19USQvFm1VDVVsfccQ8u9ERuOqDMullYMIrAUQcf6NKJdx0nAE2NSrRBqAR6j9sdum5r2TY3Vh3Sw_eJvx-A5A"

export interface ActivityProps {
    itineraryItem: ItineraryItem
}

export const Activity = (props: ActivityProps) => {
    const dispatch = useAppDispatch()
    const { planner } = useMap()
    
    const item = props.itineraryItem

    const gotoActivity = (item: ItineraryItem) => {
        dispatch(actions.setActiveItineraryItem(item.id.toString()))
        dispatch(actions.setActiveItineraryItemGroup(item.itemGroup.toString()))

        const coordinates: MapCoordinates = {
            longitude: item.longitude!,
            latitude: item.latitude!,
            zoom: 12
          }
    
        if (planner) {
            planner.flyTo({
                center: [item.longitude!, item.latitude!],
                zoom: 12
            });
        }
    };
    
return (  <>
    <ImageListItem key={item.id}  cols={1} style={{'height': 250, 'width': '100%'}}>
        <img
            onClick={(e) => {
                gotoActivity(item)
            }}
            srcSet={item.image || DEFAULT_IMAGE}
            src={item.image || DEFAULT_IMAGE}
            alt={item.activity}
            loading="lazy"
        />

        <ImageListItemBar
            title={item.activity}
            subtitle={item.description}
            key={item.id}
            actionIcon={
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.activity}`}>
                    <Info />
                </IconButton>
            } />
    </ImageListItem>
</>)
}