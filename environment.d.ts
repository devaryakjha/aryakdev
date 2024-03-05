// // custom process.env variables
namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    VERCEL_ENV?: "preview" | "production" | "development";
  }
}
