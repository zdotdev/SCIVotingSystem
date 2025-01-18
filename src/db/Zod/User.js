import { z } from 'zod'

const UserZodSchema = z.object({
  name: z.string().min(3, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      }
    ),
  studentId: z.string().min(1, { message: 'Student ID is required.' }),
  role: z.enum(['newUser', 'student', 'admin']).default('newUser'),
  refreshToken: z.string().min(1, { message: 'Refresh token is required.' })
})

export default UserZodSchema
