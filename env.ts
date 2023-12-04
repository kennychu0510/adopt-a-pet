import z from 'zod'

const envSchema = z.object({
	SUPABASE_URL: z.string(),
	SUPABASE_ANON_KEY: z.string(),
	ADMIN_USERNAME: z.string(),
	ADMIN_PASSWORD: z.string(),
	JWT_SECRET: z.string(),
})

export const ENV = envSchema.parse(process.env)