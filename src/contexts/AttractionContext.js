import React, { useContext, useEffect, useState } from 'react';
// import { doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { ref, get, child, getDatabase } from 'firebase/database';
import { app } from '../firebase-config';

export const AttractionContext = React.createContext();

export function useAttractions() {
    return useContext(AttractionContext);
}


export function AttractionProvider({ children }) {
    const parksCollectionRef = child(ref(getDatabase(app)), '/parks/')
    const attractionCollectionRef = child(ref(getDatabase(app)), '/attractions/')
    const [parks, setParks] = useState([])
    const [attractions, setAttractions] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [shows, setShows] = useState([]);
    const [attractionsLoading, setAttractionsLoading] = useState(true);

    //On app load, gets the parks from the Firebase database. 
    //Then, gets attractions, wait times etc.
    //Sets attractionsLoading to false once finished.
    useEffect(() => {
        async function getParks(){
            setAttractionsLoading(true);
            let parkData;
            let parkIds;
            let attractionData;
            let attractionKeys;
            let showKeys;
            let restaurantKeys;
            await get(parksCollectionRef).then((snap) => {
            if(snap.exists()){
                parkData = snap.val();
                parkIds = Object.keys(parkData);
                setParks(parkIds.map((park) => {return {parkId: park, data: parkData[park]}})
                                .sort((a, b) => {
                                let nameA = a.data.name.toLowerCase();
                let nameB = b.data.name.toLowerCase();
                if(nameA > nameB){ return -1 }
                if(nameA < nameB){ return 1 }
                return 0;
                }));
            }
            else{
                console.log("No data")
            }
            }).catch((err) => {console.log(err)})

            await get(attractionCollectionRef).then((snap) => {
            if(snap.exists()){
                attractionData = snap.val();
                attractionKeys = Object.keys(attractionData.ATTRACTION)
                restaurantKeys = Object.keys(attractionData.RESTAURANT)
                showKeys = Object.keys(attractionData.SHOW)
                setAttractions(attractionKeys.map((ride) => {return {name: ride, type: "Attraction", data: attractionData.ATTRACTION[ride]}}));
                setRestaurants(restaurantKeys.map((restaurant) => {return {name: restaurant, type: "Restaurant", data: attractionData.RESTAURANT[restaurant]}}));
                setShows(showKeys.map((show) => {return {name: show, type: "Show", data: attractionData.SHOW[show]}}));
            }
            else{
                console.log("No data")
            }
        }).catch((err) => {console.log(err)});
        return;
      }
        getParks();
        setAttractionsLoading(false);
    }, [])

    const attractionInfo = {
        parks,
        attractions,
        restaurants, 
        shows,
        attractionsLoading
    }
    return (
        <AttractionContext.Provider value={attractionInfo}>
            {!attractionsLoading && children}
        </AttractionContext.Provider>
    )
}