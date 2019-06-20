---
title: 'Stack'
section: 'charts'
typescript: true
propComponents: ['Chart', 'ChartBar', 'ChartStack']
---

import { Card, CardHead, CardActions, CardBody, Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, DropdownPosition, Split, SplitItem } from '@patternfly/react-core';
import { Chart, ChartBar, ChartStack, ChartThemeColor, ChartThemeVariant, ChartLegend } from '@patternfly/react-charts';
import './chart-stack.scss';


## David <3's Stack Charts SOOOOOOOO MUCH
```js
import React from 'react';
import { Card, CardHead, CardActions, CardBody, Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, DropdownPosition } from '@patternfly/react-core';
import { Chart, ChartBar, ChartStack, ChartLegend } from '@patternfly/react-charts';

class SubscriptionsUsageGraph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    };
    this.onToggle = isOpen => {
      this.setState({
        isOpen
      });
    };
    this.onSelect = event => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };
  }
  render() {
    const { isOpen } = this.state;
    const dropdownItems = [
      <DropdownItem key="link">Link</DropdownItem>,
      <DropdownItem key="action" component="button">
        Action
      </DropdownItem>,
      <DropdownItem key="disabled link" isDisabled>
        Disabled Link
      </DropdownItem>,
      <DropdownItem key="disabled action" isDisabled component="button">
        Disabled Action
      </DropdownItem>,
      <DropdownSeparator key="separator" />,
      <DropdownItem key="separated link">Separated Link</DropdownItem>,
      <DropdownItem key="separated action" component="button">
        Separated Action
      </DropdownItem>
    ];
    return (
      <div className="subscriptions-usage-graph">
        <Card>
          <CardHead>
            <Split>
              <SplitItem><h2>Daily CPU socket usage</h2></SplitItem>
              <SplitItem isFilled></SplitItem>
              <SplitItem>
                <ChartLegend
                  data={[{ name: 'Physical' }, { name: 'Virtual' }]}
                  height={30}
                  responsive={false}
                  width={250}
                />
              </SplitItem>
            </Split>
            <CardActions>
              <Dropdown
                onSelect={this.onSelect}
                position={DropdownPosition.right}
                toggle={<DropdownToggle onToggle={this.onToggle}>Last 30 Days</DropdownToggle>}
                isOpen={isOpen}
                dropdownItems={dropdownItems}
              />
            </CardActions>
          </CardHead>
          <CardBody>
            <div>
              <div className="stack-chart-container">
                <Chart>
                  <ChartStack domainPadding={{x: [10, 2]}}>
                    <ChartBar data={[{ x: 'Mar 20', y: 4 }, { x: 'Mar 21', y: 3 }, { x: 'Mar 22', y: 3 }, { x: 'Mar 23', y: 1 }, { x: 'Mar 24', y: 2 }, { x: 'Mar 25', y: 5 }, { x: 'Mar 26', y: 3 }, { x: 'Mar 27', y: 1 }, { x: 'Mar 28', y: 1 }]} />
                    <ChartBar data={[{ x: 'Mar 20', y: 4 }, { x: 'Mar 21', y: 3 }, { x: 'Mar 22', y: 2 }, { x: 'Mar 23', y: 2 }, { x: 'Mar 24', y: 1 }, { x: 'Mar 25', y: 7 }, { x: 'Mar 26', y: 4 }, { x: 'Mar 27', y: 3 }, { x: 'Mar 28', y: 4 }]} />
                    <ChartBar data={[{ x: 'Mar 20', y: 4 }, { x: 'Mar 21', y: 3 }, { x: 'Mar 22', y: 2 }, { x: 'Mar 23', y: 4 }, { x: 'Mar 24', y: 4 }, { x: 'Mar 25', y: 9 }, { x: 'Mar 26', y: 7 }, { x: 'Mar 27', y: 3 }, { x: 'Mar 28', y: 3 }]} />
                    <ChartBar data={[{ x: 'Mar 20', y: 4 }, { x: 'Mar 21', y: 3 }, { x: 'Mar 22', y: 1 }, { x: 'Mar 23', y: 3 }, { x: 'Mar 24', y: 3 }, { x: 'Mar 25', y: 8 }, { x: 'Mar 26', y: 5 }, { x: 'Mar 27', y: 4 }, { x: 'Mar 28', y: 2 }]} />
                    <ChartBar data={[{ x: 'Mar 20', y: 4 }, { x: 'Mar 21', y: 3 }, { x: 'Mar 22', y: 2 }, { x: 'Mar 23', y: 3 }, { x: 'Mar 24', y: 3 }, { x: 'Mar 25', y: 8 }, { x: 'Mar 26', y: 5 }, { x: 'Mar 27', y: 2 }, { x: 'Mar 28', y: 3 }]} />
                  </ChartStack>
                </Chart>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
```

