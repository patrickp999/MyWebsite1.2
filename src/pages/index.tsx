// src/pages/index.tsx
import * as React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import { About, Contact, Hero, Layout, WorkHistory } from "../components";
import { Seo } from "../components/seo";

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  const heroNode = data.hero.nodes[0];

  return (
    <Layout>
      <Hero
        data={
          heroNode
            ? {
                name: heroNode.name ?? "",
                subtitle: heroNode.subtitle ?? "",
                blurb: heroNode.blurb ?? "",
              }
            : undefined // falls back to hardcoded content inside Hero
        }
      />
      <About />
      <WorkHistory />
      <Contact />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Software Engineer" />;

export const pageQuery = graphql`
  query IndexPage {
    hero: allContentfulHero {
      nodes {
        greeting
        blurb
        name
        subtitle
      }
    }
    about: allContentfulAbout(limit: 1) {
      nodes {
        title
        skills
        avatar {
          # Modern image field
          gatsbyImageData(layout: CONSTRAINED, width: 640, placeholder: BLURRED)
          title
          description
        }
        # Start minimal; add references when you embed entries/assets in rich text
        description {
          raw
        }
      }
    }
  }
`;
