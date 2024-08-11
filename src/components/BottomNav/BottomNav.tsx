import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {Restore, Favorite, LocationOn} from '@mui/icons-material'

export const BottomNavigationBar = () => {
    return (<BottomNavigation
        showLabels
        value={0}
        data-testid="BottomNav"
        onChange={(event, newValue) => {}}
      >
        <BottomNavigationAction 
        style={{ }}
        label="Recents"
        key={0}
         icon={<Restore />} />
        <BottomNavigationAction 
        key={1}
        label="Favorites" icon={<Favorite />} />
        <BottomNavigationAction 
        key={2}
        label="Nearby" icon={<LocationOn />} />
      </BottomNavigation>)
}
