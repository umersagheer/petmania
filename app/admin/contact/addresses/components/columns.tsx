import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";

import { Address } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Address, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  address: Address;
  columnKey: keyof Address | "actions";
  onOpenModal: (address: Address) => void;
  onOpenDeleteModal: (address: Address) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "address",
    label: "Address",
  },
  {
    key: "addressLink",
    label: "Url",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  address,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    address[columnKey as keyof Omit<Address, "createdAt" | "updatedAt">];
  switch (columnKey) {
    case "address":
      return <div className="line-clamp-1 max-w-56">{cellValue}</div>;

    case "addressLink":
      return (
        <Link showAnchorIcon href={cellValue} isExternal>
          <p className="line-clamp-1 max-w-56">{cellValue}</p>
        </Link>
      );

    case "actions":
      return (
        <div>
          <div className="relative flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem onClick={() => onOpenModal(address)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    router.push(`${adminPaths.addresses}/${address.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(address);
                  }}
                >
                  <span>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      );
  }
};
