import React, { useContext, useEffect, useState } from 'react';
// import { doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { ref, get, child, getDatabase } from 'firebase/database';
import { app } from '../firebase-config';

const AttractionContext = React.createContext();

export function useAttractions() {
    return useContext(AttractionContext);
}


export function AttractionProvider({ children }) {
    const parksCollectionRef = child(ref(getDatabase(app)), '/parks/')
    const attractionCollectionRef = child(ref(getDatabase(app)), '/attractions/')
    const [parks, setParks] = useState([])
    const [attractions, setAttractions] = useState([]);
    const [attractionsLoading, setAttractionsLoading] = useState(true);

    useEffect(() => {
        async function getParks(){
            setAttractionsLoading(true);
            let parkData;
            let parkIds;
            let attractionData;
            let attractionKeys;
            // let showKeys;
            // let restaurantKeys;
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
                // restaurantKeys = Object.keys(attractionData.RESTAURANT)
                // showKeys = Object.keys(attractionData.SHOW)
                setAttractions(attractionKeys.map((ride) => {return {name: ride, data: attractionData.ATTRACTION[ride]}}));
                // setRestaurants(restaurantKeys.map((restaurant) => {return {name: restaurant, data: attractionData.RESTAURANT[restaurant]}}));
                // setShows(showKeys.map((show) => {return {name: show, data: attractionData.SHOW[show]}}));
            }
            else{
                console.log("No data")
            }
        }).catch((err) => {console.log(err)});
        return;
        // setAttractions(attractionData.docs.map((doc) =>({...doc.data()})))
      }
        getParks();
        setAttractionsLoading(false);
    }, [])

    const attractionInfo = {
        parks,
        attractions,
        attractionsLoading
    }
    return (
        <AttractionContext.Provider value={attractionInfo}>
            {!attractionsLoading && children}
        </AttractionContext.Provider>
    )
}