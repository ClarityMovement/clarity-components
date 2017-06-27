import T from 'prop-types';
import { compose, mapProps, pure } from 'recompose';

import { omitProps, omitPropTypes, extendStatics, copyStatics, embedHandlers } from 'react-render-counter/hocs';

import withStates from '../hocs/withStates';

export const defaultState = {
  uploading: false,
  failed: false,
  editor: undefined,
};

export const createInitialState = ({ initialState, ...props }) => {
  const state = {
    ...defaultState,
    ...initialState,
  };

  Object.keys(defaultState).forEach((key) => {
    if (typeof props[key] !== 'undefined') {
      state[key] = props[key];
    }
  });

  return state;
};

export const onUpload = ({
  editor,
  uploadImage,
  onUploadFail,
  onUploadStart,
  onUploadSucceed,
}) => () => {
  if (!uploadImage) return;

  const dataUrl = editor.getDataUrl();
  onUploadStart();
  uploadImage(dataUrl).then(onUploadSucceed, onUploadFail);
};

const openEditor = ({ setState }) => () => setState({ uploaded: false });

const onUploadSucceed = ({ setState }) => ({ url }) =>
  setState({ url, uploaded: true, uploading: false });
const onUploadFail = ({ setState }) => () =>
  setState({ failed: true, uploading: false });
const onUploadStart = ({ setState }) => () =>
  setState({ uploading: true, uploaded: false, failed: false });

const reset = ({ resetState, editor, image }) => () => {
  if (!image && editor && editor.reset) {
    editor.reset();
  }
  return resetState(props => createInitialState({ ...props, editor }));
};

export const handlers = [{
  openEditor,
  onUploadFail,
  onUploadStart,
  onUploadSucceed,
  reset,
}, {
  onUpload,
}];

const propsMapper = ({
  url,
  uploaded = !!url,
  image = (url ? { preview: url } : undefined),
  ...rest
}) => ({
  ...rest,
  url,
  uploaded,
  image,
  cropping: !!image && !uploaded,
});

const propTypes = {
  initialState: T.shape({
    url: T.string,
  }),
  onUploadFail: T.func,
  onUploadStart: T.func,
  onUploadSucceed: T.func,
  uploadImage: T.func,
};

const defaultProps = {
  initialState: defaultState,
};

const stateKeys = ['editor', 'image'];

export default Component => compose(
  omitPropTypes(['onUpload']),
  extendStatics({
    displayName: 'withImage',
    propTypes,
    defaultProps,
  }),
  copyStatics(Component),
  withStates(createInitialState, { stateKeys }),
  embedHandlers(handlers),
  omitProps(['editor', 'setState', 'resetState', 'initialState']),
  mapProps(propsMapper),
  pure,
)(Component);