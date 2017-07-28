import React from 'react';
import { compose, renameProp, withHandlers } from 'recompose';
import _ from 'lodash';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { MuiThemeProvider } from 'material-ui';
import { Collapse } from 'antd';

import { Accordion, AccordionItem, asAccordion, asAccordionItem } from '../../src/Accordion';

storiesOf('Accordion', module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>)
  .add('Accordion(mui)', () => {
    const wide = boolean('wide screen', false);
    const list = [1, 2, 3, 4, 5];

    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <Accordion wide={wide}>
          {list.map(value => (
            <AccordionItem
              key={value}
              title={`title-${value}`}
            >
              {_.padEnd(`content-${value}: `, 300, 'blabla ')}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  })
  .add('antd', () => {
    const wide = boolean('wide screen', false);
    const list = [1, 2, 3, 4, 5];

    const Container = compose(
      asAccordion,
      withHandlers({ onChange: ({ onActivate }) => key => onActivate(undefined, key) }),
    )(Collapse);
    const Item = compose(
      asAccordionItem,
      renameProp('expanded', 'isActive'),
    )(Collapse.Panel);

    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <Container accordion wide={wide}>
          {list.map(value => (
            <Item
              key={value}
              header={`title-${value}`}
            >
              {_.padEnd(`content-${value}: `, 300, 'blabla ')}
            </Item>
          ))}
        </Container>
      </div>
    );
  });

