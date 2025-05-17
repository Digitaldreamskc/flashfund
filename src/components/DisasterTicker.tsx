import { FC } from 'react'
import { motion } from 'framer-motion'
import { useRequestStore } from '../stores/requestStore'

const DisasterTicker: FC = () => {
  const requests = useRequestStore(state => state.requests)
  
  // Filter for major disaster requests
  const majorDisasters = requests.filter(req => 
    req.amount > 5 && req.status === 'active'
  )

  if (majorDisasters.length === 0) return null

  return (
    <div className="w-full overflow-hidden bg-solana-card-bg/80 border-b border-solana-accent/20">
      <motion.div
        className="flex whitespace-nowrap py-2"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {majorDisasters.map((req) => (
          <span key={req.id} className="mx-8">
            🚨 {req.category.toUpperCase()} in {req.location || 'Unknown'}: {req.title}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default DisasterTicker 