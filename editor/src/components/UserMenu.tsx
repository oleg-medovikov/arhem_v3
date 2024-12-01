import { ExitIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useSession } from '@/store/session';

export const UserMenu = function UserMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const handleExitClick = () => {
    session.put({ username: null, token: null });
    router.push('/login');
  };

  return (
    <span className="flex items-center gap-4">
      {session.username ? (
        <>
          <span className="text-lg">{session.username}</span>
          <button
            aria-label="Выйти"
            className="p-1 hover:text-gray-300"
            title="Выйти"
            type="button"
            onClick={handleExitClick}
          >
            <ExitIcon width={15} height={15} />
          </button>
        </>
      ) : (
        <>
          {pathname !== '/login' && (
            <Link href="/login" className="hover:underline underline-offset-2">
              Войти
            </Link>
          )}
          {pathname !== '/register' && (
            <Link
              href="/register"
              className="hover:underline underline-offset-2"
            >
              Создать аккаунт
            </Link>
          )}
        </>
      )}
    </span>
  );
};
