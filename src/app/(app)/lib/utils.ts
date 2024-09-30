import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseIds = {
  nnpcl: 'app9KtovkKWlaiyhU',
  cnc: 'appOaHvsdcbhnqjqm',
  custom: 'apptppBpE0rStopjr',
}
