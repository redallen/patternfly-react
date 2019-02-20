import React from 'react';
import { Brand } from '../Brand';
import brandImg from './pf_logo.svg';

class SimpleBrand extends React.Component {
  render() {
    return <Brand src={brandImg} alt="Patternfly Logo" />;
  }
}

export default SimpleBrand;
