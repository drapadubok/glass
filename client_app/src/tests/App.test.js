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
});

test('LocalStateForm is rendered', () => {
  const component = renderer.create(
    <LocalForm />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});





import React from 'react';
import { graphql } from 'react-apollo';
import bananaQuery from './query';

export class Banana extends React.Component {
  render() {
    return (
      <h1>There are {this.props.data.bananas.length} bananas!</h1>
    );
  }
}

const BananaWrapper = graphql(bananaQuery)(Banana);
export default BananaWrapper;


import React from 'react';
import { shallow } from 'enzyme/build';
import { Banana } from '..'; // Note the syntax { Banana }

it('should render a Banana component correctly', () => {

  const data = { bananas: [{ BananaId: '123', Name: 'Platanito' }] };
  const wrapper = shallow(
    <Banana data={data} />,
  );

  expect(wrapper).toMatchSnapshot();
});

import bananaQuery from '../bananaQuery';

it('should be the correct query', () => {
  expect(bananaQuery).toMatchSnapshot();
});


