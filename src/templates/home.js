import React, { useContext } from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { LocaleContext } from "../contexts/LocaleContext";
import fi from "../locales/fi.yml";
import en from "../locales/en.yml";
import sv from "../locales/sv.yml";
import { SvgHeaderFrameWide } from "../components/SvgCollection";
import { theme } from "../theme/theme";

const Home = ({ pageContext }) => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;
  const { data } = pageContext;

  return (
    <Layout>
      <Main>
        <div className="heading">
          <SvgHeaderFrameWide />
          <h2>{text.home}</h2>
        </div>
      </Main>
    </Layout>
  );
};

export default Home;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  background: ${theme.primary};
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
