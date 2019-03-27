import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { getFileName } from '../../helpers/navHelpers'

import { Nav, NavGroup, NavItem } from '@patternfly/react-core';

const SiteNav = () => {
  const data = useStaticQuery(graphql`
    {
      allSitePage {
        edges {
          node {
            path
            context {
              title
            }
          }
        }
      }
    }`);

  const getSlashCount = str => {
    let count = 0;
    str.split('/').forEach(s => {
      if (s.length > 0)
        count++;
    });

    return count;
  }

  const grouped = data.allSitePage.edges
    .map(edge => edge.node)
    .filter(node => getSlashCount(node.path) > 1) // to exclude default /404.html
    .filter(node => node.context.title) // to exclude unlisted paths
    .reduce((acc, node) => {
      const group = node.path.split('/')[1];
      acc[group] = acc[group] || [];
      acc[group].push(node);
      return acc;
    }, {});

  return (
    <Nav aria-label="Nav">
      {Object.entries(grouped)
        .sort(([k1, v1], [k2, v2]) => k1.localeCompare(k2))
        .map(([key, value]) =>
          <NavGroup key={key} title={key}>
            {value
              .sort((v1, v2) => v1.context.title.localeCompare(v2.context.title))
              .map(value =>
                <li key={value.path}>
                  <Link to={value.path}>{value.context.title}</Link>
                </li>
              )}
          </NavGroup>
        )}
    </Nav>
  )
}

export default SiteNav
