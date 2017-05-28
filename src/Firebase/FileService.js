import firebase from 'firebase';

class FileService {

    constructor() {
        this.storageRef = firebase.storage().ref();
    }

    upload(file, metadata, updateProgress) {
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(this.uploadWebFriendly(file, metadata, updateProgress));
            promises.push(this.uploadSmallSize(file, metadata, "thumbs"));
            promises.push(this.uploadSmallSize(file, metadata, "small"));
            Promise.all(promises).then(snapshots => {
                this.buildReturnData(snapshots)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        });
    }

    uploadWebFriendly(file, metadata, updateProgress) {
        return new Promise((resolve, reject) => {
            let maxSize = 1600;
            this.resizeImage(file, maxSize)
                .then((blob) => {
                    let imgRef = this.storageRef.child("images/" + file.name);
                    var upload = imgRef.put(blob, metadata);
                    upload.then((snapshot) => {
                        snapshot.name = "web friendly"
                        resolve(snapshot);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                    upload.on("state_changed", (snap) => {
                        const progress = Math.round(100 * snap.bytesTransferred / snap.totalBytes);
                        updateProgress(progress);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }


    uploadSmallSize(file, metadata, size) {
        return new Promise((resolve, reject) => {
            let maxSize;
            if (size === "thumbs") {
                maxSize = 100;
            } else {
                maxSize = 300;
            }
            this.resizeImage(file, maxSize)
                .then((blob) => {
                    let imgRef = this.storageRef.child(size + "/" + file.name);
                    var upload = imgRef.put(blob, metadata);
                    upload.then((snapshot) => {
                        snapshot.name = size;
                        resolve(snapshot);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        });

    }

    buildReturnData(snapshots) {
        let promises = [];
        let data = {
            downloadURL: null,
            thumbURL: null,
            filePath: null,
            thumbPath: null,
            fileName: null,
            smallURL: null,
            smallPath: null
        };

        snapshots.forEach((snapshot) => {
            promises.push(new Promise((resolve, reject) => {
                if (snapshot.name === "thumbs") {
                    data.thumbPath = snapshot.a.fullPath;
                    snapshot.c.getDownloadURL()
                        .then((url) => {
                            resolve(data.thumbURL = url);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else if (snapshot.name === "small") {
                    data.smallPath = snapshot.a.fullPath;
                    snapshot.c.getDownloadURL()
                        .then((url) => {
                            resolve(data.smallURL = url);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    data.fileName = snapshot.a.name;
                    data.filePath = snapshot.a.fullPath;
                    snapshot.c.getDownloadURL()
                        .then((url) => {
                            resolve(data.downloadURL = url);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            }));

        }, this);

        return Promise.all(promises).then(function() {
            return Promise.resolve(data);
        });
    }

    resizeImage(file, maxSize) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                const image = new Image();
                image.onload = (imageEvent) => {
                    const canvas = document.createElement("canvas");
                    const dimensions = this.setImageDimensions(image, maxSize);
                    canvas.height = dimensions.maxHeight;
                    canvas.width = dimensions.maxWidth;
                    const [width, height] = [dimensions.scale * image.width, dimensions.scale * image.height];
                    const vOffset = Math.min((dimensions.maxHeight - height) / 2, 0);
                    const hOffset = Math.min((dimensions.maxWidth - width) / 2, 0);
                    const context = canvas.getContext('2d');
                    if (!context) {
                        return reject('Could not get the context of the canvas element');
                    }
                    context.drawImage(image, hOffset, vOffset, width, height);
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, file.type);

                }
                image.src = readerEvent.target.result;
            }
            reader.readAsDataURL(file);
        });
    }

    setImageDimensions(image, maxSize) {
        var width;
        var height;
        var scale;
        if (image.width > image.height) {
            width = maxSize;
            height = maxSize / 1.5;
            const hScale = width / image.width;
            const vScale = height / image.height;
            scale = Math.max(hScale, vScale);
        } else if (image.width < image.height) {
            width = maxSize / 1.5;
            height = maxSize;
            const hScale = width / image.width;
            const vScale = height / image.height;
            scale = Math.max(vScale, hScale);
        } else {
            width = maxSize;
            height = maxSize;
            const hScale = width / image.width;
            const vScale = height / image.height;
            scale = Math.max(hScale, vScale);
        }
        return {scale: scale, maxHeight: height, maxWidth: width};
    }

    getFileURL(path) {
        return new Promise((resolve, reject) => {
            this.storageRef.child(path).getDownloadURL()
                .then(function(url) {
                    resolve(url);
                }).catch(function(error) {
                    reject(error);
                });
        });
    }

    deleteFile(fileName) {
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(new Promise((resolve, reject) => {
                let fileRef = this.storageRef.child("images/" + fileName);
                fileRef.delete().then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            }));
            promises.push(new Promise((resolve, reject) => {
                let fileRef = this.storageRef.child("thumbs/" + fileName);
                fileRef.delete().then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            }));
            promises.push(new Promise((resolve, reject) => {
                let fileRef = this.storageRef.child("small/" + fileName);
                fileRef.delete().then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            }));
            Promise.all(promises).then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

}

export default FileService;