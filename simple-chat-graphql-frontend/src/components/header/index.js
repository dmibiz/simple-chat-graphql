import { useState } from 'react';
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { Link, useLocation } from 'react-router-dom';
import { DELETE_AUTHENTICATION } from '../../redux/actions';
import { LOGIN_ROUTE_PATH, REGISTER_ROUTE_PATH } from '../../constants';
import Modal from '../modal';

const Header = ({ isAuthenticated, userData, dispatch }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        ModalManager.open(<SignoutConfirmationModal />);
    }

    const SignoutConfirmationModal = () => {
        return (
            <Modal
                title="Sign out"
                onConfirmButtonClick={() => { 
                    dispatch({ type: DELETE_AUTHENTICATION });
                    ModalManager.close();
                }}
            >
                <h5>Are you sure?</h5>
            </Modal>
        );
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Simple chat</span>
            <button
                className="navbar-toggler" 
                type="button" 
                aria-expanded={isCollapsed} 
                aria-label="Toggle navigation"
                onClick={() => setIsCollapsed(!isCollapsed)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isCollapsed ? 'collapse' : ''} navbar-collapse`}>
                {isAuthenticated && <span className="navbar-text">{userData.username}</span>}
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated ? 
                    <>
                        <li className="nav-item">
                            <Link to={LOGIN_ROUTE_PATH} className={`nav-link ${location.pathname === LOGIN_ROUTE_PATH ? 'active' : ''}`}>Sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={REGISTER_ROUTE_PATH} className={`nav-link ${location.pathname === REGISTER_ROUTE_PATH ? 'active' : ''}`}>Register</Link>
                        </li>
                    </> :
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => handleLogout(e)}>Sign out</a>
                    </li>}
                </ul>
            </div>
          </div>
        </nav>
    );
}

export default connect()(Header);