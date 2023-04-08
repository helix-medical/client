import { Routes, Route } from 'react-router-dom';
// System
import Login from './login';
import Layout from './layout';
import RequireAuth from '../../components/auth/requireAuth';
import PersistentLogin from '../../components/auth/persistentLogin';
// Pages
import Patients from '../patients/patients';
import Home from '../home/home';
import Calendar from '../../components/calendar';
import EditAppointment from '../appointment/edit';
import Appointments from '../appointments/appointments';
import ViewAppointment from '../appointment/view';
import Admin from '../admin/admin';
import Accounting from '../accounting/accounting';
// Errors
import NotFound from './errors/404';
import Unauthorized from './errors/unauthorized';

const ROLES = {
    ADMIN: 2003,
    PRACTITIONER: 1998,
    SECRETARY: 1515,
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route path="login" element={<Login />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                {/* Add pages for errors */}

                {/* Protected */}
                <Route element={<PersistentLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER, ROLES.SECRETARY]} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="patients" element={<Patients add={false} />} />
                        <Route path="patients/add" element={<Patients add={true} />} />
                        <Route path="accounting" element={<Accounting />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER]} />}>
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="appointments">
                            <Route index element={<Appointments add={false} />} />
                            <Route path="add" element={<Appointments add={true} />} />
                            <Route path=":appointmentID/edit" element={<EditAppointment />} />
                            <Route path=":appointmentID/view" element={<ViewAppointment />} />
                            <Route path="*" element={<NotFound />} /> {/* ?? */}
                        </Route>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
