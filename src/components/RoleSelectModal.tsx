import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../stores/userStore'

const RoleSelectModal: FC = () => {
  const setUserRole = useUserStore(state => state.setUserRole)

  const handleRoleSelect = (role: 'requester' | 'donor') => {
    setUserRole(role)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-solana-card-bg/90 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border-2 border-solana-accent/30"
        >
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-heading font-bold text-center mb-8 bg-gradient-to-r from-solana-primary via-solana-secondary to-solana-accent bg-clip-text text-transparent animate-pulse-glow"
          >
            How would you like to use FlashFund?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('requester')}
              className="group relative p-8 rounded-xl overflow-hidden bg-gradient-to-br from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#FF69B4_0_2px,transparent_2px,transparent_10px,#FF0000_10px,transparent_12px,transparent_20px)] opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <motion.span 
                  className="text-4xl mb-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚨
                </motion.span>
                <h3 className="text-2xl font-bold mb-2">Request Help</h3>
                <p className="text-white/80 text-center">Create an emergency relief request</p>
              </div>
            </motion.button>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('donor')}
              className="group relative p-8 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#00FFFF_0_2px,transparent_2px,transparent_10px,#00FF00_10px,transparent_12px,transparent_20px)] opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <motion.span 
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                <h3 className="text-2xl font-bold mb-2">Give Help</h3>
                <p className="text-white/80 text-center">Support emergency relief requests</p>
              </div>
            </motion.button>
          </div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-solana-text-light/60 text-center mt-8 text-sm"
          >
            You can change your role anytime in settings
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RoleSelectModal 