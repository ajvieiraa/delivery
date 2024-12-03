import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { View } from 'react-native';

import { Container, TabContainer, TabLabel, TabsContainer } from './styles';

interface Props {
  tabs: { label: string; onPress?: () => void }[];
  children: React.ReactElement[];
}

export interface SimpleTabsHandles {
  go(tab: number): void;
}

const SimpleTabs: React.ForwardRefRenderFunction<SimpleTabsHandles, Props> = (
  { tabs, children },
  ref,
) => {
  const [active, setActive] = useState<number>(0);

  const go = useCallback(
    (tab: number) => {
      if (tab > tabs.length - 1 || tab < 0)
        return console.warn('Trying to change to a nonexistent tab.');
      setActive(tab);
    },
    [tabs.length],
  );

  useImperativeHandle(ref, () => ({ go }));

  return (
    <View>
      <Container>
        <TabsContainer>
          {tabs.map((tab, index) => (
            <TabContainer
              active={index === active}
              key={index.toString()}
              onPress={() => {
                tab.onPress?.();
                setActive(index);
              }}
            >
              <TabLabel active={index === active}>{tab.label}</TabLabel>
            </TabContainer>
          ))}
        </TabsContainer>
      </Container>
      <View>{children[active]}</View>
    </View>
  );
};

export const TabContent: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return children;
};

export default forwardRef(SimpleTabs);
