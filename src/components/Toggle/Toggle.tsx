import { ReactElement } from 'react';
import styled from "styled-components";

import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

type ButtonElement = React.MouseEventHandler<HTMLButtonElement>

interface IProps {
  changeTheme: ButtonElement;
  theme: string;
}

const ToggleButton = styled.button`
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.titleColor};
  color: ${props => props.theme.pageBackground};
  &:focus {
    outline: none;
  }
  transition: all .35s ease;
`;

function Toggle(props: IProps): ReactElement {

  const { changeTheme, theme } = props;

  const icon = theme === "light" ? <HiMoon size={22} /> : <CgSun size={20} />;

  return (
    <ToggleButton onClick={changeTheme} >
      {icon}
    </ToggleButton>
  );
}

export default Toggle;