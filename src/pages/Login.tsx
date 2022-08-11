import { useNavigate } from "react-router-dom";
import { Row, ButtonGroup, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { Form, Formik } from "formik";
import { Titulo } from "../components/Titulo";
import { CampoInput, CampoInputProps } from "../components/Campos/CampoInput";
import { ModalErroCadastro } from "../components/Modals";
import { ApiBuscaLoginAdministrador } from "../utils/api";
import { FormatadorCrypto } from "../utils/utils";
import { dadosIniciaisFormularioLogin } from "../utils/constantes";
import { schemaValidacaoFormularioLogin } from "../utils/ValidacaoSchemas";
import { Flex } from "../components/Containers/Flex";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaGoogle, FaApple } from "react-icons/fa";

export function Login() {
  let navigate = useNavigate();

  async function onSubmit(values: LoginTypes) {
    const { email, senha } = values;
    const senha_formatada = FormatadorCrypto.mensagemSHA512(senha);

    const data = {
      email,
      senha: senha_formatada
    };
    const auth = {
      username: email,
      password: senha_formatada
    };

    const data_login = { data, auth };
    // await api.post('administrador/login', data, { auth })
    await ApiBuscaLoginAdministrador(data_login)
      .then((data) => {
        const { id, nome } = data.data.data_user;
        sessionStorage.setItem('id', String(id));
        sessionStorage.setItem('nome', String(nome));
        navigate('/home');
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      height={"100%"}
    >
      <Formik
        initialValues={dadosIniciaisFormularioLogin}
        onSubmit={onSubmit}
        validationSchema={schemaValidacaoFormularioLogin}
      >
        {(formik_props) => {
          const { errors, touched, values } = formik_props;

          const lista_campos_dados: CampoInputProps[] = [
            {
              md: 12, type: "text", id: "email", name: "email",
              label: "E-mail", placeholder: "Digite o seu e-mail",
              value: values.email, error: errors.email, touched: touched.email
            },
            {
              md: 12, type: "password", id: "senha", name: "senha", label: "Senha",
              placeholder: "Digite a sua senha", value: values.senha,
              error: errors.senha, touched: touched.senha
            }
          ];

          return (
            <FormContainer className="d-flex flex-column">
              <Card>
                <CardHeader>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                  >
                    <Titulo tag="h1">Login</Titulo>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Row>
                    {lista_campos_dados.map((item, index) => {
                      const { md, id, label, name, type, placeholder, value, error, touched } = item;
                      return (
                        <CampoInput
                          key={index}
                          md={md}
                          id={id}
                          label={label}
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          value={value}
                          error={error}
                          touched={touched}
                        />
                      );
                    })}
                  </Row>
                </CardBody>
                <CardFooter>
                  <Flex
                    width="100%"
                    justifyContent="center"
                  >
                    <ButtonGroup>
                      <Button color="primary" type="submit">Entrar</Button>
                      <Button color="danger" type="reset">Limpar</Button>
                      <Link
                        className="btn btn-success"
                        to="/administrador/cadastro"
                      >Novo usuario</Link>
                    </ButtonGroup>
                  </Flex>
                </CardFooter>
              </Card>
            </FormContainer>
          );
        }}
      </Formik>
    </Flex>
  );
}

const FormContainer = styled(Form)`
  width: 100%;
  max-width: 400px;
`;
