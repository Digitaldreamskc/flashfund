# Background and Motivation
FlashFund is a lightweight Solana-based dApp for instant, wallet-to-wallet emergency donations. The MVP will allow users to connect their wallet, submit an emergency request (amount + message), view a feed of requests, and simulate sending a USDC donation using Solana Pay. The goal is a clean, mobile-first, minimal prototype.

# Key Challenges and Analysis
- Ensuring Solana wallet adapter packages work with Vite + React (module resolution, peer deps)
- Keeping the UI modular, minimal, and mobile-friendly
- Simulating Solana Pay transactions without real USDC for demo
- Temporary storage for requests (in-memory or Supabase)
- Clean error handling and user feedback

# High-level Task Breakdown
- [ ] 1. **Wallet Connect Button**
    - Use Solana Wallet Adapter UI (WalletMultiButton)
    - Success: User can connect/disconnect wallet, see address
- [ ] 2. **Emergency Request Form**
    - Simple form: amount (number), message (text)
    - Success: Submitting adds request to in-memory array (or Supabase if available)
- [ ] 3. **Feed UI**
    - List all active requests (amount, message, wallet address)
    - Each has a "Send Donation" button
    - Success: Feed updates in real time as requests are added
- [ ] 4. **Send Donation Simulation**
    - Clicking "Send Donation" simulates a USDC transfer (mock transaction)
    - Success: Show confirmation/toast, optionally remove request from feed
- [ ] 5. **Styling & Layout**
    - Mobile-first, clean, minimal
    - Success: Looks good on mobile, easy to use
- [ ] 6. **(Optional) Supabase Integration**
    - Store requests in Supabase table instead of memory
    - Success: Requests persist on reload, multi-user support

# Project Status Board
- [ ] Wallet Connect Button
- [ ] Emergency Request Form
- [ ] Feed UI
- [ ] Send Donation Simulation
- [ ] Styling & Layout
- [ ] (Optional) Supabase Integration

# Executor's Feedback or Assistance Requests
- None yet

# Lessons
- Use --legacy-peer-deps for npm install with Solana wallet adapter
- If Vite module errors persist, check alias paths and package versions
- Use Command Prompt (not Git Bash) for npm scripts on Windows 