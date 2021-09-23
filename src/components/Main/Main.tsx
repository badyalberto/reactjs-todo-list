import { ReactElement, ReactNode, ReactChild } from 'react';
import styled from "styled-components";

const MainPage = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.pageBackground};
  transition: all .5s ease;
  min-width: 100vw;
`;

type Props = {
  children: ReactNode;
  className: string;
};

function Main({ children, ...props }: Props): ReactElement {
  return <MainPage {...props}>{children}</MainPage>;
}

export default Main;
