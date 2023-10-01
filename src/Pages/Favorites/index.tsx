import { useEffect } from "react";
import { useAuth } from "../../store/auth/useAuth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavMenu } from "../../components/navigation/NavMenu";
import { SideList } from "../../components/sideList/SideList";
import { updateStateFavorites } from "../../store/favorites/actions/favorite.actions";

import { Favorite } from "./components/Favorite";

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
            {favorites.map((item: any) => (
              <Favorite key={item.id} item={item} />
            ))}
          </div>
        ) : (
          "Нет избранного"
        )}
      </div>
    </div>
  );
};
