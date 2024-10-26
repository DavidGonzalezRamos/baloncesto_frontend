import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MenuFirst from "./views/MenuFirst";
import CreateTournamentView from "./views/tournaments/CreateTournamentView";
import MenuTournamentsView from "./views/tournaments/MenuTournamentsView";
import EditTournamentView from "./views/tournaments/EditTournamentView";
import TournamentTeamsView from "./views/tournaments/TournamentTeamsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import TeamPlayersView from "./views/players/TeamPlayersView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MenuFirst />} index />
          <Route path="/tournaments" element={<MenuTournamentsView />} />
          <Route
            path="/tournaments/:tournamentId"
            element={<TournamentTeamsView />}
          />
          <Route
            path="/teams/:tournamentId/:teamId/players"
            element={<TeamPlayersView />}
          />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>
        <Route path="/tournaments/create" element={<CreateTournamentView />} />
        <Route
          path="/tournaments/:tournamentId/edit"
          element={<EditTournamentView />}
        />
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
