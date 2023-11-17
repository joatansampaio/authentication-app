import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage.js';

export const Routes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact>
                    <UserInfoPage />
                </Route>
            </Routes>
        </Router>
    );
}