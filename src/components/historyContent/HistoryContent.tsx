import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { useState } from "react";
import { changeSearchTerm } from "../../store";
import { removeToHistory } from "../../store/history/action/historyAction";
import { ButtonRemove } from "../button/ButtonRemove";

type Props = {
  link: string;
};

export const HistoryContent = ({ link }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleRemoveHistory = async () => {
    setIsLoading(true);
    await dispatch(removeToHistory(link));
    setIsLoading(false);
  };
  return (
    <li className="flex justify-between mx-auto  bg-zinc-200 rounded-lg p-2.5 w-[500px] mb-8">
      <div className="flex items">
        <Link onClick={(e) => dispatch(changeSearchTerm(link))} to={"/search"}>
          <div className="relative">{link}</div>
        </Link>
      </div>
      <div className="flex items-center pl-4 border-zinc-900/20 border-l">
        <ButtonRemove
          onClick={handleRemoveHistory}
          type={"button"}
          widthParms={"w-[90px]"}
          name={"Remove"}
          bgColor="bg-red-600"
          withBorder={true}></ButtonRemove>
      </div>
    </li>
  );
};
