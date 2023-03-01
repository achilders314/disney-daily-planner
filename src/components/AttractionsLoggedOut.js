import React, { useRef, useState } from 'react';
import SingleAttraction from './SingleAttraction';
import { Form } from 'react-bootstrap';
import { useAttractions } from '../contexts/AttractionContext';

export default function AttractionsLoggedOut() {
    const {parks, attractions, restaurants, shows, attractionsLoading} = useAttractions();
    const allAttractions = attractions.concat(restaurants, shows);
    const [selectedPark, setSelectedPark] = useState("Magic Kingdom Park");
    const [selectedType, setSelectedType] = useState("Attraction");
    const typeSelector = useRef();
    const parkSelector = useRef();

    function changePark(){
        setSelectedPark(parkSelector.current.value);
        setSelectedType("Attraction");
        typeSelector.current.value = "Attraction"
    }

    function changeType(){
        setSelectedType(typeSelector.current.value);
    }

    // useEffect(() => {
    //     setSelectedPark("Magic Kingdom Park");
    // }, [])
    
    // Returns attractions stats sorted by park, but no checkboxes. Adds a message to users to go to their 
    // profile page to set up a trip.
    return(
        <>
        <p className="text-center text-white">Want to start adding attractions to your itinerary? Go to your profile and set up your trip dates and parks!</p>
        <div id="attractions-park-filter">
                <Form>
                    <Form.Group className="mx-1">
                        <Form.Label className="text-white">Park:</Form.Label>
                        <Form.Select id="park-selector" as="select" type="select" 
                                    defaultValue={"Magic Kingdom"} 
                                    onChange={changePark}
                                    ref={parkSelector}
                                    required>
                                <option value="Magic Kingdom Park">Magic Kingdom Park</option>
                                <option value="EPCOT">EPCOT</option>
                                <option value="Disney's Hollywood Studios">Disney's Hollywood Studios</option>
                                <option value="Disney's Animal Kingdom Theme Park">Disney's Animal Kingdom Theme Park</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mx-1">
                        <Form.Label className="text-white">Type:</Form.Label>
                        <Form.Select id="type-selector" as="select" type="select" 
                                    defaultValue={"Attraction"} 
                                    onChange={changeType}
                                    ref={typeSelector}
                                    required>
                                <option value="Attraction">Attractions</option>
                                <option value="Restaurant">Restaurants</option>
                                <option value="Show">Shows</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </div>
        {attractionsLoading ? "" :
        parks.filter((park) => park.data.name === selectedPark)
             .map((park) => {
            return(
            <div key={park.parkId} className="park">
                <h1 key={`${park.data.name}`}>Park: {park.data.name}</h1>
                <div className="attractions-wrap">
                    <div className="attractions" style={{borderRadius: "20px"}}>
                        <h2>{selectedType}s</h2>
                        {allAttractions.filter((attraction) => {
                            return attraction.data.parkId === park.parkId && attraction.type === selectedType
                        })
                                       .map((attraction) => {
                                            return(
                                                <SingleAttraction loggedIn={false} key={attraction.name} attractionName={attraction.name} isChecked={false} />
                                            )
                                       })
                        }
                    </div>
                </div>
            </div>
            )
        })}
      </>
    )

}
