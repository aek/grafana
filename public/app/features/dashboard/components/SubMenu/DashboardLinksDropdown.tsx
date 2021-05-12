import React, { useRef } from 'react';
import { Icon } from '@grafana/ui';
import { DashboardLink } from '../../state/DashboardModel';
import { selectors } from '@grafana/e2e-selectors';

interface Props {
  links: DashboardLink[];
}

export const DashboardLinksDropdown: React.FC<Props> = (props) => {
  const { links } = props;
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <LinkElement key="dashlinks-dropdown" aria-label={selectors.components.DashboardLinks.dropDown}>
      <>
        <a className="gf-form-label gf-form-label--dashlink" data-placement="bottom" data-toggle="dropdown">
          <Icon name="bars" style={{ marginRight: '4px' }} />
          <span>Options Links</span>
        </a>
        <ul className={`dropdown-menu`} role="menu" ref={listRef}>
          {links.length > 0 &&
            links.map((resolvedLink, index) => {
              return (
                <li key={`dashlinks-dropdown-item-${index}`}>
                  <a
                    href={resolvedLink.url}
                    target={resolvedLink.targetBlank ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={selectors.components.DashboardLinks.link}
                  >
                    {resolvedLink.title}
                  </a>
                </li>
              );
            })}
        </ul>
      </>
    </LinkElement>
  );
};

interface LinkElementProps {
  'aria-label': string;
  key: string;
  children: JSX.Element;
}

const LinkElement: React.FC<LinkElementProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div {...rest} className="gf-form">
      {<>{children}</>}
    </div>
  );
};
