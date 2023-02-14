import React, { forwardRef } from 'react'
import { Button } from 'react-bootstrap' 
import { useAuth } from '../contexts/AuthContext';


export const PrintableSchedule = React.forwardRef((props,ref) => {
    const { userData, loading } = useAuth();
    const { trip } = userData;
    const getPageMargins = () => {
        return `@page { margin: 0.5in !important; }`;
      };
  return (
    <>
        <style>{getPageMargins()}</style>
        <div ref={ref} className="print-container">
            {loading ? 
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
                                return(
                                    <tr key={attraction.name}>
                                        <th scope="row"><input type="checkbox" /></th>
                                        <td>{attraction.startTime}</td>
                                        <td>{attraction.name}</td>
                                        <td>Attraction</td>
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
                                        <td>Attraction</td>
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
