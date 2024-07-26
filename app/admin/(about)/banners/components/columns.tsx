import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";

import { Banner } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Banner, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  banner: Banner & {
    product: {
      id: string;
      title: string;
    } | null;
  };
  columnKey: string;
  onOpenModal: (banner: Banner) => void;
  onOpenDeleteModal: (banner: Banner) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "image",
    label: "Banner Image",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  banner,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    banner[columnKey as keyof Omit<Banner, "createdAt" | "updatedAt">];
  switch (columnKey) {
    case "image":
      return (
        <Avatar
          src={banner.image}
          fallback
          radius="md"
          isBordered
          isFocusable={false}
        />
      );

    case "title":
      return <div>{banner && cellValue}</div>;

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
                <DropdownItem onClick={() => onOpenModal(banner)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    router.push(`${adminPaths.banners}/${banner.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(banner);
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
