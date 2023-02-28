import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { client } from 'src/libs/client';

export type Blog = {
  title: string;
  body: string;
};

type TProps = MicroCMSListResponse<Blog>;

const Home: NextPage<TProps> = (props) => {
  return (
    <div className="text-blue-500">
      <p className='text-gray-400'>Total Articles: {props.totalCount}</p>
      <ul className='mt-4 space-y-4'>
        {props.contents.map((content) => (
          <li key={content.id}>
            <Link href={`blog/${content.id}`}><a className='underline text-xl text-blue-500 hover:text-blue-400'>{content.title}</a></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({
    endpoint: 'blogs',
  });
  return {
    props: data,
  };
};

export default Home;
