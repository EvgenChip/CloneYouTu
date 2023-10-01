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
import { Favorites } from "../favoritesSlice";

export type favoriteVideoDetails = {
  id?: string | number;
  title?: string;
  description?: string;
};

export const updateStateFavorites = createAsyncThunk<
  Favorites[],
  undefined,
  { state: RootState; dispatch: AppDispatch }
>("favorites/update", async (_: undefined, { getState }) => {
  const { auth } = getState();
  const docRef = doc(database, "users", auth.uid);
  const docSnap = await getDoc(docRef);
  const { favorites } = docSnap.data() as { favorites: Favorites[] };
  console.log("favorites", favorites);
  return favorites;
});

export const addToFavorites = createAsyncThunk<
  void,
  favoriteVideoDetails,
  { state: RootState; dispatch: AppDispatch }
>("favorites/add", async (data, { getState, dispatch }) => {
  const { auth } = getState();
  console.log("favor", auth);
  const docRef = doc(database, "users", auth.uid);
  const docSnap = await getDoc(docRef);

  if (auth.isAuth) {
    if (docSnap.exists()) {
      try {
        await updateDoc(docRef, {
          favorites: arrayUnion(data),
        });
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log("Document data:", docSnap.data().favorites);
    } else {
      await setDoc(doc(database, "users", auth.uid), {
        favorites: [data],
      });
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    await dispatch(updateStateFavorites());
  }

  // проверить может лучше через диспатч обновлять стор
});

export const removeFromFavorites = createAsyncThunk<
  void,
  favoriteVideoDetails,
  { state: RootState; dispatch: AppDispatch }
>("favorites/remove", async (data, { getState, dispatch }) => {
  const { auth } = getState();
  if (auth.uid) {
    const docRef = doc(database, "users", auth.uid);

    await updateDoc(docRef, {
      favorites: arrayRemove(data),
    });
    console.log("я здесь");
    await dispatch(updateStateFavorites());
  }
});

export const removeAllFromFavorites = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch }
>("favorites/removeAll", async (_, { getState, dispatch }) => {
  const { auth } = getState();
  if (auth.uid) {
    const docRef = doc(database, "users", auth.uid);
    await updateDoc(docRef, {
      favorites: [],
    });
    await dispatch(updateStateFavorites());
  }
});

export const toggleFavorites = createAsyncThunk<
  void,
  favoriteVideoDetails,
  { state: RootState; dispatch: AppDispatch }
>("favorites/toggleFavorites", async (data, { getState, dispatch }) => {
  const { favorites, auth } = getState();
  const favoritesArr = favorites.favorites.map((el) => el.id);
  console.log("arrr", favoritesArr.includes(data.id));
  if (favoritesArr.includes(data.id) && auth.uid) {
    console.log("YES", favorites.favorites, "dataid", data.id);
    await dispatch(removeFromFavorites(data));
  }
  if (!favorites.favorites.map((el) => el.id).includes(data.id) && auth.uid) {
    console.log("NO");
    await dispatch(addToFavorites(data));
  }
});
