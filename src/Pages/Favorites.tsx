import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase.config";
import { useAuth } from "../store/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NavMenu } from "../components/navigation/NavMenu";
import { SideList } from "../components/sideList/SideList";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  favoriteVideoDetails,
  removeFromFavorites,
  updateStateFavorites,
} from "../store/favorites/actions/favorite.actions";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStateFavorites());
  }, [isAuth]);
  const favorites = useAppSelector((state) => state.favorites.favorites);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <NavMenu />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <div>
          <SideList />
        </div>
        {favorites.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            {favorites.map((item: any) => {
              const removeFavorite = () => {
                dispatch(removeFromFavorites(item));
              };
              return (
                <div className="flex gap-3">
                  <Link to={`/watch/${item.id}`}>
                    <div className="relative">
                      {/* <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
                        {"data.videoDuration"}
                      </span> */}

                      <iframe
                        width="300"
                        height="200"
                        src={`https://www.youtube.com/embed/${item.id}`}
                        title="YouTube video player"
                        allowFullScreen></iframe>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <h3 className="max-w-2xl">
                        <a href="#" className="line-clamp-2">
                          {item.title}
                        </a>
                      </h3>

                      <div className="min-w-fit my-2"></div>
                      <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <button
                      onClick={removeFavorite}
                      title="Удалить"
                      className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                      Удалить
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          " Нет избранного"
        )}
      </div>
    </div>
    // <div>
    //   {" "}
    //   {favorites.map((item: any) => {
    //     return (
    //       <div>
    //         <div>{item.id}</div>
    //         <div>{item.title}</div>
    //         <div>{item.description}</div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

{
  /* <iframe
              width="200"
              height="200"
              src={`https://www.youtube.com/embed/${item.id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe> */
}
