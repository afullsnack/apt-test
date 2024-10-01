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

export const testTypes = [
  {
    name: "Chevron Test",
    description: "Verbal Reasoning, Abstract Reasoning and Numerical Reasoning. 20 questions each.",
    baseId: baseIds['cnc']
  },
  {
    name: "NNPCL Test",
    description: "English/Verbal Reasoning, Mathematics/Quantitative Reasoning, General Knowledge, Current Affairs.",
    baseId: baseIds['nnpcl']
  },
  {
    name: "Custom Test",
    description: "Select from different sections.",
    baseId: baseIds['custom']
  }
]
