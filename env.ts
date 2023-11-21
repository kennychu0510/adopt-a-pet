import z from 'zod'

const envSchema = z.object({
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
})

export const ENV = envSchema.parse(process.env)