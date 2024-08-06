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

import { Testimonial } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Testimonial, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  testimonial: Testimonial;
  columnKey: keyof Testimonial | "actions";
  onOpenModal: (testimonial: Testimonial) => void;
  onOpenDeleteModal: (testimonial: Testimonial) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "image",
    label: "Customer",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "rating",
    label: "Rating",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  testimonial,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    testimonial[
      columnKey as keyof Omit<Testimonial, "createdAt" | "updatedAt">
    ];
  switch (columnKey) {
    case "image":
      return (
        <Avatar
          src={testimonial.image}
          fallback
          radius="md"
          isBordered
          isFocusable={false}
        />
      );
    case "name":
      return (
        <Skeleton isLoaded={!!testimonial} className="rounded-md">
          <div>{testimonial && cellValue}</div>
        </Skeleton>
      );
    case "description":
      return (
        <Skeleton isLoaded={!!testimonial} className="rounded-md">
          <div className="line-clamp-2">{testimonial && cellValue}</div>
        </Skeleton>
      );
    case "rating":
      return (
        <Chip
          color={Number(cellValue) >= 3 ? "success" : "danger"}
          variant="flat"
          size="sm"
        >
          {cellValue} / 5
        </Chip>
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
                <DropdownItem onClick={() => onOpenModal(testimonial)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    router.push(`${adminPaths.testimonials}/${testimonial.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(testimonial);
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
