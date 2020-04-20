import React from 'react';
import { TextInput, TextInputBase } from '@patternfly/react-core';
import {
  Table,
  TableHeader,
  TableBody
} from '@patternfly/react-table';

export class TableInputDemo extends React.Component {
  inputRef = React.createRef<HTMLInputElement>();
  state = {
    input1: '1',
    input2: '2'
  };

  onTextChange1 = event => this.setState({input1: event});

  onTextChange2 = event => this.setState({input2: event});

  rows() {
    return [{ cells: [
      <div><TextInput ref={this.inputRef} id="input1" type="text" value={this.state.input1} onChange={this.onTextChange1} /></div>,
      <div><TextInputBase id="input2" type="text" value={this.state.input2} onChange={this.onTextChange2} /></div>,
    ]}]
  }

  render() {
    console.log('inputRef', this.inputRef)
    return (
      <React.Fragment>
        <div>
          {this.rows()[0].cells}
        </div>
        <Table aria-label="Input table" cells={['c1', 'c2']} rows={this.rows()}>
          <TableHeader />
          <TableBody />
        </Table>
      </React.Fragment>
    );
  }
}