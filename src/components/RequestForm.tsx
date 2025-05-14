import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRequestStore, RequestCategory } from '../store/requestStore'

const CATEGORIES: RequestCategory[] = ['Medical', 'Flood', 'Fire', 'Housing', 'Earthquake', 'Tornado', 'Other']

export default function RequestForm() {
  const { publicKey } = useWallet()
  const addRequest = useRequestStore((state) => state.addRequest)
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState<RequestCategory>('Other')
  const [error, setError] = useState('')
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLocationStatus('loading')
        const res = await fetch('https://ipapi.co/json')
        const data = await res.json()
        
        if (data.city && data.region) {
          setLocation(`${data.city}, ${data.region}, ${data.country_name}`)
          setLocationStatus('success')
        } else {
          setLocationStatus('error')
        }
      } catch (error) {
        console.error('Error getting location:', error)
        setLocationStatus('error')
      }
    }

    getLocation()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!publicKey) {
      setError('Please connect your wallet first')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (!message.trim()) {
      setError('Please enter a message')
      return
    }

    if (!location.trim()) {
      setError('Please enter a location')
      return
    }

    const result = addRequest({
      walletAddress: publicKey.toString(),
      amount: amountNum,
      message: message.trim(),
      location: location.trim(),
      category,
    })

    if (!result.success) {
      setError(result.error || 'Failed to submit request')
      return
    }

    // Reset form
    setAmount('')
    setMessage('')
    setLocation('')
    setCategory('Other')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Emergency Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount (USDC)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter amount in USDC"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g. Chicago, IL"
          />
          {locationStatus === 'loading' && (
            <p className="mt-1 text-sm text-gray-500">Detecting your location...</p>
          )}
          {locationStatus === 'success' && (
            <p className="mt-1 text-sm text-green-600">Location autofilled</p>
          )}
          {locationStatus === 'error' && (
            <p className="mt-1 text-sm text-gray-500">Please enter your location manually</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as RequestCategory)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Describe your emergency situation..."
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Request
        </button>
      </form>
    </div>
  )
} 