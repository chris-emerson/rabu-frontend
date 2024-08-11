
import { renderWithProviders } from '../../testing/renderComponent';
import { itineraryItemFactory } from '../../testing/factories/itineraryFactories';
import { Activity, ActivityProps } from './Activity';

describe('Activity Component Test', () => {
    it('should render the description successfully', () => {
        const testItem = itineraryItemFactory({
            activity: 'test activity'              
            })
        
        const props: ActivityProps = {
            itineraryItem: testItem
        }
        const component = renderWithProviders(<Activity {...props} />, {})
        
        expect(component.getByText(testItem.activity)).toBeTruthy()
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
        const component = renderWithProviders(<Activity {...props} />, {})
        const image = component.getByAltText(testItem.activity!);

        expect(image).toHaveAttribute('src', testUrl )
    })
})
