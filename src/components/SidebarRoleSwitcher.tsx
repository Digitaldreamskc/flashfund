import { FC } from 'react'
import { useUserStore } from '../stores/userStore'
import { motion } from 'framer-motion'

const SidebarRoleSwitcher: FC = () => {
  const userRole = useUserStore(state => state.userRole)
  const setUserRole = useUserStore(state => state.setUserRole)

  const handleRoleSwitch = () => {
    setUserRole(userRole === 'donor' ? 'requester' : 'donor')
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleRoleSwitch}
        className="fixed bottom-4 right-4 px-4 py-2 rounded-lg bg-solana-card-bg/80 border border-solana-accent/20 text-solana-text-light hover:border-solana-accent/40 transition-colors flex items-center gap-2 shadow-lg"
      >
        <span className="text-lg">
          {userRole === 'donor' ? '🚨' : '✨'}
        </span>
        <span className="text-sm font-medium">
          Switch to {userRole === 'donor' ? 'Request Help' : 'Give Help'}
        </span>
      </motion.button>
      <button
        onClick={() => {
          localStorage.removeItem('userRole');
          location.reload();
        }}
        className="fixed bottom-20 right-4 px-4 py-2 rounded-lg bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition-colors"
      >
        Reset Role
      </button>
    </>
  )
}

export default SidebarRoleSwitcher 