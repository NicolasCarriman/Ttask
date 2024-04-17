
interface DashboardProps {
  children: React.ReactNode
}

export const DashboardComponent: React.FC<DashboardProps> = ({ children }) => {
  return (
    <main
      className='container-full'
    >
      {children}
    </main>
  );
};

export const DashboardHeader: React.FC<DashboardProps> = ({ children }) => {

  return (
    <div className='flex flex-row w-100% gap-4 p-4'>
        {children}
    </div>
  );
};

export const DashboardContent: React.FC<DashboardProps> = ({ children }) => {
  return(
    <div className='flex justify-center mt-4'>
      { children }
    </div>
  );
};
