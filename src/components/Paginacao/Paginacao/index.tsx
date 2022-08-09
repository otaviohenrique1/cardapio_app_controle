import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styled from "styled-components";

interface PaginacaoProps {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
}

export function Paginacao(props: PaginacaoProps) {
  const { gotoPage, nextPage, previousPage, canPreviousPage, canNextPage, pageCount } = props;

  const pagina_anterior = canPreviousPage;
  const proxima_pagina = canNextPage;
  const numero_pagina = pageCount;

  return (
    <PaginationEstilizado>
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => gotoPage(0)}
          disabled={!pagina_anterior}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => previousPage()}
          disabled={!pagina_anterior}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => nextPage()}
          disabled={!proxima_pagina}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => gotoPage(numero_pagina - 1)}
          disabled={!proxima_pagina}
        />
      </PaginationItem>
    </PaginationEstilizado>
  );
}

const PaginationEstilizado = styled(Pagination)`
  ul.pagination {
    margin-bottom: 0 !important;
  }
`;
