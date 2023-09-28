import { createAsyncThunk } from "@reduxjs/toolkit";
// import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import {
  arrayRemove,
  arrayUnion,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { database } from "../../../firebase.config";
import { useAuth } from "../../auth/useAuth";
import { AuthState } from "../../auth/authSlice";
import { AppDispatch, RootState } from "../..";
import { Favorites, FavoritesState } from "../favoritesSlice";

export type favoriteVideoDetails = {
  id?: string | number;
  title?: string;
  description?: string;
};

export const updateStateFavorites = createAsyncThunk(
  "favorites/update",
  async (_, { getState }) => {
    const { auth }: any = getState();
    const docRef = doc(database, "users", auth.uid);
    const docSnap = await getDoc(docRef);
    const { favorites } = docSnap.data();
    console.log("favorites", favorites);
    return favorites;
  }
);

export const addToFavorites = createAsyncThunk<
  any,
  favoriteVideoDetails,
  { state: RootState; dispatch: AppDispatch }
>("favorites/add", async (data, { getState, dispatch }) => {
  const { auth }: any = getState();
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
  const { auth }: any = getState();
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
