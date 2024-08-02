import * as React from 'react'
import { Card, CardTitle, CardHeader, CardFooter, CardContent } from './card'
import { cn } from 'src/app/(app)/lib/utils'

type Args = {
  className?: string
  title: string
  description: string
  testCount: number
  questionsCount: number
}
export const TestCard = ({ className, ...props }: Args) => (
  <Card className={cn(className, 'border border-border/45')}>
    <CardHeader className="!p-4">
      <CardTitle>{props.title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 grid gap-2">
      <div className="">
        <span className="text-balance text-sm font-nromal tracking-normal leading-3">
          {props.description}
        </span>
      </div>
      <CardFooter className="flex w-full items-center justify-between p-0">
        <span className="font-bold text-sm p-0 text-left">
          {props.testCount} tests | {props.questionsCount} questions
        </span>
        {/* /// Star rating placeholder */}
      </CardFooter>
    </CardContent>
  </Card>
)
