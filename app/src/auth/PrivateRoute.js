import { useUser } from "./useUser";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, element: Element, ...rest }) => {
    const user = useUser();
  
    return (
      <Route
        {...rest}
        path={path}
        element={user ? <Element /> : <Navigate to="/login" replace />}
      />
    );
  };
  
  export default PrivateRoute;