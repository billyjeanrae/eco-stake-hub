import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  columns: {
    key: string;
    header: string;
    cell: (row: any) => React.ReactNode;
  }[];
  data: any[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={`${rowIndex}-${column.key}`}>
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};