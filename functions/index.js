const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request");


admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


/* Cloud function that collects park data every hour to gather
wait times that will display on the "Attractions" page*/

exports.collectParkData = functions.pubsub
    .schedule("0 8,9,10,11,12,13,14,15,16,17,18,19 * * *")
    .timeZone("America/New_York").onRun(async () => {
      const timestamp = new Date();
      const fetchUrl = "https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live";

      request(fetchUrl, function(error, response, data) {
        console.error("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode);
        data = JSON.parse(data);

        let disneyWorldLiveData = data.liveData;
        const disneyWorldParks = [
          "75ea578a-adc8-4116-a54d-dccb60765ef9",
          "1c84a229-8862-4648-9c71-378ddd2c7693",
          "288747d1-8b4f-4a64-867e-ea7c9b27bad8",
          "47f90d2c-e191-4239-a466-5892ef59a88b"];
          // eslint-disable-next-line max-len
        disneyWorldLiveData = disneyWorldLiveData.filter((attraction) => (disneyWorldParks.indexOf(attraction.parkId) !== -1));
        for (let j=0; j<disneyWorldLiveData.length; j++) {
          const attraction = disneyWorldLiveData[j];
          let attractionName = attraction.name;
          // eslint-disable-next-line max-len
          attractionName = attractionName.replace(/[.$#[\]]/g, "");

          // eslint-disable-next-line max-len
          const currentEntry = admin.database().ref(`/attractions/${attraction.entityType}/${attractionName}`);
          // eslint-disable-next-line max-len
          currentEntry.get().then((snapshot) => {
            const currentEntryData = snapshot.exists() ? snapshot.val() : false;
            let attractionUpdate = {};
            let hoursAssignment = timestamp.getHours() - 5;
            if (hoursAssignment <= 0) {
              hoursAssignment += 24;
            }
            console.log(currentEntryData);
            // eslint-disable-next-line max-len
            const currentWaitTime = attraction.queue && attraction.queue["STANDBY"] && attraction.queue["STANDBY"].waitTime ?
                                    attraction.queue["STANDBY"].waitTime : 0;
            // eslint-disable-next-line max-len
            if (!currentEntryData) {
              attractionUpdate = {
                name: attractionName,
                parkId: attraction.parkId,
                status: attraction.status,
                lastUpdated: attraction.lastUpdated,
                // eslint-disable-next-line max-len
                currentWaitTime: currentWaitTime,
                waitTimeAvg: {
                  8: [0],
                  9: [0],
                  10: [0],
                  11: [0],
                  12: [0],
                  13: [0],
                  14: [0],
                  15: [0],
                  16: [0],
                  17: [0],
                  18: [0],
                  19: [0],
                },
              };
              // eslint-disable-next-line max-len
              attractionUpdate.waitTimeAvg[hoursAssignment] = [currentWaitTime];
            } else {
              console.log(currentEntryData);

              console.log(attractionName);
              // eslint-disable-next-line max-len
              const waitTimeAvg = currentEntryData.waitTimeAvg[hoursAssignment];
              console.log(waitTimeAvg);
              // eslint-disable-next-line max-len
              if (waitTimeAvg.length >=14 || (waitTimeAvg.length == 1 && waitTimeAvg[0] == 0)) {
                waitTimeAvg.shift();
              }
              console.log(waitTimeAvg);
              waitTimeAvg.push(currentWaitTime);
              console.log(waitTimeAvg);
              attractionUpdate = {
                status: attraction.status,
                lastUpdated: attraction.lastUpdated,
                currentWaitTime: currentWaitTime,
              };
              // eslint-disable-next-line max-len
              admin.database().ref(`attractions/${attraction.entityType}/${attractionName}/waitTimeAvg`)
                  .update({[hoursAssignment]: waitTimeAvg});
            }
            console.log(attractionUpdate);
            // eslint-disable-next-line max-len
            admin.database().ref(`attractions/${attraction.entityType}/${attractionName}`)
                .update(attractionUpdate);
          });
          // eslint-disable-next-line max-len
          if ((j === disneyWorldLiveData.length - 1)) {
            return "Done!";
          }
        }
      });
    //   const finished = await Promise.all(promiseArr);
    //   return finished;
    });
