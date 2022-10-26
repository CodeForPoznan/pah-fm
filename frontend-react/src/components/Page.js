import React from 'react';
import PropTypes from 'prop-types';

const Page = ({
  children,
}) => (
  <>
    {children}
  </>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
