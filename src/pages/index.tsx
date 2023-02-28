import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ComponentProps, FormEventHandler, useState } from 'react';
import { client } from 'src/libs/client';

export type Blog = {
  title: string;
  body: string;
};

type TProps = MicroCMSListResponse<Blog>;

const BlogList: NextPage<TProps> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();
  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value;
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ q }),
    });
    const data = await res.json();
    setSearch(data);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
    <div>
      <form className="mb-4 flex gap-x-2" onSubmit={handleSubmit}>
        <input type="text" name="query" className="border border-black px-2" />
        <button type="submit" className="border border-black px-2">
          Search
        </button>
      </form>
      <p className="mb-4 text-gray-400">
        {search ? 'Search Results' : 'Total Articles'}: {totalCount}
      </p>
      <ul className="space-y-4">
        {contents.map((content) => (
          <li key={content.id}>
            <Link href={`blog/${content.id}`}>
              <a className="text-xl text-blue-500 underline hover:text-blue-400">
                {content.title}
              </a>
            </Link>
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

export default BlogList;
