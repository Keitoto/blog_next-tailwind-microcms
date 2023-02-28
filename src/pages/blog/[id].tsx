import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { client } from 'src/libs/client';
import { Blog } from 'src/pages/blog';

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogDetail: NextPage<Props> = (props) => {

  return (
    <div>
      <h1>{props.title}</h1>
      <time>{props.publishedAt}</time>
      <div dangerouslySetInnerHTML={{ __html: props.body }} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList<Blog>({
    endpoint: 'blogs',
  });
  const ids = data.contents.map((content) => `/blog/${content.id}`);

  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) return { notFound: true };
  const id = ctx.params.id;
  const data = await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId: id,
  });
  return {
    props: data,
  };
};

export default BlogDetail;
