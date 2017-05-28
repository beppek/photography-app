import firebase from 'firebase';

class AuthService {

    login(email, password) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function() {
                    resolve();
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut()
                .then(function() {
                    resolve("logged out");
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    checkAuth() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // let email = user.email;
                    // let name = email.split("@")[0];
                    // console.log(name);
                    resolve(user);
                } else {
                    // console.log("not logged in");
                    reject("error");
                }
            });
        });
    }

}

export default AuthService;