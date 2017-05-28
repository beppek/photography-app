const firebase = require("firebase");
const firebaseConfig = require("./config");

class FirebaseService {

    init() {
        firebase.initializeApp(firebaseConfig);
        console.log("initialized firebase");
    }

}

export default FirebaseService;