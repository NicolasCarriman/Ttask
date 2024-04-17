'use client';

import Sidebar from '../../components/ui/sidebar/sidebar';
import { DashboardComponent } from './dashboard.styled';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <style jsx global>
          {`
            body {
                background: #F4F5F7;
            }
        `}
        </style>
        <div className='tt-flex-row'>
          <Sidebar/>
          <DashboardComponent>
            {children}
          </DashboardComponent>
        </div>
        <div id='modal-root'></div>
    </>
  );
}
