'use client';

import { useRouter } from 'next/navigation';
import useUserStore from '../../misc/store/useUserStore';
import { routes } from '../../misc/routes';
import { useEffect } from 'react';
import { DoubleNavbar } from '../../components/DoubleNavbar/DoubleNavbar';
import { Group } from '@mantine/core';

type TUserPanelLayoutProps = {
  children: React.ReactNode;
};

const UserPanelLayout = ({ children }: TUserPanelLayoutProps) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace(routes['index']);
    }
  }, [user]);

  if (!user) return null;

  return <Group> <DoubleNavbar/> {children}</Group>;
};

export default UserPanelLayout;
