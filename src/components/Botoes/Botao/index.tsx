import { Button, ButtonProps as ButtonPropsReactstrap } from "reactstrap";

type ButtonProps = ButtonPropsReactstrap & {
  color: ButtonColors;
}

export function Botao(props: ButtonProps) {
  return (
    <Button
      {...props}
      color={props.color}
    />
  );
}