## Vertical blue stack chart
```js
import React from 'react';
import { Chart, ChartBar, ChartStack } from '@patternfly/react-charts';

<div>
  <div className="stack-chart-container">
    <Chart>
      <ChartStack domainPadding={{x: [10, 2]}}>
        <ChartBar data={[{ x: 'Cats', y: 1 }, { x: 'Dogs', y: 2 }, { x: 'Birds', y: 5 }, { x: 'Mice', y: 3 }]} />
        <ChartBar data={[{ x: 'Cats', y: 2 }, { x: 'Dogs', y: 1 }, { x: 'Birds', y: 7 }, { x: 'Mice', y: 4 }]} />
        <ChartBar data={[{ x: 'Cats', y: 4 }, { x: 'Dogs', y: 4 }, { x: 'Birds', y: 9 }, { x: 'Mice', y: 7 }]} />
        <ChartBar data={[{ x: 'Cats', y: 3 }, { x: 'Dogs', y: 3 }, { x: 'Birds', y: 8 }, { x: 'Mice', y: 5 }]} />
      </ChartStack>
    </Chart>
  </div>
</div>
```

## Vertical multi-color stack chart with zoom
```js
import React from 'react';
import { Chart, ChartBar, ChartStack, ChartThemeColor, ChartThemeVariant } from '@patternfly/react-charts';

<div>
  <div className="stack-chart-container">
    <Chart
      allowZoom={true}
      themeColor={ChartThemeColor.multi}
      themeVariant={ChartThemeVariant.light}
    >
      <ChartStack domainPadding={{x: [10, 2]}}>
        <ChartBar data={[{ x: 'Cats', y: 1 }, { x: 'Dogs', y: 2 }, { x: 'Birds', y: 5 }, { x: 'Mice', y: 3 }]} />
        <ChartBar data={[{ x: 'Cats', y: 2 }, { x: 'Dogs', y: 1 }, { x: 'Birds', y: 7 }, { x: 'Mice', y: 4 }]} />
        <ChartBar data={[{ x: 'Cats', y: 4 }, { x: 'Dogs', y: 4 }, { x: 'Birds', y: 9 }, { x: 'Mice', y: 7 }]} />
        <ChartBar data={[{ x: 'Cats', y: 3 }, { x: 'Dogs', y: 3 }, { x: 'Birds', y: 8 }, { x: 'Mice', y: 5 }]} />
      </ChartStack>
    </Chart>
  </div>
</div>
```

## Horizontal blue (default) stack chart
```js
import React from 'react';
import { Chart, ChartBar, ChartStack } from '@patternfly/react-charts';

<div>
  <div className="stack-chart-container">
    <Chart>
      <ChartStack domainPadding={{x: [10, 2]}} horizontal>
        <ChartBar data={[{ x: 'Cats', y: 1 }, { x: 'Dogs', y: 2 }, { x: 'Birds', y: 5 }, { x: 'Mice', y: 3 }]} />
        <ChartBar data={[{ x: 'Cats', y: 2 }, { x: 'Dogs', y: 1 }, { x: 'Birds', y: 7 }, { x: 'Mice', y: 4 }]} />
        <ChartBar data={[{ x: 'Cats', y: 4 }, { x: 'Dogs', y: 4 }, { x: 'Birds', y: 9 }, { x: 'Mice', y: 7 }]} />
        <ChartBar data={[{ x: 'Cats', y: 3 }, { x: 'Dogs', y: 3 }, { x: 'Birds', y: 8 }, { x: 'Mice', y: 5 }]} />
      </ChartStack>
    </Chart>
  </div>
</div>
```

## Horizontal multi-color stack chart
```js
import React from 'react';
import { Chart, ChartBar, ChartStack, ChartThemeColor, ChartThemeVariant } from '@patternfly/react-charts';

<div>
  <div className="stack-chart-container">
    <Chart
      themeColor={ChartThemeColor.multi}
      themeVariant={ChartThemeVariant.light}
    >
      <ChartStack domainPadding={{x: [10, 2]}} horizontal>
        <ChartBar data={[{ x: 'Cats', y: 1 }, { x: 'Dogs', y: 2 }, { x: 'Birds', y: 5 }, { x: 'Mice', y: 3 }]} />
        <ChartBar data={[{ x: 'Cats', y: 2 }, { x: 'Dogs', y: 1 }, { x: 'Birds', y: 7 }, { x: 'Mice', y: 4 }]} />
        <ChartBar data={[{ x: 'Cats', y: 4 }, { x: 'Dogs', y: 4 }, { x: 'Birds', y: 9 }, { x: 'Mice', y: 7 }]} />
        <ChartBar data={[{ x: 'Cats', y: 3 }, { x: 'Dogs', y: 3 }, { x: 'Birds', y: 8 }, { x: 'Mice', y: 5 }]} />
      </ChartStack>
    </Chart>
  </div>
</div>
```
