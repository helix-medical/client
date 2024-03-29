import useAuth from '../../hooks/use-auth';
import { getRole } from '../../config/config';

const GrantAccess = ({ children, levels }: { children: React.ReactNode; levels: string[] }) => {
    const { auth } = useAuth();
    const level = getRole(auth.role);
    return level && levels.includes(level) ? <>{children}</> : null;
};

export default GrantAccess;
