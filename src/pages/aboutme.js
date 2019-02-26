import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class AboutMe extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="About me"
          keywords={[`about`, `me`, `nicolas`, `hollmann`]}
        />
        <h1>About me</h1>
        <p>
        I'm Nicolas Hollmann from Germany. This is my public project archive.
        </p>
      </Layout>
    )
  }
}

export default AboutMe;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
