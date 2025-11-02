import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes/app.routes";
export function Routes() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}