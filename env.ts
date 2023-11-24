import z from 'zod'

const envSchema = z.object({
	SUPABASE_URL: z.string(),
	SUPABASE_ANON_KEY: z.string(),
})

export const ENV = envSchema.parse(process.env)