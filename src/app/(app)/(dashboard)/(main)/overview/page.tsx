import { Main, Section, Container } from '@/app/(app)/components/craft'
import { PerformanceChart } from '@app/components/performance-area-chart'
import { Card, CardTitle, CardHeader, CardContent } from '@/app/(app)/components/ui/card'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/app/(app)/components/ui/table'
import { TestCard } from '@app/components/ui/test-card'
import Link from 'next/link'
import { Button } from '@/app/(app)/components/ui/button'

export default function Overview() {
  return (
    <Main className="flex flex-1 flex-col gap-8 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-xl">Overview</h1>
        </div>
        <Container className="!p-0 !mx-0 !max-w-full grid grid-cols-4 gap-2 w-full flex-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total test taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average test score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last test score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        </Container>
      </Section>
      {/*<Section className="!p-0 grid gap-2">
        <Container className="!p-0 !mx-0 !max-w-full col-span-3">
          <PerformanceChart />
        </Container>
      </Section>*/}
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-xl">Recent activity</h1>
          <Link href={'/test/mock-test'} passHref>
            <Button>Take Mock Test</Button>
          </Link>
        </div>

        <h1 className="text-balance text-center text-lg font-semibold">No data yet</h1>
        {/*<Container className="!p-0 !mx-0 !max-w-full grid w-full flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead className="">User Average</TableHead>
                <TableHead className="">Your score</TableHead>
                <TableHead className="">Accuracy</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Verbal Reasoning test</div>
                </TableCell>
                <TableCell className="">73%</TableCell>
                <TableCell className="">43%</TableCell>
                <TableCell className="">32%</TableCell>
                <TableCell className="text-right">2023-06-23</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Verbal Reasoning test</div>
                </TableCell>
                <TableCell className="">73%</TableCell>
                <TableCell className="">43%</TableCell>
                <TableCell className="">32%</TableCell>
                <TableCell className="text-right">2023-06-23</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Verbal Reasoning test</div>
                </TableCell>
                <TableCell className="">73%</TableCell>
                <TableCell className="">43%</TableCell>
                <TableCell className="">32%</TableCell>
                <TableCell className="text-right">2023-06-23</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Verbal Reasoning test</div>
                </TableCell>
                <TableCell className="">73%</TableCell>
                <TableCell className="">43%</TableCell>
                <TableCell className="">32%</TableCell>
                <TableCell className="text-right">2023-06-23</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Container>*/}
      </Section>
    </Main>
  )
}
