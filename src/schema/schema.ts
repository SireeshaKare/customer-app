import * as z from 'zod';

export const customerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(12, 'Password must be at most 12 characters'),
});

export const employeeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email format'),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
export type EmployeeFormData = z.infer<typeof employeeSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;