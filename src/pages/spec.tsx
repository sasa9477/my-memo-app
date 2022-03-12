import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { GetStaticProps, NextPage } from 'next';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type Props = {
  spec: Record<string, any>
}

export const getStaticProps: GetStaticProps = async ctx => {
  const spec = load(readFileSync('./src/openapi.yaml', 'utf8')) as Record<string, any>

  return {
    props: {
      spec,
    },
  };
};

const Spec: NextPage<Props> = ({ spec }): JSX.Element => {
  return <SwaggerUI  spec={spec}/>;
};

export default Spec