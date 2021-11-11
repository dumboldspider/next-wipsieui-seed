import { useTheme, Link, Button, Loading } from "@wipsie/ui";
import DefaultLayout from "../components/DefaultLayout";
import NextLink from "next/link";
import { isProd } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { buyCake } from "../redux/slices/cake";
import { fetchUsers } from "../redux/slices/user";
import { fetchPosts } from "../redux/slices/blog";
import { useEffect, useState } from "react";

export default function Home(props) {
  const theme = useTheme();
  const { numberOfCakes } = useSelector((state: any) => state.cake);
  const { users, loading } = useSelector((state: any) => state.user);
  const { posts } = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, []);

  return (
    <DefaultLayout meta={{}}>
      <NextLink href="/dois">
        <Link>Dois</Link>
      </NextLink>
      <Button onClick={() => dispatch(buyCake())}>num: {numberOfCakes}</Button>
      {loading ? (
        <Loading />
      ) : (
        users.map((user: any) => <p key={user.id}>{user.name}</p>)
      )}

      {posts.map((post: any) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </DefaultLayout>
  );
}
