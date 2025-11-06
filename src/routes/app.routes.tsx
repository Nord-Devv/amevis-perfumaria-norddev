import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/page/Homepage';


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
}