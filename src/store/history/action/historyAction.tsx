import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  arrayRemove,
  arrayUnion,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { database } from "../../../firebase.config";
import { AppDispatch, RootState } from "../..";

export const updateStateHistory = createAsyncThunk(
  "history/update",
  async (_, { getState }) => {
    const { auth }: any = getState();
    const docRef = doc(database, "history", auth.uid);
    const docSnap = await getDoc(docRef);
    const { history } = docSnap.data();
    console.log("history", history);
    return history;
  }
);

export const addToHistory = createAsyncThunk<
  void,
  string,
  { state: RootState; dispatch: AppDispatch }
>("history/add", async (data, { getState, dispatch }) => {
  const { auth }: any = getState();
  console.log("history", auth);
  const docRef = doc(database, "history", auth.uid);
  const docSnap = await getDoc(docRef);

  if (auth.isAuth) {
    if (docSnap.exists()) {
      try {
        console.log("write data", data);
        await updateDoc(docRef, {
          history: arrayUnion(data),
        });
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log("Document data:", docSnap.data().favorites);
    } else {
      await setDoc(doc(database, "history", auth.uid), {
        history: [data],
      });
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    await dispatch(updateStateHistory());
  }

  // проверить может лучше через диспатч обновлять стор
});

export const removeToHistory = createAsyncThunk<
  void,
  string,
  { state: RootState; dispatch: AppDispatch }
>("history/remove", async (data, { getState, dispatch }) => {
  const { auth }: any = getState();
  const docRef = doc(database, "history", auth.uid);
  const docSnap = await getDoc(docRef);

  if (auth.isAuth) {
    if (docSnap.exists()) {
      try {
        await updateDoc(docRef, {
          history: arrayRemove(data),
        });
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log("Document data:", docSnap.data().favorites);
    } else {
      await setDoc(doc(database, "history", auth.uid), {
        history: [data],
      });
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    await dispatch(updateStateHistory());
  }

  // проверить может лучше через диспатч обновлять стор
});
