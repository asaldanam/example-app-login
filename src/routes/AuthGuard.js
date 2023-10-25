import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { Navigate } from "react-router-dom";

export const AuthGuard = (props) => {
    const [session] = useContext(SessionContext);

    // Esto sería un loading en el caso de que tarde demasiado el check-session
    // if (session === null) {
    //     return <p>Cargando...</p>
    // }

    if (session === false) {
        return <Navigate to="/login" replace />;
    };

    return props.children;
}