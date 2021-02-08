import Header from '../header';
import Footer from '../footer';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../helpers/authHelper';

const Layout = ({ hideFooter, children }) => {
    const authData = useSelector(({ auth }) => auth);

    return (
      <div>
        <Header isAuthenticated={isAuthenticated(authData)} userData={authData.user} />
            {children}
        {!hideFooter && <Footer/>}
      </div>
    );
}

export default Layout;