import * as React from 'react'
import { Card, CardTitle, CardHeader, CardFooter, CardContent } from './card'
import { cn } from '@app/lib/utils'

const Star = ({ className }: { className: string }) => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      d="M8.00491 0.644873C8.30354 -0.00255264 9.2237 -0.00255484 9.52232 0.644871L11.3965 4.70812C11.5182 4.97199 11.7683 5.15367 12.0569 5.18788L16.5004 5.71473C17.2084 5.79868 17.4928 6.6738 16.9693 7.15788L13.6841 10.196C13.4707 10.3932 13.3752 10.6872 13.4319 10.9722L14.3039 15.3611C14.4429 16.0604 13.6984 16.6012 13.0763 16.253L9.17173 14.0674C8.91817 13.9255 8.60907 13.9255 8.35551 14.0674L4.45094 16.253C3.8288 16.6012 3.08437 16.0604 3.22332 15.3611L4.09539 10.9722C4.15202 10.6872 4.0565 10.3932 3.84316 10.196L0.557941 7.15788C0.0344843 6.6738 0.318826 5.79868 1.02685 5.71473L5.47039 5.18788C5.75895 5.15367 6.00901 4.97199 6.13072 4.70812L8.00491 0.644873Z"
      fill="#FFC500"
    />
  </svg>
)

type Args = {
  className?: string
  title: string
  description: string
  testCount: number
  questionsCount: number
}
export const TestCard = ({ className, ...props }: Args) => (
  <Card className={cn(className, 'border border-border/45')}>
    <CardHeader className="!px-4">
      <CardTitle className="font-bold text-lg">{props.title}</CardTitle>
    </CardHeader>
    <CardContent className="px-4 grid gap-2">
      <div className="">
        <span className="text-balance text-sm font-nromal tracking-normal leading-3">
          {props.description}
        </span>
      </div>
    </CardContent>
    <CardFooter className="flex w-full items-center justify-between px-4">
      <span className="font-bold text-sm p-0 text-left">
        {props.testCount} tests | {props.questionsCount} questions
      </span>
      {/* /// Star rating placeholder */}
      <div className="space-x-1 flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="text-yellow-400" />
        ))}
      </div>
    </CardFooter>
  </Card>
)
