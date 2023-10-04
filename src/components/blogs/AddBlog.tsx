import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { addStyles, htmlElmStyles } from "../style/add-blog-styles";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../graphql/mutations";

const AddBlog = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const [addBlog] = useMutation(ADD_BLOG);
  const handleSubmit = async () => {
    const title = headingRef.current?.innerText;
    const content = contentRef.current?.innerText;
    if (
      title &&
      content &&
      title?.trim().length > 0 &&
      content?.trim().length > 0
    ) {
      const date = new Date();
      const user = JSON.parse(localStorage.getItem("userData") as string).id;
      try {
        const res = await addBlog({
          variables: {
            title,
            content,
            date,
            user,
          },
        });
        const data = await res.data
        console.log(data)
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
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
  );
};

export default AddBlog;
