import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import { useForm, ValidationRule } from 'react-hook-form';

import { TextField } from '@/components/TextField';
import { API_BASE_URL } from '@/config';
import { useSession } from '@/store/session';

type UserCredentials = {
  username: string;
  password: string;
};

type UserLoginResponse = {
  token: string;
  message: string;
};

const required: ValidationRule<boolean> = {
  value: true,
  message: 'Поле обязательно',
};

export default function Login() {
  const router = useRouter();
  const session = useSession();

  const { isError, mutate: login } = useMutation({
    mutationFn: async (json: UserCredentials) => {
      return await ky
        .post(`${API_BASE_URL}/admin_login`, { json })
        .json<UserLoginResponse>();
    },
    onSuccess: ({ token }, { username }) => {
      session.put({ token, username });
      router.push('/');
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UserCredentials>();

  return (
    <div className="h-full py-64 flex justify-center">
      <form
        className="w-[300px] flex flex-col gap-4"
        onSubmit={handleSubmit((cred) => login(cred))}
      >
        <TextField
          label="Логин"
          type="text"
          autoComplete="username"
          error={errors.username?.message}
          {...register('username', { required })}
        />
        <TextField
          label="Пароль"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password', { required })}
        />
        <button
          className="px-2 py-1 text-white bg-pink-800 hover:bg-pink-900"
          type="submit"
        >
          Войти
        </button>
        {isError && (
          <p className="text-red-600 dark:text-red-400">
            Неверное имя пользователя или пароль
          </p>
        )}
      </form>
    </div>
  );
}
