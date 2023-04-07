import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import {
    IconHome,
    IconCalendar,
    IconSearch,
    IconUsers,
    IconCalendarCheck,
    IconCalendarPlus,
    IconUsersPlus,
} from '@tabler/icons-react';
import { useState } from 'react';

const handleNavigate = (path: string) => {
    window.location.href = path;
};

const Spotlight = ({ children }: { children: JSX.Element }) => {
    const [query, setQuery] = useState<string>('');
    const actions: SpotlightAction[] =
        query === 'patients'
            ? [
                  {
                      title: 'View Patients',
                      description: 'Get full information about patients',
                      onTrigger: () => handleNavigate('/patients'),
                      keywords: ['patients', 'patient', 'view'],
                      icon: <IconUsers size="1.2rem" />,
                  },
                  {
                      title: 'Add Patient',
                      description: 'Add new patient',
                      onTrigger: () => handleNavigate('/patients/add'),
                      keywords: ['patients', 'patient', 'add'],
                      icon: <IconUsersPlus size="1.2rem" />,
                  },
              ]
            : query === 'appointments'
            ? [
                  {
                      title: 'View Appointments',
                      description: 'Get full information about appointments',
                      onTrigger: () => handleNavigate('/appointments'),
                      keywords: ['appointments', 'appointment', 'view'],
                      icon: <IconUsers size="1.2rem" />,
                  },
                  {
                      title: 'Add Appointment',
                      description: 'Add new appointment',
                      onTrigger: () => handleNavigate('/appointments/add'),
                      keywords: ['appointments', 'appointment', 'add'],
                      icon: <IconCalendarPlus size="1.2rem" />,
                  },
              ]
            : [
                  {
                      title: 'Home',
                      description: 'Get to home page',
                      onTrigger: () => handleNavigate('/'),
                      icon: <IconHome size="1.2rem" />,
                  },
                  {
                      title: 'Patients',
                      description: 'Get full information about patients',
                      onTrigger: () => setQuery('patients'),
                      icon: <IconUsers size="1.2rem" />,
                      closeOnTrigger: false,
                  },
                  {
                      title: 'Appointments',
                      description: 'Get full information about appointments',
                      onTrigger: () => setQuery('appointments'),
                      icon: <IconCalendarCheck size="1.2rem" />,
                      closeOnTrigger: false,
                  },
                  {
                      title: 'Calendar',
                      description: 'Get full information about calendar',
                      onTrigger: () => handleNavigate('/calendar'),
                      icon: <IconCalendar size="1.2rem" />,
                  },
              ];

    return (
        <SpotlightProvider
            query={query}
            actions={actions}
            searchIcon={<IconSearch size="1.2rem" />}
            searchPlaceholder="Search..."
            shortcut={['mod + p', '/']}
            onQueryChange={setQuery}
            nothingFoundMessage="Nothing found..."
        >
            {children}
        </SpotlightProvider>
    );
};

export default Spotlight;
