import { NavMenu } from "../components/navigation/NavMenu";
import { SideList } from "../components/sideList/SideList";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAuth } from "../store/auth/useAuth";
import { useEffect } from "react";
import { updateStateHistory } from "../store/history/action/historyAction";

import { PageContent } from "../components/pageWrappContent/PageWrappContent";
import { HistoryContent } from "../components/historyContent/HistoryContent";
import { AuthHoc } from "../components/authHoc/AuthHoc";

const HistoryPage = () => {
  const { isAuth } = useAuth();
  const history = useAppSelector((state) => state.history.history);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStateHistory());
  }, [isAuth, dispatch]);

  return (
    <AuthHoc>
      <div className="max-h-screen overflow-hidden">
        <div style={{ height: "7.5vh" }}>
          <NavMenu />
        </div>
        <div className="flex" style={{ height: "92.5vh" }}>
          <div>
            <SideList />
          </div>
          <PageContent title={"History"}>
            {history.length ? (
              <ul className="w-full">
                {history.map((el) => (
                  <HistoryContent key={el} link={el} />
                ))}
              </ul>
            ) : (
              "Нет истории"
            )}
          </PageContent>
        </div>
      </div>
    </AuthHoc>
  );
};

export default HistoryPage;