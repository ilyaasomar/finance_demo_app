import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatter } from "@/lib/utils";

interface TransDataProps {
  transData: any;
}

export function TableData({ transData }: TransDataProps) {
  console.log({ new: transData });
  let totalBalance: number = transData.reduce(
    (accumulator: any, item: any) => accumulator + item.amount,
    0
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Transaction ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Registered Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transData.map((report: any) => (
          <>
            <TableRow key={report.id}>
              <TableCell className="font-medium">
                {report.serialNumber}
              </TableCell>
              <TableCell>{report.category_name}</TableCell>
              <TableCell>{report.account_name}</TableCell>
              <TableCell>{report.description}</TableCell>
              <TableCell>{report.registered_date}</TableCell>
              <TableCell className="text-right">
                {formatter.format(Number(report.amount))}
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold">
            Total
          </TableCell>
          <TableCell className="text-right font-bold">
            {formatter.format(totalBalance)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
