const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request");
// const Themeparks = require("themeparks");

// const themparksAPI = new Themeparks.EntitiesApi();
// themparksAPI.getDestinations().then(function(data) {
//   console.log("API called successfully. Returned data: " + data);
// }, function(error) {
//   console.error(error);
// });

admin.initializeApp(functions.config().firebase);

// const usersRef = admin.firestore().collection("users");
// const parkRef = admin.firestore().collection("parkAttractions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.collectParkData = functions.pubsub
    .schedule("0 8,9,10,11,12,13,14,15,16,17,18,19 * * *")
    .timeZone("America/New_York").onRun(async () => {
      const timestamp = new Date();
      const fetchUrl = "https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live";
      const promiseArr = [];
      //   let timestamp = new Date();
      request(fetchUrl, function(error, response, data) {
        console.error("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode);
        // console.log("body:", data);
        data = JSON.parse(data);
        // console.log(data)
        const disneyWorldLiveData = data.liveData;
        const magicKingdomData = disneyWorldLiveData
            .filter((attraction) =>
              attraction.parkId === "75ea578a-adc8-4116-a54d-dccb60765ef9");
        const animalKingdomData = disneyWorldLiveData
            .filter((attraction) =>
              attraction.parkId === "1c84a229-8862-4648-9c71-378ddd2c7693");
        const hollywoodData = disneyWorldLiveData
            .filter((attraction) =>
              attraction.parkId === "288747d1-8b4f-4a64-867e-ea7c9b27bad8");
        const epcotData = disneyWorldLiveData
            .filter((attraction) =>
              attraction.parkId === "47f90d2c-e191-4239-a466-5892ef59a88b");
        // eslint-disable-next-line max-len
        const parkData = [magicKingdomData, animalKingdomData, hollywoodData, epcotData];
        for (let i=0; i<parkData.length; i++) {
          for (let j=0; j<parkData[i].length; j++) {
            const attraction = parkData[i][j];
            let attractionName = attraction.name;
            // eslint-disable-next-line max-len
            attractionName = attractionName.replace(/[.$#[\]]/g, "");

            // eslint-disable-next-line max-len
            const currentEntry = admin.database().ref(`/parks/${attraction.parkId}/attractions/${attraction.entityType}/${attractionName}`);
            currentEntry.on("value", (snapshot) => {
              const currentEntry = snapshot.val();
              let attractionUpdate = {};
              let hoursAssignment = timestamp.getHours() - 5;
              if (hoursAssignment <= 0) {
                hoursAssignment += 24;
              }
              // eslint-disable-next-line max-len
              const currentWaitTime = attraction.queue && attraction.queue["STANDBY"] && attraction.queue["STANDBY"].waitTime ? attraction.queue["STANDBY"].waitTime : 0;
              if (currentEntry == null) {
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
                attractionUpdate.waitTimeAvg[hoursAssignment] = currentWaitTime;
              } else {
                console.log(currentEntry);
                // eslint-disable-next-line max-len
                const waitTimeAvg = currentEntry.waitTimeAvg[hoursAssignment];
                // eslint-disable-next-line max-len
                if (waitTimeAvg.length >=14 || (waitTimeAvg.length == 1 && waitTimeAvg[0] == 0)) {
                  waitTimeAvg.shift();
                }
                waitTimeAvg.push(currentWaitTime);
                attractionUpdate = {
                  status: attraction.status,
                  lastUpdated: attraction.lastUpdated,
                  currentWaitTime: currentWaitTime,
                  waitTimeAvg: {
                    [hoursAssignment]: waitTimeAvg,
                  },
                };
              }
              console.log(attractionUpdate);
              // eslint-disable-next-line max-len
              admin.database().ref(`parks/${attraction.parkId}/attractions/${attraction.entityType}/${attractionName}`)
                  .update(attractionUpdate);
              // eslint-disable-next-line max-len
              if ((i === parkData.length - 1) && (j === parkData[i].length - 1)) {
                promiseArr.push("done!");
              }
            });
          }
        }
      });
      const finished = await Promise.all(promiseArr);
      return finished;
    });


// usersRef.where("email", "==", "alisonchilders314@gmail.com")
// .get()
// .then((snap) => {
//   snap.forEach((doc) => {
//     console.log(doc.data());
//   });
// });
