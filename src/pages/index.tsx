// src/pages/index.tsx
import * as React from "react";
import type { PageProps, HeadFC } from "gatsby";
import { graphql } from "gatsby";
import { About, Contact, Hero, Layout, WorkHistory } from "../components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <WorkHistory />
      <Contact />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Patrick Puga | Software Engineer</title>
);

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
