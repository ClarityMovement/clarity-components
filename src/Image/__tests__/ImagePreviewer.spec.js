/* eslint-env jest */
import React from 'react';
import enzymeToJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ImagePreviewer, { ImagePreviewerRenderer } from '../ImagePreviewer';

const defaultProps = {
  ...ImagePreviewerRenderer.defaultProps,
  src: 'http://pic.example.com/200/200',
  width: '90%',
};

describe('<ImagePreviewer {...props} />: elements tree', () => {
  describe('structures', () => {
    let props;

    afterEach(() => {
      const wrapper = shallow(<ImagePreviewer {...props} />).until(ImagePreviewerRenderer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });

    test('with default props', () => {
      props = defaultProps;
    });

    test('with initialOpen controlled', () => {
      props = {
        ...defaultProps,
        initialOpen: true,
      };
    });
  });

  describe('interactions', () => {
    let root;
    const event = {
      stopPropagation: jest.fn(),
    };
    const getWrapper = () => root.until(ImagePreviewerRenderer).floatUp();

    beforeEach(() => event.stopPropagation.mockClear());

    describe('with default props', () => {
      test('openLightBox && closeLightBox', () => {
        root = shallow(<ImagePreviewer {...defaultProps} />);
        const { openLightBox, closeLightBox } = getWrapper().props();

        expect(getWrapper().prop('open')).toBe(false);
        openLightBox(event);
        root.update();
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
        expect(getWrapper().prop('open')).toBe(true);
        closeLightBox();
        root.update();
        expect(getWrapper().prop('open')).toBe(false);
      });
    });

    describe('with onSetOpen controlled', () => {
      test('openLightBox && closeLightBox', () => {
        const onSetOpen = jest.fn();
        root = shallow(<ImagePreviewer {...defaultProps} onSetOpen={onSetOpen} />);
        const { openLightBox, closeLightBox } = getWrapper().props();

        openLightBox(event);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
        expect(onSetOpen).toHaveBeenCalledTimes(1);
        expect(onSetOpen).toHaveBeenCalledWith(true);

        closeLightBox();
        expect(onSetOpen).toHaveBeenCalledTimes(2);
        expect(onSetOpen).toHaveBeenCalledWith(false);
      });
    });
  });
});
