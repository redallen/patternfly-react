import React from 'react';
import { graphql } from 'gatsby';
import SidebarLayout from '../components/sidebarLayout';
import { Tokens, Props, LiveEdit } from '../components/componentDocs';
import rehypeReact from 'rehype-react';
import { getUsedComponents } from '../helpers/astHelpers';
import { getScope } from '../helpers/dynamicImports';
import { Title, PageSection, PageSectionVariants } from '@patternfly/react-core';

const getRehypeReact = scope => {
  return new rehypeReact({
    // Here we inject the properties down to ALL our listed components
    createElement: (type, props, ...children) => {
      if (typeof type === 'function') {
        props.scope = scope;
        props.size = 'xl';
      }
      return React.createElement(type, props, ...children);
    },
    components: {
      code: LiveEdit,
      h2: Title
    },
  }).Compiler;
}

export default function Template({ data }) {
  // Exported components in the folder (i.e. src/components/Alerts/[Alert, AlertIcon, AlertBody])
  const helperComponents = data.metadata.edges.map(e => e.node.name)
  // Exported components with names used in the *.md file
  const propComponents = getUsedComponents(data.markdownRemark.htmlAst, helperComponents, {})
  // Finally, the props for each relevant component!
  const props = data.metadata.edges
    .filter(edge => propComponents.indexOf(edge.node.name) !== -1)
    .map(edge => { return { name: edge.node.name, props: edge.node.props } });

  // These get set at compile time, so no hot-reloading
  // This is good, we don't want every single one of our packages' full dist in our bundle!
  let scope = getScope(data.markdownRemark.rawMarkdownBody,
    data.exampleResources.edges.map(edge => edge.node.importName));

  // https://github.com/rhysd/rehype-react#programmatic
  // https://using-remark.gatsbyjs.org/custom-components
  const renderAst = getRehypeReact(scope);

  const cssPrefix = data.markdownRemark.frontmatter.cssPrefix;

  let section = data.markdownRemark.frontmatter.section;
  if (!section)
    section = 'component';

  return (
    <SidebarLayout>
      <PageSection variant={PageSectionVariants.darker}>
        <Title size="4xl" style={{ textTransform: 'capitalize' }}>
          {data.markdownRemark.frontmatter.title} {section}
        </Title>
      </PageSection>

      <PageSection>
        {renderAst(data.markdownRemark.htmlAst)}
      </PageSection>

      {props.length > 0 &&
        <PageSection variant={PageSectionVariants.dark}>
          {props.map(component =>
            <React.Fragment key={component.name}>
              <Title size="lg">{component.name} Properties</Title>
              <Props propList={component.props} />
            </React.Fragment>
          )}
        </PageSection>
      }

      {cssPrefix &&
        <PageSection>
          <Title size="lg">Tokens</Title>
          <Tokens cssPrefix={cssPrefix}></Tokens>
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
query GetComponent($fileAbsolutePath: String!, $pathRegex: String!, $examplesRegex: String!) {
  markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
    htmlAst
    rawMarkdownBody
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
  exampleResources: allComponentExamples(filter: {path: {regex: $examplesRegex}}) {
    edges {
      node {
        importName
      }
    }
  }
}
`;