 

 // Client ID and API key from the Developer Console
 var CLIENT_ID = '53484440533-6njh1rkihcknipgj25pjhdttl9r8m4h3.apps.googleusercontent.com';
 var API_KEY = 'AIzaSyCHRrtOuSozbDoNUtEX9vToYgWJilD0iTs'

 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 var SCOPES = "https://www.googleapis.com/auth/calendar";

 var authorizeButton = document.getElementById('authorize_button');
 var signoutButton = document.getElementById('signout_button');

 /**
  *  On load, called to load the auth2 library and API client library.
  */
 function handleClientLoad() {
     gapi.load('client:auth2', initClient);
 }

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
 function initClient() {
     gapi.client.init({
         apiKey: API_KEY,
         clientId: CLIENT_ID,
         discoveryDocs: DISCOVERY_DOCS,
         scope: SCOPES
     }).then(function () {
         // Listen for sign-in state changes.
         if(authorizeButton && signoutButton){
         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

         // Handle the initial sign-in state.
         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
         authorizeButton.onclick = handleAuthClick;
         signoutButton.onclick = handleSignoutClick;
         }
     }, function (error) {
     });
 }

 /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
 function updateSigninStatus(isSignedIn) {
     if(authorizeButton && signoutButton){
     if (isSignedIn) {
         authorizeButton.style.display = 'none';
         signoutButton.style.display = 'block';
         console.log("Successfully logged in")
         //listUpcomingEvents();
     } else {
         authorizeButton.style.display = 'block';
         signoutButton.style.display = 'none';
         console.log("Successfully logged out")
     }
    }
 }

 /**
  *  Sign in the user upon button click.
  */
 function handleAuthClick(event) {
     gapi.auth2.getAuthInstance().signIn();
 }

 /**
  *  Sign out the user upon button click.
  */
 function handleSignoutClick(event) {
     gapi.auth2.getAuthInstance().signOut();
 }




var globalId; 

 async function createEvent(data) {
    

     var event = {
         'summary': `${data.title}`,
         'description': `${data.seats} available seats | ${data.theater}`,
         'start': {
             'dateTime': `${data.date}T${data.start}:00`,
             'timeZone': 'Europe/Copenhagen'
         },
         'end': {
             'dateTime': `${data.date}T${data.end}:00`,
             'timeZone': 'Europe/Copenhagen'
         }
     };
 
     var request = gapi.client.calendar.events.insert({
         'calendarId': '8nna984a8ncp4s3e9uqa6m0ces@group.calendar.google.com',
         'resource': event,
     });

     var response;
     request.execute(function (event) {
        console.log("executing")
        globalId = event.id
     });
 }

 function deleteEvent(eventId) {

    var request = gapi.client.calendar.events.delete({
        'calendarId': '8nna984a8ncp4s3e9uqa6m0ces@group.calendar.google.com',
        'eventId': eventId
    });

    var response;
    request.execute(function (event) {
       console.log("executing")
    });
}

async function updateEvent(eventId, data) {
    

    var event = {
        'description': `${data.seats} available seats | ${data.theater}`
    };

    var request = gapi.client.calendar.events.patch({
        'calendarId': '8nna984a8ncp4s3e9uqa6m0ces@group.calendar.google.com',
        'resource': event,
        'eventId': eventId
    });

    var response;
    request.execute(function (event) {
       console.log("executing")
       globalId = event.id
    });
}



 /* DELETE
     var request = gapi.client.calendar.events.delete({
         'calendarId': 'aqlrsgiuk35ijgria71bcper48@group.calendar.google.com',
         'eventId': '7b49ufogc19ku2ds68ak47pqu0'
     });*/

     /* UPDATE!!!!!!!!!!
     var request = gapi.client.calendar.events.patch({
         'calendarId': 'aqlrsgiuk35ijgria71bcper48@group.calendar.google.com',
         'resource': event,
         'eventId': '7b49ufogc19ku2ds68ak47pqu0'
     });*/