import * as React from 'react';
import styled from 'styled-components/macro';

import { Link } from '../Link';

export function HeaderNavBar() {
  return (
    <HeaderWrapper>
      <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
      <Link to={process.env.PUBLIC_URL + '/todo'}>Todo</Link>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 4px 16px;
`;
