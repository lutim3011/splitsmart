import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_ADDING,
  SIGNUP_ADD_ERROR,
  SIGNUP_ADD_SUCCESS,
  SIGNUP_CLEAR,
} from "commons/const";

export const usersDatabase = "users";
export const handleNewUser = (data) => {
  let email;
  let password;
  let userUID;
  let newRequestRef;

  return (dispatch, getState, {getFirebase, getFirestore,fb}) => {
    
    const firebase = getFirebase();
    const firestore = getFirestore();


    // Remove This Line Before Deployment
    console.log({firebase})
    firebase.functions().useEmulator("localhost", 5001);

    const batch = firestore.batch();
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date());
    const createUser = firebase.functions().httpsCallable("createUser");

    password = data.password;
    email = data.email;
    dispatch({ type: SIGNUP_ADDING });
    createUser({ email, password })
      .then(({ data: user }) => {
        dispatch({ type: SIGNUP_ADD_SUCCESS });
        userUID = user.uid;
        newRequestRef = firestore.collection(usersDatabase).doc(user.uid);

        const toFirestore = {
          email,
          id: userUID,
          fname: data.fname,
          lname: data.lname,
          createdAt: currentTime,
          modifiedAt: currentTime,
        };
        batch.set(newRequestRef, toFirestore, { merge: true });

        batch
          .commit()
          .then(() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                dispatch({ type: LOGIN_SUCCESS });
                dispatch({ type: SIGNUP_CLEAR });
                firebase.auth().currentUser.sendEmailVerification();
              })
              .catch((err) => {
                dispatch({ type: LOGIN_ERROR, err });
              });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => dispatch({ type: SIGNUP_ADD_ERROR, error }));
  };
};
