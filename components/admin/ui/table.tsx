"use client";

import { SearchIcon } from "@/components/icons/search";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Image,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";

interface Column<TData> {
  key: keyof Omit<TData, "id"> | "actions";
  label: string;
}

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  renderCell: (item: TData, columnKey: Column<TData>["key"]) => React.ReactNode;
  searchKey: keyof TData;
}
export default function DataTable<TData>({
  columns,
  data,
  renderCell,
  searchKey,
}: DataTableProps<TData>) {
  const [page, setPage] = useState<number>(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 10;

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((data) =>
        String(data[searchKey])
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    return filteredData;
  }, [data, filterValue, searchKey]);

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <>
      <Table
        autoFocus={false}
        aria-label="Table to display data"
        isStriped
        topContent={
          <Input
            isClearable
            className="w-full sm:max-w-[30%]"
            placeholder={`Search by ${String(searchKey && searchKey)}...`}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        }
        bottomContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page: number) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key as string}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={
            <div className="flex h-full flex-col items-center justify-center">
              <p>No data found :(</p>
              <Image
                src={"/illustrations/blank.svg"}
                alt="No data"
                className="max-w-40"
              />
            </div>
          }
        >
          {(item) => (
            <TableRow key={String((item as any).id)}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as Column<TData>["key"])}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
