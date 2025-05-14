import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  requestId: string
  amount: number
  onConfirm: (amount: number) => void
}

export default function DonationModal({ isOpen, onClose, requestId, amount, onConfirm }: DonationModalProps) {
  const { publicKey } = useWallet()
  const [donationAmount, setDonationAmount] = useState(amount)
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm')

  if (!isOpen) return null

  const handleConfirm = async () => {
    setStep('processing')
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    onConfirm(donationAmount)
    setStep('success')
    // Close modal after success
    setTimeout(() => {
      onClose()
      setStep('confirm')
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Confirm Donation</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 'confirm' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount (USDC)
              </label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min={0.1}
                step={0.1}
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <p>From: {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}</p>
              <p>To: Request #{requestId}</p>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Confirm Donation
            </button>
          </>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your donation...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600">Donation successful!</p>
          </div>
        )}
      </div>
    </div>
  )
} 