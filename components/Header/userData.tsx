import { Menu } from '@/app/types/menu';
import { HomeIcon } from '@radix-ui/react-icons';

const userData: Menu[] = [
    {
        id: 1,
        title: 'Profile',
        path: '/dashboard/profileforms',
        newTab: false,
        icon: '/profile.png',
    },
    {
        id: 2,
        title: 'Manage Passwords',
        path: '/dashboard/homepage',
        newTab: false,
        icon: '/managepassword.png',
    },
    {
        id: 3,
        title: 'Phone & Email Verification',
        path: '/dcdc',
        newTab: false,
        icon: '/phoneverify.png',
    },
];
export default userData;
