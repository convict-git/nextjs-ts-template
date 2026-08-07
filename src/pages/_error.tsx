import type { NextPageContext } from 'next';
import type { ErrorProps } from 'next/error';
import NextError from 'next/error';

type CustomErrorProps = ErrorProps & {
  hasGetInitialPropsErr?: Error;
};

function ErrorPage({ statusCode }: CustomErrorProps) {
  return <NextError statusCode={statusCode ?? 500} />;
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
