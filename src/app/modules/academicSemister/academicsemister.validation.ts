import { z } from 'zod'

const AcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),

    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.string({
      required_error: 'Code is required',
    }),

    startMonth: z.string({
      required_error: 'StartMonth is required',
    }),
    endMonth: z.string({
      required_error: 'EndMonth is required',
    }),
  }),
})

export const AcademicSemisterValidation = {
  AcademicSemisterZodSchema,
}
