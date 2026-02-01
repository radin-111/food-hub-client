"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination2({ totalPages }: { totalPages: number }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-center space-x-1 mt-4 flex-wrap">
      <Button
        size="sm"
        variant="outline"
        onClick={() => navigateToPage(1)}
        disabled={currentPage === 1}
        className="flex items-center"
      >
        <ChevronsLeft className="w-4 h-4 mr-1" /> First
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Prev
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center"
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => navigateToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center"
      >
        Last <ChevronsRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
