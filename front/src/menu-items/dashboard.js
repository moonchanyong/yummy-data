// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'analysis',
  title: 'Analysis',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'General Analysis',
      type: 'item',
      url: '/analysis/general',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
