import React from 'react'
import { screen, render } from '@testing-library/react';
import Attractions from './Attractions';
import { useAuth, AuthProvider } from '../contexts/AuthContext';
import { AttractionProvider, useAttractions } from '../contexts/AttractionContext';
import { useNavigate } from 'react-router-dom';

let userDataNoTrip = {
    firstName: "Alison",
    email: "example@gmail.com",
    lastActivity: "2023-01-13T15:36:04.589Z",
    trip: [
            {
                tripStart: "",
                tripEnd: "",
            }
    ]
};
let userDataTrip = {
    firstName: "Alison",
    email: "example@gmail.com",
    lastActivity: "2023-01-13T15:36:04.589Z",
    trip: [
            {
                tripStart: "Tue May 02 2023",
                tripEnd: "Fri May 05 2023",
                parkDays: [
                    {
                        park: "Magic Kingdom Park",
                        tripDate: "Tue May 02 2023",
                        attractions: [{"endTime": "", "name": "Cinderella Castle", "startTime": ""}]
                    }
                ]
            }
    ]
};;
let noUserData = {};

describe.skip('Attractions Basic Setup', () => {
    // const { loading } = React.useContext(useAuth);
    // const {attractionsLoading} = React.useContext(useAttractions);

    //Truth table of user test cases I want to test.
    const test = [
        // userData             loading        attractionsLoading       expected      
        [userDataNoTrip,        true,          true,                    "Want to start adding attractions to your itinerary?"],
        [userDataNoTrip,        true,          false,                   "Want to start adding attractions to your itinerary?"],
        [userDataNoTrip,        false,         true,                    "Want to start adding attractions to your itinerary?"],
        [userDataNoTrip,        false,         false,                   "Want to start adding attractions to your itinerary?"],
        [userDataTrip,          true,          true,                    "Want to start adding attractions to your itinerary?"],
        [userDataTrip,          true,          false,                   "Want to start adding attractions to your itinerary?"],
        [userDataTrip,          false,         true,                    "Want to start adding attractions to your itinerary?"],
        [userDataTrip,          false,         false,                   "Trip Day:"],
        [noUserData,            true,          true,                    "Want to start adding attractions to your itinerary?"],
        [noUserData,            true,          false,                   "Want to start adding attractions to your itinerary?"],
        [noUserData,            false,         true,                    "Want to start adding attractions to your itinerary?"],
        [noUserData,            false,         false,                   "Want to start adding attractions to your itinerary?"],

    ];

    // Still can't get this one to render correctly
    it('has the word trip', () =>{
            render(
                <AuthProvider>
                    <AttractionProvider>
                        <Attractions />
                    </AttractionProvider>
                </AuthProvider>
                );
            expect(screen.getByText("trip", {exact: false})).toBeInTheDocument();
        }
    )
    

    // test.map((userTest) => {

    
    // })

})