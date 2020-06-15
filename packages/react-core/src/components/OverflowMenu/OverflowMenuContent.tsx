import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/OverflowMenu/overflow-menu';
import { OverflowMenuContext } from './OverflowMenuContext';

export interface OverflowMenuContentProps extends React.HTMLProps<HTMLDivElement> {
  /** Any elements that can be rendered in the menu */
  children?: any;
  /** Additional classes added to the OverflowMenuContent */
  className?: string;
  /** Modifies the overflow menu content visibility */
  isPersistent?: boolean;
}

/**
 *
 */
export function OverflowMenuContent({ className, children, isPersistent }: OverflowMenuContentProps) {
  return (
    <OverflowMenuContext.Consumer>
      {value =>
        (!value.isBelowBreakpoint || isPersistent) && (
          <div className={css(styles.overflowMenuContent, className)}>{children}</div>
        )
      }
    </OverflowMenuContext.Consumer>
  );
}
