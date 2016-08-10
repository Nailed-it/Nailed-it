import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyArc1jthjsWkx91fsY2QTzXVhZm378B9AY',
  authDomain: 'nailed-it-c1d80.firebaseapp.com',
  databaseURL: 'https://nailed-it-c1d80.firebaseio.com',
  storageBucket: 'nailed-it-c1d80.appspot.com',
};
try {
  Firebase.initializeApp(config);
} catch (e) {
  console.log('[databaseAPI.js] Caught error: Firebase already initialized.');
}
const database = Firebase.database();

// Firebase.storage is undefined when this file is run by tests, so
// we only call Firebase.storage as a function if it's truthy.
var storageRef = Firebase.storage && Firebase.storage().ref();
var metadata = {
  contentType: 'image/jpeg',
};

export function uploadPhoto(file) {
  // Per the comment on the assignment of storageRef, if this code is run by our tests,
  // then Firebase.storage is undefined
  if(storageRef) {
    return storageRef.child('images/' + file[0].name).put(file[0], metadata);
  }
}

export function updatePhotoURL(url, selectedRoom) {
  database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/rooms/' + selectedRoom + '/photoURL').set(url);
}

export function addRoom(room, roomName) {
  database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/rooms/' + roomName).set({
    furniture: 'No furniture',
  });
}

export function getRooms() {
  return database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/rooms').once('value')
    .then((snapshot) => {
      let result = snapshot.val();
      for (var room in result) {
        if(result.hasOwnProperty(room)) {
          if (result[room].colors) {
            result[room].colors = result[room].colors.split(";")
          }
        }
      }
      return {val:() => result};
    });
}

export function getProjects() {
  return database.ref().once('value');
}

// export function getFurniture(rooms) {
//   for (var room in rooms) {
//     database.ref('rooms/' + room + '/furniture').once('value', function(snapshot) {
//       return snapshot;
//     })
//   }
// };

export function getBudget() {
  return database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/budget').once('value');

  // .then((snapshot) => {
  //   cb(snapshot.val());
  // });
}

export function updateBudget(budget) {
  database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/budget').set(budget);
}

export function updateFurniture(roomName, furnitureName, furnitureProps) {
  //take the roomName and furnitureName from the submit and put the obj at the
  // location in the database
  database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/rooms/' + roomName + '/furniture/' + furnitureName).set(furnitureProps);
};

export function updateRoom(oldRoomName, newRoomName, newRoom) {
  
  database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/rooms/' + newRoomName).set(newRoom);
  database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/rooms/' + oldRoomName).remove();
}

export function removeRoom(room) {
  database.ref('iGEKbLdXzHORTksYSB21JSd8cqA3/rooms/' + room).remove();
};

// export function removeFurniture(room, furniture) {
//   for (var room in rooms) {
//     for (var pieceOfFurniture in furniture) {
//       database.ref('rooms/' + room + '/furniture/' + pieceOfFurniture).remove();
//     }
//   }
// };
