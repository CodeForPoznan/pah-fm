import React from 'react';
import PropTypes from 'prop-types';

const Page = ({
  children,
  title = '',
  ...rest
}) => (
  <div {...rest}>
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
