import { Itinerary, ItineraryItem, ItineraryItemGroup } from "./itinerarySlice";

const itineraryGeneration = async function itineraryGeneration(lat: number,long: number, placeName: string): Promise<Itinerary> {
    return fetch('http://127.0.0.1:8000/itinerary-generation/', {
        method: "POST",
        mode: "cors",
        headers: {"accept": "application/vnd.api+json",
        "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(
            {"data": {"type": "itinerary_generation_views",
                      "attributes": {"latitude": lat, "longitude": long, "place_name": placeName}}}
           )
    }
    ).then((response) => {
        return response.json()
    }).then((json) => {
        const item_groups: ItineraryItemGroup[] = []
        json.data.attributes.itinerary_item_groups.map((group: any) => {
            const items: ItineraryItem[] = []
            group.itinerary_items.map((item: any) => {
                const new_item: ItineraryItem = {
                    id: item.id.toString(),
                    createdAt: item.created_at,
                    updatedAt: item.updated_at,
                    activity: item.activity_data.description,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    image: item.activity_data.image,
                    description: item.activity_data.full_description,
                    itemGroup: group.id
                }
                items.push(new_item)
            })
            
            const new_group: ItineraryItemGroup = {
                id: group.id.toString(),
                label: group.label,
                createdAt: group.created_at,
                updatedAt: group.updated_at,
                items: items
            }
            item_groups.push(new_group)
        })
        const sampleItinerary: Itinerary = {
            id: json.data.id.toString(),
            createdAt: json.data.attributes.created_at,
            updatedAt: json.data.attributes.updated_at,
            label: json.data.attributes.label,
            itemGroups: item_groups
        }

        return sampleItinerary
    });
  }

  const api = {
    itineraryGeneration: itineraryGeneration
  }
  export default api