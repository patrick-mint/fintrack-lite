export type Locale = "en" | "th";

type Dict = Record<string, string>;

// Keep keys stable. Add new keys here as UI grows.
export const translations: Record<Locale, Dict> = {
  en: {
    "app.title.full": "FinTrack Lite",

    "app.title.short": "FinTrack",
    
    "common.loading": "Loading...",
    
    "common.exportPdf": "Export PDF",

    "common.waitAuth": "Please wait while we authenticate you.",

    "common.waitData": "Please wait while we load your financial data.",

    "nav.privacy": "Privacy",

    "nav.signedInAs": "Signed in as",

    "nav.openMenu": "Open main menu",
    
    "nav.menu": "Menu",
    
    "nav.language": "Language",

    "auth.login": "Login",

    "auth.logout": "Logout",

    "auth.loggedInUser": "Logged in user",

    "login.title": "Welcome",

    "login.subtitle": "Sign in to continue.",

    "login.cta": "Sign in to get started",

    "disclaimer.title": "Privacy Policy & Disclaimer",

    "disclaimer.banner.title": "Your Data Stays Private",

    "disclaimer.banner.body":
      "Your financial data is never sold or shared. You control whether to store data locally only or enable cloud sync.",

    "disclaimer.local.title": "Local-First by Default",

    "disclaimer.local.body":
      "By default, your data is stored in your browser on this device.",

    "disclaimer.cloud.title": "Cloud Sync (Optional)",

    "disclaimer.cloud.body":
      "If you enable cloud sync, your data will be stored and synced across devices via your account.",

    "disclaimer.note.title": "Important",

    "disclaimer.note.body":
      "This app is for personal tracking only and is not financial advice. Always verify important numbers.",

    "disclaimer.back": "Back",
    
    "nav.dashboard": "Dashboard",
    
    "nav.addAccount": "Add Account",
    
    "nav.transactions": "Transactions",
    
    "nav.historical": "Historical",
    
    "nav.settings": "Settings",

    "dashboard.title": "Dashboard",
    
    "dashboard.netWorth": "Net Worth",
    
    "dashboard.assets": "Assets",
    
    "dashboard.liabilities": "Liabilities",
    
    "dashboard.accounts": "Accounts",
    
    "dashboard.noAccounts":
      "No accounts yet. Add your first account to get started.",
    
    "balanceSheet.totalAssets": "Total Assets",
    
    "balanceSheet.totalLiabilities": "Total Liabilities",
    
    "balanceSheet.note":
      "Note: Liabilities show outstanding debt (positive). Net worth = Assets − Liabilities.",
    
    "balanceSheet.title": "Personal Balance Sheet",
    
    "balanceSheet.asOf": "As of",

    "accounts.add.title": "Add Account",
    
    "accounts.add.subtitle":
      "Create a new account to track in your balance sheet",
    
    "accounts.name": "Account Name",
    
    "accounts.type": "Account Type",
    
    "accounts.asset": "Asset",
    
    "accounts.liability": "Liability",
    
    "accounts.type.asset": "Asset (cash / savings)",
    
    "accounts.type.liability": "Liability (debt)",
    
    "accounts.category": "Category",
    
    "accounts.placeholder": "e.g., Checking Account, Credit Card, etc.",
    
    "accounts.currency": "Currency",
    
    "accounts.create": "Create Account",
    
    "accounts.cancel": "Cancel",

    "tx.title": "Transactions",
    
    "tx.add": "Add Transaction",
    
    "tx.date": "Date",
    
    "tx.type": "Type",
    
    "tx.type.income": "Income",
    
    "tx.type.expense": "Expense",
    
    "tx.type.transfer": "Transfer",
    
    "tx.amount": "Amount",
    
    "tx.from": "From",
    
    "tx.to": "To",
    
    "tx.toAccount": "To account",
    
    "tx.fromAccount": "From account",
    
    "tx.category": "Category",
    
    "tx.note": "Note",
    
    "tx.save": "Save",
    
    "tx.recent": "Recent Transactions",
    
    "tx.selectAccount": "Select account",
    
    "tx.category.placeholder.income": "Salary, Bonus, Interest...",
    
    "tx.category.placeholder.expense": "Food, Rent, Utilities...",
    
    "tx.category.placeholder.transfer": "Transfer, Savings move...",
    
    "tx.note.placeholder": "Details / memo...",
    
    "common.unknown": "Unknown",
    
    "common.optional": "(optional)",
    
    "tx.delete": "Delete",
    
    "tx.deleteConfirm": "Delete this transaction? This will change balances.",
    
    "tx.deleteTitle": "Delete transaction",

    "settings.title": "Settings",
    
    "settings.language": "Language",
    
    "settings.language.en": "English",
    
    "settings.language.th": "ไทย",
    
    "settings.data": "Data",
    
    "settings.dismiss": "Dismiss",
    
    "settings.currencyPrefs.title": "🌍 Currency Preferences",
    
    "settings.currencyPrefs.desc":
      "Select your preferred currency for displaying financial data. This will update all balance sheets and charts.",
    
    "settings.currencyPrefs.currently": "Currently using:",
    
    "settings.dataOverview.title": "📊 Data Overview",
    
    "settings.dataOverview.accounts": "Accounts",
    
    "settings.dataOverview.transactions": "Transactions",
    
    "settings.dataOverview.total": "Total Records",
    
    "settings.cloudSync.title": "☁️ Cloud Sync Settings",
    
    "settings.cloudSync.desc":
      "Enable or disable cloud synchronization of your financial data. When enabled, your data will be securely stored and synced across devices.",
    
    "settings.export.title": "📤 Export Data",
    
    "settings.export.desc":
      "Download a backup of all your financial data in JSON format. This includes all accounts, transactions, and settings.",
    
    "settings.import.title": "📥 Import Data",
    
    "settings.import.desc":
      "Restore your data from a previously exported JSON backup.",
    
    "settings.import.selectFile": "Select backup file:",
    
    "settings.import.selectedFile": "Selected file:",
    
    "settings.import.replaceNote":
      "Import financial data from a previously exported backup file. This will replace all current data on this device.",
    
    "settings.delete.title": "🗑️ Delete All Data",
    
    "settings.delete.desc":
      "Permanently delete all local data (accounts and transactions) from this browser.",
    
    "settings.delete.confirm":
      "Are you sure you want to delete all data? This action cannot be undone.",
    
    "settings.delete.breakdown.accounts": "accounts",
    
    "settings.delete.breakdown.transactions": "transactions",
    
    "settings.delete.breakdown.historical": "All historical tracking data",
    
    "settings.delete.cannotUndo": "This action cannot be undone!",
    
    "settings.delete.confirmYes": "Yes, delete everything",
    
    "settings.delete.confirmNo": "Cancel",
    
    "settings.export": "Export Data",
    
    "settings.import": "Import Data",
    
    "settings.deleteAll": "Delete All Data",

    "welcome.title": "Welcome to Personal Finance Tracker!",
    
    "welcome.getStarted": "Get Started - Add Account",
    
    "welcome.subtitle":
      "Take control of your finances with a simple, private, and secure tracker that keeps all your data local to your browser.",
    
    "welcome.privacy.heading": "100% Private & Secure",
    
    "welcome.privacy.body":
      "Your financial data stays on your device. No servers, no accounts, no data sharing.",

    "welcome.step1.title": "Add Accounts",

    "welcome.step1.desc": "Create accounts for your assets and liabilities.",

    "welcome.step1.cta": "Add Your First Account",

    "welcome.step2.title": "Add Transactions",

    "welcome.step2.desc":
      "Record income, expenses, and transfers to update balances automatically.",

    "welcome.step2.cta": "Add Transactions",
    
    "welcome.step3.title": "Track Progress",
    
    "welcome.step3.desc": "View charts and track your net worth over time.",
    
    "welcome.step3.cta": "View Tracking",
    
    "welcome.features.title": "✨ Key Features",
    
    "welcome.features.f1": "Complete balance sheet view",
    
    "welcome.features.f2": "Historical progress tracking",
    
    "welcome.features.f3": "Multiple account categories",
    
    "welcome.features.f4": "Complete privacy & security",
    
    "welcome.features.f5": "Easy data export/import",
    
    "welcome.features.f6": "Mobile-friendly design",
    
    "welcome.notice.title": "Important:",
    
    "welcome.notice.body":
      "All your data is stored locally in this browser. Export your data regularly from Settings to avoid losing it if you clear browser data.",

    "welcome.privacyInfo": "Privacy Info",

    "balanceSheet.loadingTitle": "Personal Balance Sheet",
    
    "balanceSheet.loadingSubtitle": "Loading your financial data...",
    
    "balanceSheet.editAccount": "Edit account",
    
    "balanceSheet.edit": "Edit",
    
    "balanceSheet.deleteAccount": "Delete account",
    
    "balanceSheet.categoryTotal": "{category} Total: {amount}",
    
    "balanceSheet.totalSection": "Total {title}: {amount}",

    "historical.title": "Historical Tracking",
    
    "historical.subtitle": "View balances and net worth trends over time",
    
    "historical.loading": "Loading your data...",
    
    "historical.noData.title": "No transaction data available",
    
    "historical.noData.subtitle": "Add transactions to see charts and trends.",
    
    "historical.selectAccount": "Select Account",
    
    "historical.allAccounts": "All Accounts Overview",
    
    "historical.timePeriod": "Time Period",
    
    "historical.range.7d": "Last 7 days",
    
    "historical.range.30d": "Last 30 days",
    
    "historical.range.90d": "Last 90 days",
    
    "historical.range.1y": "Last year",
    
    "historical.range.all": "All time",
    
    "historical.summary.title": "Individual Account Summary",
    
    "historical.points": "points",
    
    "historical.card.currentBalance": "Current Balance",
    
    "historical.card.change": "Change",
    
    "historical.card.dataPoints": "Data Points",

    "accountCategory.Savings": "Savings",
    
    "accountCategory.Cash and Cash Equivalents": "Cash and Cash Equivalents",
    
    "accountCategory.Investments": "Investments",
    
    "accountCategory.Real Estate": "Real Estate",
    
    "accountCategory.Personal Property": "Personal Property",
    
    "accountCategory.Other Assets": "Other Assets",
    
    "accountCategory.Credit Cards": "Credit Cards",
    
    "accountCategory.Loans": "Loans",
    
    "accountCategory.Mortgages": "Mortgages",
    
    "accountCategory.Other Liabilities": "Other Liabilities",

    "tx.helper.body":
      "Record income, expenses, and transfers. Savings and debts update automatically.",

    "tx.helper.tip":
      "Tip: Paying credit card = transfer (Bank → Credit Card). Charging card = expense from Credit Card.",

    "tx.noAccounts.title": "No accounts yet",

    "tx.noAccounts.subtitle":
      "Add accounts first (e.g., Savings, Bank, Credit Card) then record transactions.",

    "tx.expense.liabilityHint":
      "If you choose a liability account (credit card), the debt will increase.",

    "tx.transfer.debtHint": "Paying debt: Bank → Credit Card (debt decreases)",
    
    "tx.totalCount": "{count} total",
    
    "tx.noTxYet": "No transactions yet.",
    
    "tx.recent.title.income": "Income → {to}",
    
    "tx.recent.title.expense": "Expense ← {from}",
    
    "tx.recent.title.transfer": "Transfer {from} → {to}",
    
    "tx.defaultCategory.income": "Income",
    
    "tx.defaultCategory.expense": "Expense",
    
    "tx.defaultCategory.transfer": "Transfer",
    
    "charts.netWorth.title": "Net Worth Over Time",

    "charts.netWorth.empty": "No data available for net worth tracking",
    
    "charts.netWorth.series.assets": "Assets",
    
    "charts.netWorth.series.liabilities": "Liabilities",
    
    "charts.netWorth.series.netWorth": "Net Worth",
    
    "charts.netWorth.card.current": "Current Net Worth",
    
    "charts.netWorth.card.assets": "Total Assets",
    
    "charts.netWorth.card.liabilities": "Total Liabilities",
    
    "charts.netWorth.card.change": "Change",

    "charts.balance.title": "{account} - Balance Over Time",
    
    "nav.documents": "Documents & Assets",
    
    "dashboard.docs.title": "Documents Vault",
    
    "dashboard.docs.desc":
      "Keep insurance, land deeds, gold/jewelry, and other key records in one place.",

    "dashboard.docs.cta": "Open Documents",

    "charts.balance.empty": "No data available for this account",

    "charts.common.axis.date": "Date",
    
    "charts.common.axis.amount": "Amount",
    
    "charts.common.axis.balance": "Balance",
    
    "charts.common.tooltip.amount": "Amount",
    
    "charts.common.tooltip.balance": "Balance",

    "documents.title": "Documents & Assets Register",

    "documents.subtitle":
      "Track insurance coverage, property deeds, and valuables. Stored locally in your browser.",

    "documents.summary.title": "Overview",

    "documents.summary.medical": "Total medical coverage",

    "documents.summary.death": "Total death benefit",

    "documents.summary.value": "Total estimated value",

    "documents.add": "Add item",

    "documents.edit": "Edit",

    "documents.delete": "Delete",

    "documents.deleteConfirm": "Delete this item?",

    "documents.form.category": "Category",

    "documents.form.title": "Title",

    "documents.form.provider": "Provider / Issuer",

    "documents.form.referenceNo": "Reference No.",

    "documents.form.location": "Location / Where kept",

    "documents.form.medicalCoverage": "Medical coverage",

    "documents.form.deathBenefit": "Death benefit",

    "documents.form.areaSqm": "Area (sqm)",

    "documents.form.quantity": "Quantity",

    "documents.form.estimatedValue": "Estimated value",

    "documents.form.notes": "Notes",

    "documents.form.save": "Save",

    "documents.form.cancel": "Cancel",

    "documents.category.insurance": "Insurance",

    "documents.category.property": "Property / Deed",

    "documents.category.valuables": "Valuables",

    "documents.category.other": "Other",

    "documents.empty": "No items yet. Add your first one above.",
    
    "documents.summary.total": "Total",
    
    "common.exporting": "Exported",
    
    "documents.updated": "Updated",
    
    "dashboard.docs.total": "Total",
    
    "dashboard.docs.insurance": "Insurance",
    
    "dashboard.docs.property": "Property",
    
    "dashboard.docs.valuables": "Valuables",
    
    "dashboard.docs.other": "Other",
  },
  th: {
    "app.title.full": "FinTrack Lite",
    
    "app.title.short": "FinTrack",

    "common.loading": "กำลังโหลด...",

    "common.waitAuth": "โปรดรอสักครู่ขณะกำลังยืนยันตัวตน",

    "common.waitData": "โปรดรอสักครู่ขณะกำลังโหลดข้อมูลการเงินของคุณ",

    "nav.privacy": "นโยบายความเป็นส่วนตัว",

    "nav.signedInAs": "เข้าสู่ระบบด้วย",

    "nav.openMenu": "เปิดเมนูหลัก",
    
    "nav.menu": "เมนู",
    
    "nav.language": "ภาษา",

    "auth.login": "เข้าสู่ระบบ",

    "auth.logout": "ออกจากระบบ",

    "auth.loggedInUser": "ผู้ใช้ที่เข้าสู่ระบบ",

    "login.title": "ยินดีต้อนรับ",

    "login.subtitle": "กรุณาเข้าสู่ระบบเพื่อใช้งานต่อ",

    "login.cta": "เข้าสู่ระบบเพื่อเริ่มต้น",

    "disclaimer.title": "นโยบายความเป็นส่วนตัวและข้อจำกัดความรับผิด",

    "disclaimer.banner.title": "ข้อมูลของคุณเป็นส่วนตัว",

    "disclaimer.banner.body":
      "ข้อมูลการเงินของคุณจะไม่ถูกขายหรือแชร์ คุณสามารถเลือกเก็บข้อมูลไว้ในเครื่องเท่านั้น หรือเปิดซิงก์ผ่านคลาวด์เพื่อความสะดวก",

    "disclaimer.local.title": "เก็บข้อมูลในเครื่องเป็นค่าเริ่มต้น",

    "disclaimer.local.body":
      "โดยค่าเริ่มต้น ข้อมูลจะถูกเก็บไว้ในเบราว์เซอร์บนอุปกรณ์นี้",

    "disclaimer.cloud.title": "ซิงก์ผ่านคลาวด์ (ตัวเลือก)",

    "disclaimer.cloud.body":
      "หากเปิดใช้งานการซิงก์ ข้อมูลจะถูกจัดเก็บและซิงก์ข้ามอุปกรณ์ผ่านบัญชีของคุณ",

    "disclaimer.note.title": "ข้อควรทราบ",

    "disclaimer.note.body":
      "แอปนี้ใช้เพื่อบันทึกส่วนบุคคลเท่านั้น ไม่ใช่คำแนะนำทางการเงิน โปรดตรวจสอบตัวเลขสำคัญด้วยตนเอง",

    "disclaimer.back": "ย้อนกลับ",
    
    "nav.dashboard": "ภาพรวม",
    
    "nav.addAccount": "เพิ่มบัญชี",
    
    "nav.transactions": "รายการ",
    
    "nav.historical": "สถิติ",
    
    "nav.settings": "ตั้งค่า",

    "dashboard.title": "ภาพรวม",
    
    "dashboard.netWorth": "ทรัพย์สินสุทธิ",
    
    "dashboard.assets": "ทรัพย์สิน",
    
    "dashboard.liabilities": "หนี้สิน",
    
    "dashboard.accounts": "บัญชี",
    
    "dashboard.noAccounts": "ยังไม่มีบัญชี เริ่มต้นด้วยการเพิ่มบัญชีแรกของคุณ",
    
    "balanceSheet.totalAssets": "ทรัพย์สินรวม",
    
    "balanceSheet.totalLiabilities": "หนี้สินรวม",
    
    "balanceSheet.note":
      "หมายเหตุ: หนี้สินแสดงยอดหนี้คงค้าง (เป็นบวก) และทรัพย์สินสุทธิ = ทรัพย์สิน − หนี้สิน",

    "balanceSheet.title": "สรุปฐานะการเงินส่วนบุคคล",
    
    "balanceSheet.asOf": "ณ วันที่",

    "accounts.add.title": "เพิ่มบัญชี",
    
    "accounts.add.subtitle": "สร้างบัญชีใหม่เพื่อใช้ติดตามในสรุปฐานะการเงิน",
    
    "accounts.name": "ชื่อบัญชี",
    
    "accounts.type": "ประเภทบัญชี",
    
    "accounts.asset": "ทรัพย์สิน",
    
    "accounts.liability": "หนี้สิน",
    
    "accounts.type.asset": "ทรัพย์สิน (เงินสด/เงินออม)",
    
    "accounts.type.liability": "หนี้สิน",
    
    "accounts.category": "หมวดหมู่",
    
    "accounts.placeholder": "เช่น บัญชีธนาคาร, บัตรเครดิต, ฯลฯ",
    
    "accounts.currency": "สกุลเงิน",
    
    "accounts.create": "สร้างบัญชี",
    
    "accounts.cancel": "ยกเลิก",

    "tx.title": "รายการธุรกรรม",
    
    "tx.add": "เพิ่มรายการ",
    
    "tx.date": "วันที่",
    
    "tx.type": "ประเภท",
    
    "tx.type.income": "รายรับ",
    
    "tx.type.expense": "รายจ่าย",
    
    "tx.type.transfer": "โอนย้าย",
    
    "tx.amount": "จำนวนเงิน",
    
    "tx.from": "จาก",
    
    "tx.to": "ไปยัง",
    
    "tx.toAccount": "บัญชีปลายทาง",
    
    "tx.fromAccount": "บัญชีต้นทาง",
    
    "tx.category": "หมวดหมู่",
    
    "tx.note": "โน้ต",
    
    "tx.save": "บันทึก",
    
    "tx.recent": "รายการล่าสุด",
    
    "tx.category.placeholder.income": "เงินเดือน, โบนัส, ดอกเบี้ย...",
    
    "tx.category.placeholder.expense": "อาหาร, ค่าเช่า, ค่าน้ำไฟ...",
    
    "tx.category.placeholder.transfer": "โอนย้าย, ย้ายเงินออม...",
    
    "tx.note.placeholder": "รายละเอียด / หมายเหตุ...",
    
    "common.unknown": "ไม่ทราบ",
    
    "common.optional": "(ไม่บังคับ)",
    
    "tx.delete": "ลบ",
    
    "tx.deleteConfirm": "ยืนยันลบรายการนี้? ยอดคงเหลือจะเปลี่ยนตาม",
    
    "tx.deleteTitle": "ลบรายการ",
    
    "settings.title": "ตั้งค่า",
    
    "settings.language": "ภาษา",
    
    "settings.language.en": "English",
    
    "settings.language.th": "ไทย",
    
    "settings.data": "ข้อมูล",
    
    "settings.dismiss": "ปิด",
    
    "settings.currencyPrefs.title": "🌍 ตั้งค่าสกุลเงิน",
    
    "settings.currencyPrefs.desc":
      "เลือกสกุลเงินที่ต้องการใช้แสดงผล ระบบจะอัปเดตตารางและกราฟทั้งหมดตามสกุลเงินนี้",
    
    "settings.currencyPrefs.currently": "กำลังใช้:",
    
    "settings.dataOverview.title": "📊 สรุปข้อมูล",
    
    "settings.dataOverview.accounts": "บัญชี",
    
    "settings.dataOverview.transactions": "รายการ",
    
    "settings.dataOverview.total": "จำนวนข้อมูลทั้งหมด",
    
    "settings.cloudSync.title": "☁️ ตั้งค่าซิงก์คลาวด์",
    
    "settings.cloudSync.desc":
      "เปิดหรือปิดการซิงก์ข้อมูลการเงินขึ้นคลาวด์ (ถ้าเปิด ข้อมูลจะถูกสำรองและซิงก์ข้ามอุปกรณ์อย่างปลอดภัย)",

    "settings.export.title": "📤 ส่งออกข้อมูล",
    
    "settings.export.desc":
      "ดาวน์โหลดไฟล์สำรองข้อมูลทั้งหมดในรูปแบบ JSON (บัญชี รายการ และตั้งค่าต่าง ๆ)",

    "settings.import.title": "📥 นำเข้าข้อมูล",
    
    "settings.import.desc": "กู้คืนข้อมูลจากไฟล์สำรอง JSON ที่เคยส่งออกไว้",
    
    "settings.import.selectFile": "เลือกไฟล์สำรอง:",
    
    "settings.import.selectedFile": "ไฟล์ที่เลือก:",
    
    "settings.import.replaceNote":
      "นำเข้าข้อมูลจากไฟล์สำรอง (จะทับข้อมูลปัจจุบันทั้งหมดบนอุปกรณ์นี้)",

    "settings.delete.title": "🗑️ ลบข้อมูลทั้งหมด",

    "settings.delete.desc":
      "ลบข้อมูลในเครื่องนี้ทั้งหมด (บัญชีและรายการ) แบบถาวร",

    "settings.delete.confirm":
      "ยืนยันลบข้อมูลทั้งหมด? การกระทำนี้ย้อนกลับไม่ได้",

    "settings.delete.breakdown.accounts": "บัญชี",
    
    "settings.delete.breakdown.transactions": "รายการ",
    
    "settings.delete.breakdown.historical": "ข้อมูลสถิติย้อนหลังทั้งหมด",
    
    "settings.delete.confirmYes": "ยืนยันลบทั้งหมด",
    
    "settings.delete.confirmNo": "ยกเลิก",
    
    "settings.export": "ส่งออกข้อมูล",
    
    "settings.import": "นำเข้าข้อมูล",
    
    "settings.deleteAll": "ลบข้อมูลทั้งหมด",

    "welcome.title": "ยินดีต้อนรับสู่แอพบันทึกการเงิน!",
    
    "welcome.getStarted": "เริ่มต้น - เพิ่มบัญชี",
    
    "welcome.subtitle":
      "ควบคุมการเงินของคุณด้วยระบบที่เรียบง่าย เป็นส่วนตัว และปลอดภัย โดยข้อมูลทั้งหมดเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น",

    "welcome.privacy.heading": "ส่วนตัว & ปลอดภัย 100%",
    
    "welcome.privacy.body":
      "ข้อมูลการเงินของคุณอยู่บนอุปกรณ์ของคุณเท่านั้น ไม่มีเซิร์ฟเวอร์ ไม่มีบัญชี ไม่มีการแชร์ข้อมูล",

    "welcome.step1.title": "เพิ่มบัญชี",
    
    "welcome.step1.desc": "สร้างบัญชีสำหรับทรัพย์สินและหนี้สินของคุณ",
    
    "welcome.step1.cta": "เพิ่มบัญชีแรกของคุณ",
    
    "welcome.step2.title": "เพิ่มรายการ",
    
    "welcome.step2.desc":
      "บันทึกรายรับ รายจ่าย และการโอน เพื่อคำนวณยอดอัตโนมัติ",

    "welcome.step2.cta": "เพิ่มรายการ",
    
    "welcome.step3.title": "ติดตามความคืบหน้า",
    
    "welcome.step3.desc": "ดูกราฟและติดตามทรัพย์สินสุทธิตามเวลา",
    
    "welcome.step3.cta": "ดูสถิติ",
    
    "welcome.features.title": "✨ ฟีเจอร์หลัก",
    
    "welcome.features.f1": "ดูงบดุลแบบครบถ้วน",
    
    "welcome.features.f2": "ติดตามความคืบหน้าแบบย้อนหลัง",
    
    "welcome.features.f3": "รองรับหลายหมวดบัญชี",
    
    "welcome.features.f4": "ความเป็นส่วนตัวและความปลอดภัยเต็มรูปแบบ",
    
    "welcome.features.f5": "ส่งออก/นำเข้าข้อมูลได้ง่าย",
    
    "welcome.features.f6": "รองรับการใช้งานบนมือถือ",
    
    "welcome.notice.title": "สำคัญ:",
    
    "welcome.notice.body":
      "ข้อมูลทั้งหมดถูกเก็บไว้ในเบราว์เซอร์นี้เท่านั้น ควรส่งออกข้อมูลเป็นประจำจากหน้า “ตั้งค่า” เพื่อป้องกันข้อมูลหายหากล้างข้อมูลเบราว์เซอร์",

    "welcome.privacyInfo": "ข้อมูลความเป็นส่วนตัว",

    "balanceSheet.loadingTitle": "สรุปฐานะการเงินส่วนบุคคล",
    
    "balanceSheet.loadingSubtitle": "กำลังโหลดข้อมูลการเงินของคุณ...",
    
    "balanceSheet.editAccount": "แก้ไขบัญชี",
    
    "balanceSheet.edit": "แก้ไข",
    
    "balanceSheet.deleteAccount": "ลบบัญชี",
    
    "balanceSheet.categoryTotal": "รวมหมวด {category}: {amount}",
    
    "balanceSheet.totalSection": "รวม {title}: {amount}",

    "historical.title": "สถิติย้อนหลัง",
    
    "historical.subtitle": "ดูแนวโน้มยอดคงเหลือและทรัพย์สินสุทธิตามเวลา",
    
    "historical.loading": "กำลังโหลดข้อมูล...",
    
    "historical.noData.title": "ยังไม่มีข้อมูลธุรกรรม",
    
    "historical.noData.subtitle": "เพิ่มรายการเพื่อดูกราฟและแนวโน้ม",
    
    "historical.selectAccount": "เลือกบัญชี",
    
    "historical.allAccounts": "ภาพรวมทุกบัญชี",
    
    "historical.timePeriod": "ช่วงเวลา",
    
    "historical.range.7d": "7 วันล่าสุด",
    
    "historical.range.30d": "30 วันล่าสุด",
    
    "historical.range.90d": "90 วันล่าสุด",
    
    "historical.range.1y": "1 ปีล่าสุด",
    
    "historical.range.all": "ทั้งหมด",
    
    "historical.summary.title": "สรุปบัญชีรายรายการ",
    
    "historical.points": "จุดข้อมูล",
    
    "historical.card.currentBalance": "ยอดปัจจุบัน",
    
    "historical.card.change": "เปลี่ยนแปลง",
    
    "historical.card.dataPoints": "จำนวนจุดข้อมูล",

    "accountCategory.Savings": "เงินออม",
    
    "accountCategory.Cash and Cash Equivalents":
      "เงินสดและรายการเทียบเท่าเงินสด",

    "accountCategory.Investments": "การลงทุน",
    
    "accountCategory.Real Estate": "อสังหาริมทรัพย์",
    
    "accountCategory.Personal Property": "ทรัพย์สินส่วนบุคคล",
    
    "accountCategory.Other Assets": "ทรัพย์สินอื่น ๆ",
    
    "accountCategory.Credit Cards": "บัตรเครดิต",
    
    "accountCategory.Loans": "เงินกู้",
    
    "accountCategory.Mortgages": "สินเชื่อที่อยู่อาศัย",
    
    "accountCategory.Other Liabilities": "หนี้สินอื่น ๆ",
    
    "tx.helper.body":
      "บันทึกรายรับ รายจ่าย และการโอน ยอดเงินออมและหนี้จะอัปเดตอัตโนมัติ",

    "tx.helper.tip":
      "ทิป: จ่ายบัตรเครดิต = โอน (ธนาคาร → บัตรเครดิต) / รูดบัตร = รายจ่ายจากบัตรเครดิต",

    "tx.noAccounts.title": "ยังไม่มีบัญชี",
    
    "tx.noAccounts.subtitle":
      "เพิ่มบัญชีก่อน (เช่น เงินออม/ธนาคาร/บัตรเครดิต) แล้วค่อยบันทึกรายการ",

    "tx.expense.liabilityHint":
      "ถ้าเลือกบัญชีหนี้สิน (บัตรเครดิต) ยอดหนี้จะเพิ่มขึ้น",

    "tx.transfer.debtHint": "ชำระหนี้: ธนาคาร → บัตรเครดิต (ยอดหนี้ลดลง)",
    
    "tx.totalCount": "ทั้งหมด {count} รายการ",
    
    "tx.noTxYet": "ยังไม่มีรายการ",
    
    "tx.recent.title.income": "รายรับ → {to}",
    
    "tx.recent.title.expense": "รายจ่าย ← {from}",
    
    "tx.recent.title.transfer": "โอน {from} → {to}",
    
    "tx.defaultCategory.income": "รายรับ",
    
    "tx.defaultCategory.expense": "รายจ่าย",
    
    "tx.defaultCategory.transfer": "โอนย้าย",
    
    "charts.netWorth.title": "ทรัพย์สินสุทธิย้อนหลัง",
    
    "charts.netWorth.empty": "ยังไม่มีข้อมูลสำหรับติดตามทรัพย์สินสุทธิ",
    
    "charts.netWorth.series.assets": "ทรัพย์สิน",
    
    "charts.netWorth.series.liabilities": "หนี้สิน",
    
    "charts.netWorth.series.netWorth": "ทรัพย์สินสุทธิ",
    
    "charts.netWorth.card.current": "ทรัพย์สินสุทธิปัจจุบัน",
    
    "charts.netWorth.card.assets": "ทรัพย์สินรวม",
    
    "charts.netWorth.card.liabilities": "หนี้สินรวม",
    
    "charts.netWorth.card.change": "การเปลี่ยนแปลง",

    "charts.balance.title": "{account} - ยอดย้อนหลัง",
    
    "nav.documents": "เอกสาร/ทรัพย์สินสำคัญ",
    
    "charts.balance.empty": "ยังไม่มีข้อมูลสำหรับบัญชีนี้",

    "charts.common.axis.date": "วันที่",
    
    "charts.common.axis.amount": "จำนวนเงิน",
    
    "charts.common.axis.balance": "ยอดคงเหลือ",
    
    "charts.common.tooltip.amount": "จำนวนเงิน",
    
    "charts.common.tooltip.balance": "ยอดคงเหลือ",

    "documents.title": "ทะเบียนเอกสาร/ทรัพย์สินสำคัญ",

    "documents.subtitle":
      "บันทึกข้อมูลประกันชีวิต โฉนดที่ดิน และของมีค่า ข้อมูลเก็บไว้ในเครื่องของคุณ (LocalStorage)",

    "documents.summary.title": "ภาพรวม",

    "documents.summary.medical": "วงเงินค่ารักษารวม",

    "documents.summary.death": "วงเงินเสียชีวิตรวม",

    "documents.summary.value": "มูลค่าประเมินรวม",

    "documents.add": "เพิ่มรายการ",

    "documents.edit": "แก้ไข",

    "documents.delete": "ลบ",

    "documents.deleteConfirm": "ต้องการลบรายการนี้ใช่ไหม?",

    "documents.form.category": "หมวดหมู่",

    "documents.form.title": "ชื่อรายการ",

    "documents.form.provider": "บริษัท/หน่วยงานผู้ออก",

    "documents.form.referenceNo": "เลขอ้างอิง",

    "documents.form.location": "เก็บไว้ที่ไหน/ที่ตั้ง",

    "documents.form.medicalCoverage": "วงเงินค่ารักษา",

    "documents.form.deathBenefit": "วงเงินเสียชีวิต",

    "documents.form.areaSqm": "พื้นที่ (ตร.ม.)",

    "documents.form.quantity": "จำนวน",

    "documents.form.estimatedValue": "มูลค่าประเมิน",

    "documents.form.notes": "หมายเหตุ",

    "documents.form.save": "บันทึก",

    "documents.form.cancel": "ยกเลิก",

    "documents.category.insurance": "ประกัน",

    "documents.category.property": "ที่ดิน/โฉนด",

    "documents.category.valuables": "ของมีค่า",

    "documents.category.other": "อื่นๆ",

    "documents.empty": "ยังไม่มีรายการ ลองเพิ่มรายการแรกด้านบนได้เลย",
    
    "common.exportPdf": "ส่งออกเป็น PDF",
    
    "documents.summary.total": "รวม",
    
    "common.exporting": "ส่งออกสำเร็จ",
    
    "documents.updated": "อัปเดต",
    
    "dashboard.docs.title": "เอกสาร/ทรัพย์สินสำคัญ",
    
    "dashboard.docs.desc":
      "เก็บประกัน โฉนดที่ดิน ทองคำ/เครื่องประดับ และเอกสารสำคัญอื่นๆ ไว้ในที่เดียว",

    "dashboard.docs.total": "มูลค่ารวม",
    
    "dashboard.docs.cta": "เปิดดูเอกสาร", 
    
    "dashboard.docs.insurance": "ประกันทั้งหมด",
    
    "dashboard.docs.property": "ที่ดิน/โฉนดทั้งหมด",
    
    "dashboard.docs.valuables": "ของมีค่าทั้งหมด", 
    
    "dashboard.docs.other": "รายการอื่นๆ ทั้งหมด",
  },
};
