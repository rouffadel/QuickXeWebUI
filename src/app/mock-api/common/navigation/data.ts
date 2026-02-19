/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'currency',
        title: 'Exchange Rate',
        type: 'basic',
        icon: 'heroicons_outline:currency-dollar',
        link: '/currency'
    },
    {
        id: 'myorders',
        title: 'My Orders',
        type: 'basic',
        icon: 'heroicons_outline:inbox',
        link: '/myorders'
    },
    {
        id: 'assignorders',
        title: 'Assign Orders',
        type: 'basic',
        icon: 'heroicons_outline:inbox',
        link: '/assignorders'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Orders',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/myorders',
        queryParams: { showData: 'true' }
    },
    {
        id: 'main',
        title: 'Main',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/main'
    },
    {
        id: 'tenant',
        title: 'Agents',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/agent'
    },
    {
        id: 'myorders',
        title: 'My Orders',
        type: 'basic',
        icon: 'heroicons_outline:inbox',
        link: '/myorders',
        queryParams: { showData: 'false' }
    }
];

// export const tenantNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'currency',
//         title: 'Exchange',
//         type : 'basic',
//         icon : 'heroicons_outline:currency-dollar',
//         link : '/currency'
//     }
// ];

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard'
    },
    {
        id: 'mydocuments',
        title: 'My Documents',
        type: 'basic',
        icon: 'heroicons_outline:document-text',
        link: '/mydocuments'
    },
    {
        id: 'myorders',
        title: 'My Orders',
        type: 'basic',
        icon: 'heroicons_outline:shopping-cart',
        link: '/customer-orders'
    },

];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
