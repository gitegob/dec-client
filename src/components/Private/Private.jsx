import React from 'react';
import { Redirect } from 'react-router-dom';

const Private = (WrappedComp) =>
  class extends React.Component {
    render() {
      const tkn = localStorage.getItem('accessToken');
      const rest = this.props;
      return tkn ? <WrappedComp {...rest} /> : <Redirect to="/auth" />;
    }
  };

export default Private;
