import React from 'react';
import { graphql } from 'gatsby';
import SidebarLayout from './sidebarLayout';
import { CSSVars, Props, LiveEdit } from '../components/componentDocs';
import { Title, PageSection } from '@patternfly/react-core';
import { MDXProvider } from '@mdx-js/tag';
import { MDXRenderer } from '../components/mdx-renderer';

const components = {
  code: LiveEdit
};

const MarkdownTemplate = ({ data }) => {
  // Exported components in the folder (i.e. src/components/Alerts/[Alert, AlertIcon, AlertBody])
  const helperComponents = data.metadata.edges
    .map(edge => edge.node.name)
    .filter(name => name); // Some HOCs don't get docgenned properly (like TabContent)
  // Exported components with names used in the *.md file
  const propComponents = [] // getUsedComponents(data.mdx.htmlAst, helperComponents, {})
  // Finally, the props for each relevant component!
  const props = data.metadata.edges
    .filter(edge => propComponents.indexOf(edge.node.name) !== -1)
    .map(edge => { return { name: edge.node.name, props: edge.node.props } });

  const cssPrefix = data.mdx.frontmatter.cssPrefix;
  let section = data.mdx.frontmatter.section;
  if (!section)
    section = 'component';

  return (
    <SidebarLayout>
      <PageSection>
        <Title size="4xl" style={{ textTransform: 'capitalize' }}>
          {data.mdx.frontmatter.title} {section.indexOf('-') === -1 ? section : ''}
        </Title>
        <MDXProvider components={components}>
          <MDXRenderer>
            {data.mdx.code.body}
          </MDXRenderer>
        </MDXProvider>
      </PageSection>

      {props.length > 0 && props.map(component =>
        <PageSection key={component.name}>
          {props.description}
          <Props caption={`${component.name} Properties`} propList={component.props} />
        </PageSection>
      )}

      {cssPrefix &&
        <PageSection>
          <CSSVars caption={
            <p>
              CSS Variables starting with <strong>--{cssPrefix}</strong> from&nbsp;
                <a href="https://github.com/patternfly/patternfly-next/" target="_blank">patternfly-next</a>
            </p>
          } cssPrefix={cssPrefix} />
        </PageSection>
      }
    </SidebarLayout>
  );
};

// Test queries in http://localhost:8000/___graphql
// See how to filter from: https://www.gatsbyjs.org/docs/graphql-reference/
// We want the markdown from gatsby-transformer-remark
// We want ALL the component metadata from gatsby-transformer-react-docgen-typescript
// for components in that folder
export const pageQuery = graphql`
query GetComponent($fileAbsolutePath: String!, $pathRegex: String!) {
  mdx(fileAbsolutePath: { eq: $fileAbsolutePath }) {
    code {
      body
    }
    frontmatter {
      title
      section
      cssPrefix
    }
  }
  metadata: allComponentMetadata(filter: {path: {regex: $pathRegex}}) {
    edges {
      node {
        path
        name
        description
        props {
          name
          description
          required
          type {
            name
          }
          defaultValue {
            value
          }
        }
      }
    }
  }
}
`;

export default MarkdownTemplate;
