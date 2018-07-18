import React from 'react';
import renderer from 'react-test-renderer';

import { AddEventForm } from './components/eventForm';
import { LocalForm } from './components/localStateForm';

test('EventForm is rendered', () => {
  const values = { name: "meh" };
  const component = renderer.create(
    <AddEventForm values={values} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  /*
  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  */
});

test('LocalStateForm is rendered', () => {
  const component = renderer.create(
    <LocalForm />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
