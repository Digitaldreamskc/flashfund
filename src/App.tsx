import { useEffect } from 'react'
import RequestForm from './components/RequestForm'
import RoleSelectModal from './components/RoleSelectModal'
import { useUserStore } from './stores/userStore'
import DonorDashboard from './components/DonorDashboard'
import SidebarRoleSwitcher from './components/SidebarRoleSwitcher'
import DisasterTicker from './components/DisasterTicker'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useLocation, useNavigate } from 'react-router-dom'

function App() {
  const userRole = useUserStore((s) => s.userRole)
  const showRoleModal = !userRole
  const wallet = useWallet()
  const navigate = useNavigate()
  const location = useLocation()

  // Wallet connection and routing logic
  useEffect(() => {
    if (!wallet.connected) {
      if (location.pathname !== '/') navigate('/')
      return
    }
    // If connected, route based on role
    if (userRole === 'donor' && location.pathname !== '/donor') {
      navigate('/donor')
    } else if (userRole === 'requester' && location.pathname !== '/request') {
      navigate('/request')
    }
  }, [wallet.connected, userRole, navigate, location.pathname])

  // Full-screen connect screen if not connected
  if (!wallet.connected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-solana-bg via-solana-primary/40 to-solana-accent/30 text-solana-text-light animate-pulse-glow">
        <h1 className="text-5xl font-heading font-extrabold mb-8 bg-gradient-to-r from-solana-primary via-solana-secondary to-solana-accent bg-clip-text text-transparent animate-pulse-glow drop-shadow-[0_0_32px_rgba(153,69,255,0.7)]">
          FlashFund
        </h1>
        <div className="mb-8 text-xl text-solana-text-light/80 max-w-xl text-center animate-fade-in">
          <span className="block mb-2">Emergency aid, onchain and instant.</span>
          <span className="block">Connect your wallet to get started.</span>
        </div>
        <WalletMultiButton className="!bg-solana-card-bg !text-solana-text-light hover:!bg-solana-card-bg/80 text-2xl px-10 py-5 rounded-2xl shadow-xl animate-pulse-glow border-2 border-solana-accent/40" />
      </div>
    )
  }

  // Main app content (role-based routing)
  return (
    <div className="min-h-screen bg-solana-bg text-solana-text-light">
      <DisasterTicker />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-solana-primary via-solana-secondary to-solana-accent bg-clip-text text-transparent animate-pulse-glow">
            FlashFund
          </h1>
          <WalletMultiButton className="!bg-solana-card-bg !text-solana-text-light hover:!bg-solana-card-bg/80" />
        </div>
        {showRoleModal ? (
          <RoleSelectModal />
        ) : userRole === 'donor' ? (
          <DonorDashboard />
        ) : (
          <RequestForm />
        )}
        {userRole && <SidebarRoleSwitcher />}
      </div>
    </div>
  )
}

export default App

 