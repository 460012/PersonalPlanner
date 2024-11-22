'use client';

import {
  ArrowUturnLeftIcon,
  DocumentIcon,
  BookmarkSquareIcon,
  UserGroupIcon,
  ChartBarSquareIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Back to overview', href: '/Dashboard/Projects', icon: ArrowUturnLeftIcon },
  { name: 'Overview', href: '/Project', icon: HomeIcon },
  { name: 'Board', href: '/Project/Board', icon: DocumentIcon, },
  { name: 'Planning', href: '/Project/Planning', icon: BookmarkSquareIcon },
  { name: 'Members', href: '/Project/Members', icon: UserGroupIcon },
  { name: 'Charts', href: '/Project/Charts', icon: ChartBarSquareIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-blue-600 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
            >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
