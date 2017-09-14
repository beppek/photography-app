import firebase from 'firebase';

class DBService {

    constructor() {
        this.database = firebase.database();
    }

    saveToDB(data, doc) {
        return new Promise((resolve, reject) => {
            const dbRef = this.database.ref(doc + "/" + data.title);
            // const newRef = dbRef.child(doc).push();
            // newRef.set(data)
            dbRef.set(data)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });

        });
    }

    getFromDB(doc, callback) {
        const dbRef = this.database.ref(doc);
        dbRef.on("value", snapshot => {
            let data = [];
            snapshot.forEach((childSnap) => {
                let snap = {
                    key: childSnap.key,
                    value: childSnap.val()
                }
                data.push(snap);
            });
            return callback(data);
        });
    }

    getImagesFromCollection(collection, callback) {
        const ref = this.database.ref("/images");
        ref.orderByChild("/collection").equalTo(collection).on("child_added", snap => {
            callback(snap.val());
        });
    }

    deleteFromDB(data) {
        return new Promise((resolve, reject) => {
            const dbRef = this.database.ref(data);
            dbRef.remove()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}

export default DBService;