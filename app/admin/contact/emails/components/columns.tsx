import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { Email } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Email, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  email: Email;
  columnKey: keyof Email | "actions";
  onOpenModal: (email: Email) => void;
  onOpenDeleteModal: (email: Email) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "email",
    label: "Email",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  email,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    email[columnKey as keyof Omit<Email, "createdAt" | "updatedAt">];
  switch (columnKey) {
    case "email":
      return <div>{cellValue}</div>;

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
                <DropdownItem onClick={() => onOpenModal(email)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    router.push(`${adminPaths.emails}/${email.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(email);
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
