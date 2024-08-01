import { Main, Section, Container } from '@/app/(app)/components/craft'
import { Card, CardTitle, CardHeader, CardContent } from '@/app/(app)/components/ui/card'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/app/(app)/components/ui/table'
import { TestCard } from '../../components/ui/test-card'

export default function Overview() {
  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-xl">Overview</h1>
        </div>
        <Container className="!p-0 grid grid-cols-4 gap-2 w-full flex-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total test taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">36</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average test score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">36</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last test score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">09</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        </Container>
      </Section>
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-xl">Recent activity</h1>
        </div>
        <Container className="!p-0 grid w-full flex-1">
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
        </Container>
      </Section>
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-xl">Take Mock Test</h1>
        </div>
        <Container className="!p-0 grid grid-cols-3 gap-2 w-full flex-1">
          <TestCard
            title="All Mighty Test"
            description="Numerical reasoning tests demonstrate your ability to deal with numbers quickly and accurately. These tests contain questions that..."
            testCount={50}
            questionsCount={520}
          />
          <TestCard
            title="All Mighty Test"
            description="Numerical reasoning tests demonstrate your ability to deal with numbers quickly and accurately. These tests contain questions that..."
            testCount={50}
            questionsCount={520}
          />
          <TestCard
            title="All Mighty Test"
            description="Numerical reasoning tests demonstrate your ability to deal with numbers quickly and accurately. These tests contain questions that..."
            testCount={50}
            questionsCount={520}
          />
        </Container>
      </Section>
    </Main>
  )
}
