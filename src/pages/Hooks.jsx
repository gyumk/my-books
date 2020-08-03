import React from 'react';
import Counter from '../components/Counter';
import Example9 from '../components/Example9';
import PersonContext from '../context/PersonContext';
import Count from '../components/Count';

export default class Hooks extends React.Component {
  static contextType = PersonContext;
  render() {
    return (
      <>
        <Counter />
        <Example9 />
        <Count />
        {/* <PersonContext.Consumer>
          {(value) => {
            JSON.stringify(value);
          }}
        </PersonContext.Consumer> */}
        <p>{JSON.stringify(this.context)}</p>
      </>
    );
  }
}
