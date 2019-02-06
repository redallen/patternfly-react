import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Anything that can be rendered inside of list item */
  children: PropTypes.node,
  /** Additional props are spread to the container <li> */
  '': PropTypes.any
};

const defaultProps = {
  children: null
};

const ListItem = ({ children, ...props }) => <li {...props}>{children}</li>;

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
