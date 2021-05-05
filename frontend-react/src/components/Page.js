import React from 'react';
import PropTypes from 'prop-types';

const Page = ({
  children,
  title = '',
}) => (
  <>
    {children}
  </>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
