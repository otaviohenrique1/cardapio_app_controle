import { Container } from "reactstrap";
import { Flex } from "../components/Containers/Flex";
import { Titulo } from "../components/Titulo";

export function Pagina404() {
  return (
    <Container>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        className="m-5"
      >
        <Titulo
          tag="h1"
          className="fw-bold"
        >Erro 404</Titulo>
        <Titulo
          tag="h2"
          className="fw-light"
        >Pagina não encontrada</Titulo>
      </Flex>
    </Container>
  );
}