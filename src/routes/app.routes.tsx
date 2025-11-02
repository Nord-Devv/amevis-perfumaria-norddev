import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/page/Homepage';
// import { AdminPage } from '../page/admin';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/admin" element={<AdminPage />} /> */}
        </Routes>
    );
}