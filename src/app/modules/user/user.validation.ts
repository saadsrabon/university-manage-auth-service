import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
})

export const UserValidationSchema = {
  createUserZodSchema,
}
