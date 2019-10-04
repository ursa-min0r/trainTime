var config = {
  apiKey: "AIzaSyDIE9v8xit4FN0HEPip_E8CZqptyAcyECQ",
  authDomain: "traintimehw-a8131.firebaseapp.com",
  databaseURL: "https://traintimehw-a8131.firebaseio.com",
  projectId: "traintimehw-a8131",
  storageBucket: "",
  messagingSenderId: "543968700635",
  appId: "1:543968700635:web:f0de3c6868e8605f2504fe"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();


  var trainName = $("#train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainFreq = $("#freq-input").val().trim();


  var newTrain = {
    name: trainName,
    destination: trainDes,
    time: trainTime,
    freq: trainFreq,
  };

  database.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {

  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;

  var trainStation = trainTime % trainFreq;
  console.log(trainStation);


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDes),
    $("<td>").text(trainTime),
    $("<td>").text(trainFreq),
  );

  $("#train-table > tbody").append(newRow);
});





