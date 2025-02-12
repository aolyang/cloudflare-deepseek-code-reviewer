import Cloudflare from "cloudflare"

const cloudflare = new Cloudflare({
  apiEmail: process.env.CLOUDFLARE_EMAIL,
  apiKey: process.env.CLOUDFLARE_API_KEY
})

export default cloudflare
