import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store => store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.role !== 'recruiter') {
            navigate("/");
        }
    }, [user, navigate]); // Also, added 'user' and 'navigate' as dependencies

    return <>{children}</>;
};

// Prop validation
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // or PropTypes.element
};

export default ProtectedRoute;
