import { FC, ReactNode } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">FlashFund</h1>
              </div>
            </div>
            <div className="flex items-center">
              <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700" />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}; 