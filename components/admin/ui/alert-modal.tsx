import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

type AlertModalProps = {
  title: string;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
  id?: string;
};

export default function AlertModal({
  title,
  onClose,
  onDelete,
  loading,
  id,
}: AlertModalProps) {
  const { isOpen } = useDisclosure({ defaultOpen: true });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => !isOpen && onClose()}
        backdrop="opaque"
        hideCloseButton
        classNames={{
          backdrop:
            "bg-gradient-to-t from-primary/50 via-primary/10 to-primary/10 backdrop-blur-md",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-start gap-1">
                <AlertTriangle className="size-5 text-danger" />
                {title}
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-1 justify-start">
                  <p>This action cannot be undone. Are you sure?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Close</Button>
                <Button
                  color="danger"
                  variant="solid"
                  isLoading={loading}
                  onClick={async () => {
                    if (id) {
                      await onDelete(id);
                    }
                    onClose();
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
