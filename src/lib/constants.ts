export const BASE_URL =
  process.env.VERCEL_ENV === "production"
    ? "https://aryak.dev"
    : process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_URL}`
    : "https://localhost:3000";
