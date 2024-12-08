import { useMyAuth } from '@/hooks/useMyAuth';
import { useEffect } from 'react';

export const UserInfoPage = () => {
  const { payload } = useMyAuth();

  useEffect(() => {
    console.log(payload);
  });

  return (
    <div>
      <h1>User Info</h1>
      <div>{JSON.stringify(payload, null, 4)}</div>
    </div>
  );
};
