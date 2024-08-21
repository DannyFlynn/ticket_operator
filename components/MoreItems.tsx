"use client";
type MoreItemsProps = {
  takeNum: number;
  skipNum: number;
  setTakeNum: any;
  setSkipNum: any;
  ticketCount: number;
};

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const MoreItems = ({
  takeNum,
  skipNum,
  setTakeNum,
  setSkipNum,
  ticketCount,
}: MoreItemsProps) => {
  const ticketsPerPage = 5;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(ticketCount / ticketsPerPage)
  );

  const [currentPage, setCurrentPage] = useState(1);

  const incrementPage = () => {
    setSkipNum(skipNum + ticketsPerPage);
    setCurrentPage((prev) => prev + 1);
  };

  const decrementPage = () => {
    setSkipNum(skipNum - ticketsPerPage);
    setCurrentPage((prev) => prev - 1);
  };

  const firstPage = () => {
    setSkipNum(0);
    setCurrentPage(1);
  };

  const lastPage = () => {
    const lastPageIndex = (totalPages - 1) * ticketsPerPage;
    setSkipNum(lastPageIndex);
    setCurrentPage(totalPages);
  };

  return (
    <div className="w-full  my-12">
      <Pagination>
        <PaginationContent>
          <div>
            <div>
              <Button onClick={firstPage} className="mx-1">
                <ChevronFirst />
              </Button>
              <Button disabled={currentPage === 1} onClick={decrementPage}
              className="mx-1">
                <ChevronLeft />
              </Button>
              <Button
                disabled={currentPage === totalPages}
                onClick={incrementPage}
                className="mx-1"
              >
                <ChevronRight />
              </Button>
              <Button onClick={lastPage}
              className="mx-1">
                <ChevronLast />
              </Button>
            </div>
            <div>
              <p>
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MoreItems;
