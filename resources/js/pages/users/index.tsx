import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as usersIndex } from '@/routes/users';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: usersIndex().url,
    },
];

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'sponsor_id', label: 'Sponsor' },
    { key: 'parent_id', label: 'Parent' },
    { key: 'position', label: 'Position' },
    { key: 'balance', label: 'Balance' },
    { key: 'point', label: 'Point' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
];

export default function UserIndex({ users }: { users: any }) {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // Contoh logika sederhana untuk isAdmin, sesuaikan dengan struktur data user Anda
    // Misalnya: const isAdmin = auth.user.roles?.includes('admin');
    const isAdmin = true;

    const data = users?.data || [];
    const links = users?.links || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="overflow-x-auto p-4 text-center">
                        <table className="w-full table-auto border-collapse [&_td]:align-middle">
                            <thead>
                                <tr className='border-b border-sidebar-border/70 dark:border-sidebar-border'>
                                    <th className="p-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider w-12">
                                        #
                                    </th>
                                    {columns.map((col) => (
                                        <th key={col.key} className="p-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-border-sidebar-border/70 dark:divide-sidebar-border'>
                                {data.length > 0 ? (data.map((user: any, index: number) => (
                                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="py-2">{users?.current_page ? (users.current_page - 1) * users.per_page + index + 1 : index + 1}</td>
                                        {columns.map((col) => (
                                            <td key={col.key} className="py-2 px-3 text-sm">
                                                {col.key === 'roles' ? (
                                                    <div>
                                                        {user.roles ? user.roles.split(', ').map(role => (
                                                            <span key={role} className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary capitalize">
                                                                {role}
                                                            </span>
                                                        )) : <span className="text-muted-foreground">-</span>}
                                                    </div>
                                                ) : col.key === 'actions' ? (
                                                    <div className="gap-2 whitespace-nowrap">
                                                        <Button variant="default" size="sm" asChild>
                                                            <Link href="#">
                                                                Show
                                                            </Link>
                                                        </Button>
                                                        <Button className="m-1" variant="secondary" size="sm" asChild>
                                                            <Link href={`/users/${user.id}/edit`}>
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        {isAdmin && (

                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to delete this user?')) {
                                                                        router.delete(`/users/${user.id}`);
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    user[col.key as keyof typeof user]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="p-4 text-center text-muted-foreground">
                                            Data tidak ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 p-4 border-t border-sidebar-border/70">
                        {links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 text-xs rounded-md border transition-colors ${link.active
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'hover:bg-muted border-sidebar-border text-muted-foreground'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                preserveScroll
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
