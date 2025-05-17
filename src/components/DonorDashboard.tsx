import { FC, useState } from 'react'
import { useRequestStore } from '../stores/requestStore'
import { useUserStore } from '../stores/userStore'
import DonationModal from './DonationModal'
import { motion, AnimatePresence } from 'framer-motion'
import { Request, RequestCategory } from '../types'

const categoryColors: Record<RequestCategory, string> = {
  Fire: 'bg-red-500/10 text-red-500',
  Medical: 'bg-blue-400/10 text-blue-400',
  Housing: 'bg-pink-500/10 text-pink-500',
  Tornado: 'bg-yellow-500/10 text-yellow-500',
  Earthquake: 'bg-orange-500/10 text-orange-500',
  Flood: 'bg-cyan-500/10 text-cyan-500',
  Other: 'bg-gray-500/10 text-gray-500',
}

const DonorDashboard: FC = () => {
  const requests = useRequestStore(state => state.requests)
  const supportedRequests = useUserStore(state => state.supportedRequests)
  const getTotalDonated = useUserStore(state => state.getTotalDonated)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalRequest, setModalRequest] = useState<Request | null>(null)

  const openModal = (request: Request) => {
    setModalRequest(request)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalRequest(null)
  }

  const handleDonate = () => {
    closeModal()
    // Optionally show a toast/notification
  }

  // Filter current requests by search
  const filteredRequests = requests.filter(req => {
    const q = search.toLowerCase()
    return (
      req.title.toLowerCase().includes(q) ||
      req.category.toLowerCase().includes(q) ||
      (req.location?.toLowerCase().includes(q) ?? false)
    )
  })

  const totalDonated = getTotalDonated()
  const isTopSupporter = totalDonated > 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-solana-card-bg/80 rounded-xl p-8 shadow-lg border-2 border-solana-accent/30 max-w-4xl mx-auto"
    >
      <DonationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onDonate={handleDonate}
        requester={modalRequest?.requester || ''}
        requestTitle={modalRequest?.title || ''}
      />
      {/* Header with Profile */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h2 className="text-2xl font-heading font-bold text-solana-primary">Donor Dashboard</h2>
          {supportedRequests.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-solana-text-light/80">
                {supportedRequests[0].title}
              </span>
              {/* Trust badge removed due to missing wallet address */}
              {isTopSupporter && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-solana-primary via-solana-secondary to-solana-accent text-white text-sm font-bold shadow animate-pulse-glow"
                >
                  ✨ Top Supporter
                </motion.span>
              )}
            </div>
          )}
        </div>
      </motion.div>
      {/* Total Donated */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="text-lg font-medium text-solana-text-light/80 mb-2">Total Donated</h3>
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.4 }}
          className="text-3xl font-heading font-bold text-solana-secondary animate-glow"
        >
          {totalDonated} SOL
        </motion.div>
      </motion.div>
      {/* Current Requests */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <h3 className="text-lg font-medium text-solana-text-light/80 mb-4">Current Requests for Help</h3>
        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by state, region, or disaster type..."
          className="mb-4 px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent w-full md:w-96"
        />
        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
          <AnimatePresence>
            {filteredRequests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-solana-text-light/60 text-center py-8"
              >
                No requests found.
              </motion.div>
            ) : (
              filteredRequests.map((req, index) => {
                const donatedAmount = Array.isArray(req.donations)
                  ? req.donations.reduce((sum, d) => sum + d.amount, 0)
                  : 0
                const progress = Math.min((donatedAmount / req.amount) * 100, 100)

                return (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-solana-card-bg/60 rounded-lg p-4 border border-solana-accent/10 hover:border-solana-accent/30 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-solana-primary mb-2">{req.title}</div>
                        <div className="flex items-center gap-2 text-xs text-solana-text-light/60 mb-2">
                          <span className={`px-2 py-1 rounded-full ${categoryColors[req.category] || categoryColors.Other}`}>
                            {req.category}
                          </span>
                          <span>•</span>
                          <span>{req.location || 'Unknown'}</span>
                        </div>
                        <div className="w-full h-2 bg-solana-card-bg/80 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full rounded-full bg-gradient-to-r from-solana-primary via-solana-secondary to-solana-accent"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-solana-text-light/60 mt-1">
                          <span>{donatedAmount} of {req.amount} SOL</span>
                          <span>{Math.round(progress)}% funded</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal(req)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-solana-primary to-solana-secondary text-white font-bold shadow hover:shadow-[0_0_16px_2px_rgba(153,69,255,0.5)] transition-all duration-200 animate-pulse-glow"
                      >
                        Donate Now
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* Supported Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-medium text-solana-text-light/80 mb-4">Supported Requests</h3>
        <ul className="space-y-4">
          <AnimatePresence>
            {supportedRequests.length === 0 ? (
              <motion.li 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-solana-text-light/60 text-center py-8"
              >
                No supported requests yet.
              </motion.li>
            ) : (
              supportedRequests.map((req, index) => (
                <motion.li
                  key={req.requestId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-solana-card-bg/60 rounded-lg p-4 border border-solana-accent/10 hover:border-solana-accent/30 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-solana-primary">{req.title}</div>
                    <div className="text-xs text-solana-text-light/60">{req.category} • {req.date}</div>
                  </div>
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-solana-accent font-bold text-lg"
                  >
                    {req.amount} SOL
                  </motion.div>
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default DonorDashboard 