import * as React from 'react'
import { Card, CardTitle, CardHeader, CardFooter, CardContent } from './card'
import { cn } from '@app/lib/utils'
import { Star } from '../star'

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
