import * as React from 'react';

interface SelectColumnProps {
  name?: string;
  children?: React.ReactNode,
  className?: string;
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectColumn: React.FunctionComponent<SelectColumnProps> = ({
  children = null as React.ReactNode,
  className = '',
  onSelect = null as (event: React.ChangeEvent<HTMLInputElement>) => void,
  ...props
} : SelectColumnProps ) => {
  return (
    <React.Fragment>
      <input {...props} type="checkbox" onChange={onSelect} />
      {children}
    </React.Fragment>
  );
};

export default SelectColumn;