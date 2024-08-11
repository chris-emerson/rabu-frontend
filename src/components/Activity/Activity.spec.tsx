
import { renderWithProviders } from '../../testing/renderComponent';
import { itineraryItemFactory } from '../../testing/factories/itineraryFactories';
import { Activity, ActivityProps } from './Activity';
import { screen } from '@testing-library/react'

describe('Activity Component Test', () => {
    it('should render the description successfully', () => {
        const testItem = itineraryItemFactory({
            activity: 'test activity'              
            })
        
        const props: ActivityProps = {
            itineraryItem: testItem
        }
        renderWithProviders(<Activity {...props} />, {})
        
        expect(screen.getByText(testItem.activity)).toBeTruthy()
    })

    it('should render the image successfully', () => {
        const testUrl = 'http://testing.com/testimage.png' 
        const testItem = itineraryItemFactory({
            image:  testUrl,
            activity: 'test activity'              
            })
        
        const props: ActivityProps = {
            itineraryItem: testItem
        }
        renderWithProviders(<Activity {...props} />, {})
        const image = screen.getByAltText(testItem.activity!);

        expect(image).toHaveAttribute('src', testUrl )
    })
})
