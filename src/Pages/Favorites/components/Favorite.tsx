import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { removeFromFavorites } from "../../../store/favorites/actions/favorite.actions";

export const Favorite: React.FC<{ item: any }> = ({ item }) => {
  const dispatch = useAppDispatch();

  const removeFavorite = () => {
    dispatch(removeFromFavorites(item));
  };

  return (
    <div className="flex gap-3">
      <Link to={`/watch/${item.id}`}>
        <div className="relative">
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
};
