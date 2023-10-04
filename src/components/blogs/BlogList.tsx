import React from "react";
import { BlogType } from "../../types/types";
import { Box } from "@mui/material";
import { blogStyles } from "../style/blog-list-styles";
import BlogItem from "./BlogItem";

type Props = {
  blogs: BlogType[];
};
const BlogList = (props: Props) => {
  console.log(props.blogs);
  return (
    <Box sx={blogStyles.container}>
      {props.blogs.map((blog: BlogType, index) => (
        <BlogItem blog={blog} key={index}/>
      ))}
    </Box>
  );
};

export default BlogList;
