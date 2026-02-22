import "dotenv/config";  //لتحميل  environmental variables  من ملف .env  
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  /* engine: "classic", */
  datasource: {
    url: env("DATABASE_URL"),
  },
});
