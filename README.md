# FinTrack Lite 💸  
### Personal Finance Tracker (Offline & Privacy-First)

FinTrack Lite is a lightweight personal finance tracker built with **Next.js + TypeScript**.  
It is designed to work **100% offline**, storing all data locally in your browser with **no login, no cloud, and no tracking**.

This project is an extended and customized version of the original work by **Tom Shaw**, refactored to use a **transaction-based accounting model** and enhanced with **multi-language support (EN / TH)**.

---

## ✨ Features

### 📒 Transaction-Based Accounting
- Income
- Expense
- Transfer (e.g. bank → credit card)
- No balance snapshots
- All values are calculated from transactions

### 💳 Asset & Debt Support
- Asset accounts (cash, bank, savings)
- Liability accounts (credit card, loan)
- Net worth = Assets − Liabilities

### 🌐 Multi-Language Support
- 🇬🇧 English
- 🇹🇭 Thai
- Language switch in UI
- Stored in localStorage

### 📴 Offline First
- Works 100% offline
- Uses browser localStorage
- No backend required

### 📊 Dashboard
- Account balances
- Net worth overview
- Transaction history
- Charts

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- LocalStorage
- GitHub Pages (static export)

---

## 🧠 Design Philosophy

- **Privacy-first** — your data never leaves your device
- **Simple accounting logic**
- **No authentication**
- **No cloud dependency**
- **Fast & lightweight**

---

## 📁 Project Structure

src/
├─ app/ # Next.js routes
├─ components/ # UI components
├─ context/ # Finance / Language context
├─ lib/ # Finance logic & translations
├─ types/ # TypeScript types
└─ public/ # Static assets


---

## 🧪 Run Locally

```bash
npm install
npm run dev -- -p 3001


Open:

http://localhost:3001


📊 Accounting Rules
Action	Result
Income	Increase assets
Expense	Decrease assets
Credit card spend	Increase liability
Pay credit card	Decrease liability
Transfer	Move between accounts
🧩 Language Support

Languages are stored in:

localStorage → finance-lang


Supported:

en

th

🙏 Credits
Original Project

Tom Shaw
https://github.com/IAmTomShaw/personal-finance-tracker

Extended Version

Modified and extended by Patrick Mint

Changes include:

Transaction-based accounting

Multi-language support

Offline-only architecture

GitHub Pages deployment

UI & logic refactor

📄 License

MIT License
Original work by Tom Shaw
Extended version by Patrick Mint