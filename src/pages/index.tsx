import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { client } from 'src/libs/client';

type TBlog = {
  title: string;
  body: string;
};

type TProps = MicroCMSListResponse<TBlog>;

const Home: NextPage<TProps> = (props) => {
  console.log(props);

  return (
    <div className="text-blue-500">
      <p>Total Articles: {props.totalCount}</p>
      <ul>
        {props.contents.map((content) => (
          <li key={content.id}>
            <Link href={content.id}>{content.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<TProps> = async () => {
  const data = await client.get({
    endpoint: 'blogs',
  });
  console.log(data);
  return {
    props: data,
  };
};

export default Home;
