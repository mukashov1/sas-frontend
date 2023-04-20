import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../routing/index";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { store } = useContext(UserContext);

  const isAuth = store.isAuth;
  const madeCheckRequest = store.checked;
  if (store.isLoading) {
  }
  if ((!isAuth && madeCheckRequest) || !localStorage.getItem("token")) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default observer(RequireAuth);
