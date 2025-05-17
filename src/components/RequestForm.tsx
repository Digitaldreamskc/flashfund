import { useState, useEffect, useRef } from 'react'
import { useRequestStore } from '../stores/requestStore'
import { useWallet } from '@solana/wallet-adapter-react'
import { Request, RequestCategory } from '../types'

export default function RequestForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<RequestCategory>('Fire')
  const [location, setLocation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { publicKey } = useWallet()

  const addRequest = useRequestStore(state => state.addRequest)

  useEffect(() => {
    const getLocation = async () => {
      setIsLoadingLocation(true)
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        setLocation(`${data.city}, ${data.region}, ${data.country_name}`)
      } catch (error) {
        console.error('Error fetching location:', error)
      } finally {
        setIsLoadingLocation(false)
      }
    }
    getLocation()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) return

    setIsSubmitting(true)

    try {
      const walletAddress = publicKey.toString()
      const request: Request = {
        id: Date.now().toString(),
        title,
        description,
        amount: parseFloat(amount),
        category,
        location,
        requester: walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4),
        requesterWallet: walletAddress,
        timestamp: Date.now(),
        status: 'active',
        donations: [],
        imageUrl: imagePreview
      }

      addRequest(request)
      // Reset form
      setTitle('')
      setDescription('')
      setAmount('')
      setCategory('Fire')
      setImagePreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error submitting request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-heading font-semibold mb-6">Create Emergency Request</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent"
            rows={4}
            maxLength={2500}
            required
          />
          <div className="mt-1 text-right text-sm text-solana-text-light/60">
            {description.length}/2500 characters
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount Needed (SOL)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent"
            placeholder={isLoadingLocation ? "Loading location..." : "Enter location"}
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as RequestCategory)}
            className="w-full px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent"
            required
          >
            <option value="Fire">Fire</option>
            <option value="Medical">Medical</option>
            <option value="Housing">Housing</option>
            <option value="Tornado">Tornado</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Flood">Flood</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Upload Image (Optional)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light hover:border-solana-accent/40 transition-colors"
            >
              Choose Image
            </button>
            {imagePreview && (
              <div className="relative w-20 h-20">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-solana-primary to-solana-secondary text-white font-bold shadow hover:shadow-[0_0_16px_2px_rgba(153,69,255,0.5)] transition-all duration-200 animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
} 