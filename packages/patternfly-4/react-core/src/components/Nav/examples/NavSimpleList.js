import React from 'react';
import { Nav, NavList, NavItem, NavVariants } from '../index';

class NavSimpleList extends React.Component {
  state = {
    activeItem: 0
  };

  onSelect = result => {
    this.setState({
      activeItem: result.itemId
    });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Nav onSelect={this.onSelect} id="nav-primary-simple">
        <NavList variant={NavVariants.simple}>
          <NavItem preventDefault to="#simple-link1" itemId={0} isActive={activeItem === 0}>
            Link 1
          </NavItem>
          <NavItem preventDefault to="#simple-link2" itemId={1} isActive={activeItem === 1}>
            Link 2
          </NavItem>
          <NavItem preventDefault to="#simple-link3" itemId={2} isActive={activeItem === 2} isSeparated>
            Link 3 with separator
          </NavItem>
          <NavItem preventDefault to="#simple-link4" itemId={3} isActive={activeItem === 3}>
            Link 4
          </NavItem>
        </NavList>
      </Nav>
    );
  }
}

export default NavSimpleList;
