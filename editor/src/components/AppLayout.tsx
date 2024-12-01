import Link from 'next/link';

import { UserMenu } from './UserMenu';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200 dark:bg-slate-900 text-slate-950 dark:text-white">
      <header className="h-14 px-4 flex items-center text-white bg-pink-800">
        <Link href="/" className="text-lg font-bold">
          Arhm Editr
        </Link>
        <div className="ml-auto">
          <UserMenu />
        </div>
      </header>
      <main className="h-0 grow">{children}</main>
    </div>
  );
}
