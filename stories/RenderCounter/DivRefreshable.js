import React from 'react';
import T from 'prop-types';
import { compose, withState } from 'recompose';

import copyStatics from '../../src/hocs/copyStatics';
import extendPropTypes from '../../src/hocs/extendPropTypes';

import withNestHandlers from './withNestHandlers';

const DivRefreshable = ({ label, onRefresh, children, cloneChild }) => (
  <div style={{ padding: 10, border: '1px solid black' }}>
    <button onClick={() => onRefresh()}>{label}</button>
    {children && (cloneChild ? React.cloneElement(children) : children)}
  </div>
);

const propTypes = {
  children: T.element,
  cloneChild: T.bool,
  label: T.string,
  onRefresh: T.func.isRequired,
};

const defaultProps = {
  children: undefined,
  cloneChild: false,
  label: 'Refresh',
};

DivRefreshable.propTypes = propTypes;
DivRefreshable.defaultProps = defaultProps;

const hoc = Component => compose(
  extendPropTypes({ onRefresh: T.func }),
  copyStatics(Component),
  withState('state', '_onRefresh'),
  withNestHandlers({ onRefresh: '_onRefresh' }),
)(Component);

export default hoc(DivRefreshable);
