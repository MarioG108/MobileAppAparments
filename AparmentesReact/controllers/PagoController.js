import firebase from '@firebase/app';
const firestore = require('@firebase/firestore');
import Pago from '../models/Pago';
import Inquilino from '../models/Inquilino';
import Message from '../models/Message';


firebase.initializeApp({
    apiKey: 'AIzaSyDR-YHgpAHLAa-25uXYy3J72xaHf3eJfVo',
    authDomain: 'herodb-c7534.firebaseio.com',
    projectId: 'herodb-c7534'
})

//Pagos
let db = firebase.firestore();
//Select
export const getAllPagos = () => { //getAllHeroes
    return new Promise((resolve, rejects) => {
        let msg = new Message();
        msg.result = [];
        if (!db) {
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }

        db.collection('pagos') //heroes
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let pago = new Pago(doc.id, doc.data());
                    msg.result.push(pago);
                })
                msg.message = 'se han encontrado todos los pagos';
                resolve({ result: msg.result, message: msg.message })
            }).catch(error => {
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message })
            })
    })
}
//Create
export const createPago = (pago: Pago) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!pago) {
            msg.result = false;
            msg.message = 'Invalid pago input!';
            resolve({ result: msg.result, message: msg.message })
        }
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
        db.collection('pagos') //heroes
            .add(pago.getObjectInfo())
            .then((querySnapshot) => {
                msg.result = true;
                msg.message = 'Se ha registrado el pago correctamente';
                resolve({ result: msg.result, message: msg.message })
            }).catch(error => {
                msg.result = false;
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message })
            })
    })
}

const checkIfPagoExist = (pagoId: string) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
        db.collection('pagos') //pagos
            .doc(pagoId)
            .get()
            .then(querySnapshot => {
                msg.result = true;
                msg.message = `Se ha encontrado 1 pago con este id=${pagoId}`;
                resolve({ result: msg.result, message: msg.message })
            }).catch(error => {
                msg.result = false;
                msg.message = `No se ha encontrado pago con este id=${pagoId}`;
                resolve({ result: msg.result, message: msg.message })
            })
    })
}

//Delete
export const deletePago = (pagoId: string) => { //deletePago
    return new Promise((resolve, reject) => {
        let msg = new Message();
       
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
     checkIfPagoExist(pagoId).then(({ result, message }) => {
            //Not found pago
            if (!result) {
                msg.result = false;
                msg.message = message;
                resolve({ result: msg.result, message: msg.message })
            }

            //override data with existing doc
            db.collection('pagos') //heroes
                .doc(pagoId)
                .delete()
                .then(querySnapshot => {
                    msg.result = true;
                    msg.message = 'Eliminacion de pago conseguida!';
                    resolve({ result: msg.result, message: msg.message })
                }).catch(error => {
                    msg.result = false;
                    msg.message = `${error.message}`;
                    resolve({ result: msg.result, message: msg.message })
                });
        })
    })
}
//Update
export const updatePago = (pago: Pago) => { 
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!pago) {
            msg.result = false;
            msg.message = 'Invalid pago input!';
            resolve({ result: msg.result, message: msg.message })
        }
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
     checkIfPagoExist(pago.pagoId).then(({ result, message }) => {
            //Not found pago
            if (!result) {
                msg.result = false;
                msg.message = message;
                resolve({ result: msg.result, message: msg.message })
            }

            //override data with existing doc
            db.collection('pagos') //pagos
                .doc(pago.pagoId)
                .set(pago.getObjectInfo())
                .then(querySnapshot => {
                    msg.result = true;
                    msg.message = 'El registro del pago ha sido actualizado!';
                    resolve({ result: msg.result, message: msg.message })
                }).catch(error => {
                    msg.result = false;
                    msg.message = `${error.message}`;
                    resolve({ result: msg.result, message: msg.message })
                });
        })
    })
}

//Inquilino

//Select
export const getAllInquilinos = () => { //getAllHeroes
    return new Promise((resolve, rejects) => {
        let msg = new Message();
        msg.result = [];
        if (!db) {
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }

        db.collection('inquilinos') //heroes
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let inquilino = new Inquilino(doc.id, doc.data());
                    msg.result.push(inquilino);
                })
                msg.message = 'se han encontrado todos los inquilinos';
                resolve({ result: msg.result, message: msg.message })
            }).catch(error => {
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message })
            })
    })
}
//Create
export const createInquilino = (inquilino: Inquilino) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!inquilino) {
            msg.result = false;
            msg.message = 'Invalid inquilino input!';
            resolve({ result: msg.result, message: msg.message })
        }
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
        db.collection('inquilinos') //heroes
            .add(inquilino.getObjectInfo1())
            .then((querySnapshot) => {
                msg.result = true;
                msg.message = 'Se ha registrado el inquilino correctamente';
                resolve({ result: msg.result, message: msg.message })
            }).catch(error => {
                msg.result = false;
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message })
            })
    })
}

const checkIfInquilinoExist = (inquilinoId: string) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
        db.collection('inquilinos') //pagos
            .doc(inquilinoId)
            .get()
            .then(querySnapshot => {
                msg.result = true;
                msg.message = `Se ha encontrado 1 inquilino con este id=${inquilinoId}`;
                resolve({ result: msg.result, message: msg.message })
            }).catch(error => {
                msg.result = false;
                msg.message = `No se ha encontrado inquilino con este id=${inquilinoId}`;
                resolve({ result: msg.result, message: msg.message })
            })
    })
}

//Delete
export const deleteInquilino = (inquilinoId: string) => { //deletePago
    return new Promise((resolve, reject) => {
        let msg = new Message();
       
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
     checkIfInquilinoExist(inquilinoId).then(({ result, message }) => {
            //Not found pago
            if (!result) {
                msg.result = false;
                msg.message = message;
                resolve({ result: msg.result, message: msg.message })
            }

            //override data with existing doc
            db.collection('inquilinos') //heroes
                .doc(inquilinoId)
                .delete()
                .then(querySnapshot => {
                    msg.result = true;
                    msg.message = 'Eliminacion de inquilino conseguida!';
                    resolve({ result: msg.result, message: msg.message })
                }).catch(error => {
                    msg.result = false;
                    msg.message = `${error.message}`;
                    resolve({ result: msg.result, message: msg.message })
                });
        })
    })
}
//Update
export const updateInquilino = (inquilino: Inquilino) => { 
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!inquilino) {
            msg.result = false;
            msg.message = 'Invalid inquilino input!';
            resolve({ result: msg.result, message: msg.message })
        }
        if (!db) {
            msg.result = false;
            msg.message = 'No se ha establecido una conexion segura con la DB';
            resolve({ result: msg.result, message: msg.message })
        }
     checkIfInquilinoExist(inquilino.inquilinoId).then(({ result, message }) => {
            //Not found pago
            if (!result) {
                msg.result = false;
                msg.message = message;
                resolve({ result: msg.result, message: msg.message })
            }

            //override data with existing doc
            db.collection('inquilinos') //pagos
                .doc(inquilino.inquilinoId)
                .set(inquilino.getObjectInfo1())
                .then(querySnapshot => {
                    msg.result = true;
                    msg.message = 'El registro del inquilino ha sido actualizado!';
                    resolve({ result: msg.result, message: msg.message })
                }).catch(error => {
                    msg.result = false;
                    msg.message = `${error.message}`;
                    resolve({ result: msg.result, message: msg.message })
                });
        })
    })
}
