import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseIds = {
  cnc: 'appOaHvsdcbhnqjqm',
  nnpcl: 'app9KtovkKWlaiyhU',
  custom: 'apptppBpE0rStopjr',
}

export const testTypes = [
  {
    title: 'Chevron Test',
    name: Object.keys(baseIds)[0],
    description: 'Verbal Reasoning, Abstract Reasoning and Numerical Reasoning. 20 questions each.',
    baseId: baseIds['cnc'],
  },
  {
    title: 'NNPCL Test',
    name: Object.keys(baseIds)[1],
    description:
      'English/Verbal Reasoning, Mathematics/Quantitative Reasoning, General Knowledge, Current Affairs.',
    baseId: baseIds['nnpcl'],
  },
  {
    title: 'Custom Test',
    name: Object.keys(baseIds)[2],
    description: 'Select from different sections.',
    baseId: baseIds['custom'],
  },
]
