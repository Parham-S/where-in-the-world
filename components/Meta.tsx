import Head from "next/head";

interface HeadProps {
  title?: string;
}

const Meta: React.FunctionComponent<HeadProps> = ({ title }) => {
  return (
    <Head>
      <title>
        {title ? `Where in the world - ${title}` : "Where in the world"}
      </title>
      <meta name="description" content="Where in the world?" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
