import * as React from 'react';
import {
  Dropdown,
  KebabToggle,
  DropdownItem,
  DropdownSeparator
} from '@patternfly/react-core';

import { IActionsItem, DropdownPosition, DropdownDirection } from './Table';

export interface ActionsColumnProps {
  children?: React.ReactNode;
  items: IActionsItem[];
  isDisabled?: boolean;
  dropdownPosition?: DropdownPosition;
  dropdownDirection?: DropdownDirection;
  rowData?: object | undefined;
  extraData?: { rowIndex: number, columnIndex: number, column: object, property: string };
};

export interface ActionsColumnState {
  isOpen: boolean;
}

export class ActionsColumn extends React.Component<ActionsColumnProps, ActionsColumnState> {
  static defaultProps = {
    children: null as React.ReactNode,
    items: [] as IActionsItem[],
    dropdownPosition: 'right',
    dropdownDirection: 'down',
    rowData: {},
    extraData: {}
  }
  constructor (props: ActionsColumnProps){
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onToggle = (isOpen: boolean): void => {
    this.setState({
      isOpen
    });
  }

  onSelect = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
    onClick: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, rowIndex: number | undefined, rowData: object | undefined, extraData: object | undefined) => void) | undefined): void => {
    const { rowData, extraData } = this.props;
    event.preventDefault();
    // tslint:disable-next-line:no-unused-expression
    onClick && onClick(event, extraData && extraData.rowIndex, rowData, extraData);
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { items, children, dropdownPosition, dropdownDirection, isDisabled } = this.props;
    return (
      <React.Fragment>
        <Dropdown
          toggle={<KebabToggle isDisabled={isDisabled} onToggle={this.onToggle} />}
          position={dropdownPosition}
          direction={dropdownDirection}
          isOpen={isOpen}
          dropdownItems={items.map(
            ({ title, itemKey, onClick, isSeparator, ...props }, key) =>
              isSeparator ? (
                <DropdownSeparator {...props} key={itemKey || key} data-key={itemKey || key} />
              ) : (
                <DropdownItem
                  onClick={event => this.onSelect(event, onClick)}
                  {...props}
                  key={itemKey || key}
                  data-key={itemKey || key}
                >
                  {title}
                </DropdownItem>
              )
          )}
          isPlain
        />
        {children}
      </React.Fragment>
    );
  }
}