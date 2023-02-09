import React from 'react'
import { screen, render, debug } from '@testing-library/react';
import Attractions from './Attractions';
import { useAuth, AuthProvider, AuthContext } from '../contexts/AuthContext';
import { AttractionProvider, useAttractions, AttractionContext } from '../contexts/AttractionContext';
import { useNavigate } from 'react-router-dom';
import testData from '../../testData.json';

import firebase from 'firebase/auth';

jest.mock('../contexts/AttractionContext')



// jest.mock('firebase/auth', () => {
//   return {
//     // auth: jest.fn(() => ({
//     //     getAuth: jest.fn()
//     // })),
//     getAuth: jest.fn(),
//     GoogleAuthProvider: jest.fn(),

//   };
// });

jest.mock('firebase/auth');

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

describe('Attractions Basic Setup', () => {
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

    const value = {
        userData: userDataTrip
    }

    const attractionsValue = {
        attractions: [testData],
        attractionsLoading: false,
        parks: []
    }
        
    function Wrapper({children}){
        return(
            <AuthContext.Provider value={value}>
                    <AttractionContext.Provider value={attractionsValue}>
                        {children}
                    </AttractionContext.Provider>
            </AuthContext.Provider>
        )
    }
    // Still can't get this one to render correctly
    it('has the word trip', () =>{
           const { getByText } = render(
                // <AuthProvider onSuccess={() => jest.fn()}>
                //     <AttractionProvider>
                // <AuthContext.Provider value={value}>
                //     <AttractionContext.Provider value={attractionsValue}>
                //         <Attractions />
                //     </AttractionContext.Provider>
                // </AuthContext.Provider>

                //     </AttractionProvider>
                // </AuthProvider>
                    <Attractions />, Wrapper
                );
            // screen.debug();
            expect(getByText("trip")).toBeInTheDocument();
        }
    )
    

    // test.map((userTest) => {

    
    // })

})