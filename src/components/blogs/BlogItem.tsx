import React from "react";
import { BlogType } from "../../types/types";
import { Card, Box, Typography, CardActions, IconButton } from "@mui/material";
import { blogStyles, randomBgColor } from "../style/blog-list-styles";
import { FcCalendar } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { DELETE_BLOG } from "../graphql/mutations";

type Props = {
  blog: BlogType;
  showActions?: boolean;
  refetch?: any;
};

const BlogItem = (props: Props) => {
  const navigate = useNavigate();
  const [deleteBlog] = useMutation(DELETE_BLOG);
  const handleClick = () => {
    navigate(`/blog/view/${props.blog.id}`);
  };
  const editHandler = () => {
    navigate(`/blog/update/${props.blog.id}`);
  };
  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteBlog({ variables: { id } });
      // await props.refetch();
      navigate("/profile");
      console.log(props.blog.id, res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card sx={blogStyles.card}>
      {props.showActions && (
        <CardActions>
          <IconButton>
            <AiOutlineEdit onClick={editHandler} />
          </IconButton>
          <IconButton>
            <AiOutlineDelete onClick={() => deleteHandler(props.blog.id)} />
          </IconButton>
        </CardActions>
      )}
      <Box
        onClick={handleClick}
        sx={{ ...blogStyles.cardHeader, bgcolor: randomBgColor() }}
      >
        <Box sx={blogStyles.dateContainer}>
          <FcCalendar size="30px" />
          <Typography fontSize={"20px"} variant="caption">
            {new Date(+props.blog.date).toDateString()}
          </Typography>
        </Box>
        <Typography variant="h4" sx={blogStyles.title}>
          {props.blog.title}
        </Typography>
      </Box>
      <Box sx={blogStyles.cardContent}>
        <Typography sx={blogStyles.contentText}>
          {props.blog.content}
        </Typography>
      </Box>
    </Card>
  );
};

export default BlogItem;
