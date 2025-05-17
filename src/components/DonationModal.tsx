import { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  onDonate: () => void
  requester: string
  requestTitle: string
}

const DonationModal: FC<DonationModalProps> = ({
  isOpen,
  onClose,
  onDonate,
  requester,
  requestTitle
}) => {
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('pending')
    try {
      // TODO: Implement actual donation logic
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setStatus('success')
      setTimeout(() => {
        onDonate()
      }, 1500)
    } catch (error) {
      console.error('Error making donation:', error)
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-solana-card-bg rounded-xl p-6 w-full max-w-md border-2 border-solana-accent/30"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-heading font-bold text-solana-primary mb-4">
              Make a Donation
            </h3>
            <div className="mb-4">
              <p className="text-solana-text-light/80 mb-2">
                Request: <span className="text-solana-text-light">{requestTitle}</span>
              </p>
              <p className="text-solana-text-light/80">
                Requester: <span className="text-solana-text-light">{requester}</span>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                  Amount (SOL)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light hover:border-solana-accent/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'pending'}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-solana-primary to-solana-secondary text-white font-bold shadow hover:shadow-[0_0_16px_2px_rgba(153,69,255,0.5)] transition-all duration-200 animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'pending' ? 'Processing...' : 'Donate'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DonationModal 