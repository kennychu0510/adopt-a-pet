import z from 'zod'
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local'});

const envSchema = z.object({
	SUPABASE_URL: z.string(),
	SUPABASE_ANON_KEY: z.string(),
	ADMIN_USERNAME: z.string(),
	ADMIN_PASSWORD: z.string(),
	JWT_SECRET: z.string(),
})

export const ENV = envSchema.parse(process.env)