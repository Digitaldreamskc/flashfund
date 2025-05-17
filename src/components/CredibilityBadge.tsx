import { FC } from 'react'
import { TrustLevel } from '../types'

interface CredibilityBadgeProps {
  trustLevel?: TrustLevel
  className?: string
}

interface TrustLevelConfig {
  label: string
  color: string
  borderColor: string
  icon: string
  tooltip: string
  hoverGlow: string
}

const trustLevelConfig: Record<TrustLevel, TrustLevelConfig> = {
  new: {
    label: 'New User',
    color: 'bg-gray-500',
    borderColor: 'border-gray-500',
    icon: '⭐',
    tooltip: 'New: Default for all wallets. Build trust through transactions.',
    hoverGlow: 'hover:shadow-[0_0_8px_rgba(107,114,128,0.5)]'
  },
  verified: {
    label: 'Verified',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    icon: '✓',
    tooltip: 'Verified: 5+ transactions, 3+ days old. Basic trust established.',
    hoverGlow: 'hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]'
  },
  trusted: {
    label: 'Trusted',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    icon: '✓✓',
    tooltip: 'Trusted: 20+ transactions, 15+ days old, 0.5+ tx/day. High reliability.',
    hoverGlow: 'hover:shadow-[0_0_8px_rgba(34,197,94,0.5)]'
  },
  veteran: {
    label: 'Veteran',
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
    icon: '👑',
    tooltip: 'Veteran: 50+ transactions, 30+ days old, 1+ tx/day. Maximum trust level.',
    hoverGlow: 'hover:shadow-[0_0_8px_rgba(168,85,247,0.5)]'
  }
}

export const CredibilityBadge: FC<CredibilityBadgeProps> = ({ trustLevel = 'new', className = '' }) => {
  const config = trustLevelConfig[trustLevel]

  return (
    <div 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} text-white shadow-sm ${config.hoverGlow} transition-all duration-200 ${className} group relative`}
      title={config.tooltip}
    >
      <span className="mr-1 group-hover:scale-110 transition-transform duration-200">{config.icon}</span>
      {config.label}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-white/95 text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg border border-gray-200 z-10">
        {config.tooltip}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/95 rotate-45 border-r border-b border-gray-200"></div>
      </div>
    </div>
  )
}

export default CredibilityBadge 