const fs = require('fs')
fs.writeFileSync('./.env', `NEXT_PUBLIC_GOOGLE_ANALYTICS=${process.env.NEXT_PUBLIC_API_URL}\n`)