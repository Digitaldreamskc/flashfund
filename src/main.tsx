import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import WalletProviderWrapper from './WalletProvider'
import '@solana/wallet-adapter-react-ui/styles.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <WalletProviderWrapper>
      <App />
    </WalletProviderWrapper>
  </React.StrictMode>
)
