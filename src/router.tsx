import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MenuFirst from "./views/MenuFirst";
import CreateTournamentView from "./views/tournaments/CreateTournamentView";
import MenuTournamentsView from "./views/tournaments/MenuTournamentsView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MenuFirst />} index />
          <Route path="/tournaments" element={<MenuTournamentsView />} />
        </Route>
        <Route path="/tournaments/new" element={<CreateTournamentView />} />
      </Routes>
    </BrowserRouter>
  );
}
