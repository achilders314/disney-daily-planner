import React, { forwardRef } from 'react'
import { useAuth } from '../contexts/AuthContext';


export const PrintableSchedule = forwardRef((props,ref) => {
    const { userData, loading } = useAuth();
    const { trip } = userData;
    const getPageMargins = () => {
        return `@page { margin: 0.5in !important; }`;
      };
  return (
    <>
        <style>{getPageMargins()}</style>
        <div ref={ref} className="print-container">
            {loading || trip[0].parkDays === undefined ? 
            "" :
            trip[0].parkDays.map((day) => {
                return(
                    <>
                    <div className="page-break" />
                    <h3 className='text-center'>{day.tripDate} - {day.park}</h3>
                    <table className="table table-striped text-left">
                        <thead key={day.tripDate}>
                            <tr>
                                <th scope="col">✓</th>
                                <th scope="col">Time</th>
                                <th scope="col">Activity</th>
                                <th scope="col">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            day.attractions?.filter((attraction) => attraction.startTime !== "")
                                            .sort((a, b) => {
                                                if(a.startTime > b.startTime){return 1}
                                                else if(a.startTime < b.startTime){return -1}
                                                return 0
                                            })
                                            .map((attraction) => {
                                                let startHours = parseInt(attraction.startTime.slice(0, 2));
                                                let startMin = attraction.startTime.slice(3);
                                return(
                                    <tr key={attraction.name}>
                                        <th scope="row"><input type="checkbox" /></th>
                                        <td>{`${startHours === 12 ? 12 : startHours % 12}:${startMin}${startHours<12 ? "a" : "p"}`}</td>
                                        <td>{attraction.name}</td>
                                        <td>{attraction.type ? attraction.type : "Attraction"}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            day.attractions?.filter((attraction) => attraction.startTime === "")
                                            .map((attraction) => {
                                return(
                                    <tr key={attraction.name}>
                                        <th scope="row"><input type="checkbox" /></th>
                                        <td>{attraction.startTime}</td>
                                        <td>{attraction.name}</td>
                                        <td>{attraction.type ? attraction.type : "Attraction"}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </>
                )
            })}
        </div>
    </>
  )
}
)
