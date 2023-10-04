import React, { useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { addStyles, htmlElmStyles } from "../style/add-blog-styles";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_BLOG } from "../graphql/mutations";
import { GET_BLOG_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const params = useParams();
  const [updateBlog] = useMutation(UPDATE_BLOG)
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const { data, refetch } = useQuery(GET_BLOG_BY_ID, {
    variables: {
      id: params.id,
    },
  });
  useEffect(() => {
    if (data && headingRef.current && contentRef.current) {
      headingRef.current.innerHTML = data.blog.title;
      contentRef.current.innerHTML = data.blog.content;
    }
  }, [params.id, data]);

  const handleSubmit = async () => {
    const title = headingRef.current?.innerText;
    const content = contentRef.current?.innerText;
    if (
      title &&
      content &&
      title?.trim().length > 0 &&
      content?.trim().length > 0
    ) {
      try {
        const res = await updateBlog({
          variables: {
            id: params.id,
            title,
            content,
          }
        })
        toast.promise(refetch(), {
          error: "Unexpected Error",
          success: "Fetching Complete",
          loading: "Hold On!",
        });
        console.log(res)
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
    data && (
      <Box sx={addStyles.container}>
        <Box sx={addStyles.blogHeader}>
          <Typography>Authored By: Nitish</Typography>
          <Button onClick={handleSubmit} color="success" variant="contained">
            Publish
          </Button>
        </Box>
        <form>
          <Box sx={addStyles.formContainer}>
            <h2 ref={headingRef} style={htmlElmStyles.h2} contentEditable>
              Post Your Story Title
            </h2>
            <p ref={contentRef} style={htmlElmStyles.p} contentEditable>
              Describe Your Story
            </p>
          </Box>
        </form>
      </Box>
    )
  );
};

export default UpdateBlog;
