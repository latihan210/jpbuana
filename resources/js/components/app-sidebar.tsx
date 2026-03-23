import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, Home, Settings, User, UserPlus } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, register } from '@/routes';
import type { NavItem } from '@/types';
import { Separator } from './ui/separator';
import { index as usersIndex } from '@/routes/users';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: Home,
    },
];

const mainNavItemsWithHeader: NavItem[] = [
    {
        header: 'Members',
        title: 'Data Member',
        href: '#',
        icon: User,
        isActive: false,
        items: [
            {
                title: 'Tambah Member',
                href: register(),
            },
            {
                title: 'List Member',
                href: usersIndex().url,
            },
            {
                title: 'List Group',
                href: '#',
            },
        ],
    },
    {
        header: 'Perusahaan',
        title: 'Master Settings',
        href: '#',
        icon: Settings,
        isActive: false,
        items: [
            {
                title: 'Data Perusahaan',
                href: '#',
            },
        ],
    }
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: FolderGit2,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <Separator />
                <NavMain items={mainNavItemsWithHeader} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
