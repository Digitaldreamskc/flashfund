import RequestForm from './components/RequestForm'
import RoleSelectModal from './components/RoleSelectModal'
import { useUserStore } from './stores/userStore'
import DonorDashboard from './components/DonorDashboard'
import SidebarRoleSwitcher from './components/SidebarRoleSwitcher'
import DisasterTicker from './components/DisasterTicker'

function App() {
  const userRole = useUserStore((s) => s.userRole)

  // Show modal if no role is set
  const showRoleModal = !userRole

  return (
    <div className="min-h-screen bg-solana-bg text-solana-text-light">
      <DisasterTicker />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-solana-primary via-solana-secondary to-solana-accent bg-clip-text text-transparent animate-pulse-glow">
            FlashFund
          </h1>
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

 