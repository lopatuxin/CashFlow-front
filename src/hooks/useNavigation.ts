import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goToDashboard = () => navigate('/dashboard');
    const goToAnalytics = () => navigate('/analytics');
    const goToReports = () => navigate('/reports');
    const goToSettings = () => navigate('/settings');

    const isActive = (path: string) => location.pathname === path;

    return {
        goToDashboard,
        goToAnalytics,
        goToReports,
        goToSettings,
        isActive,
        currentPath: location.pathname,
    };
};