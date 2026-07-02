import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "./IconButton";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3">
      <IconButton
        icon={ChevronLeft}
        label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      />
      <span className="text-text-secondary min-w-24 text-center text-sm">
        {page} / {totalPages}
      </span>
      <IconButton
        icon={ChevronRight}
        label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </nav>
  );
}
