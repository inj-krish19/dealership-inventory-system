import { z } from 'zod';

const idParamSchema = z.string().min(1);

export function parseIdParam(param: string | string[] | undefined): string {
  const parsed = idParamSchema.safeParse(param);
  if (!parsed.success) {
    throw new Error('Invalid or missing id parameter');
  }
  return parsed.data;
}