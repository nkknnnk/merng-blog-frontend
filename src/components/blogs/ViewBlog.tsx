import React from "react";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { blogPageStyles } from "../style/view-styles";
import { FaComments } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { ImMail } from "react-icons/im";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BLOG_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ADD_COMMENT, DELETE_COMMENT } from "../graphql/mutations";
import { toast } from "react-hot-toast";

function getInitials(name: string) {
  const nameAr = name.split(" ");
  if (nameAr.length > 1) {
    return `${nameAr[0][0]}${nameAr[1][0]}`;
  }
  return `${nameAr[0][0]}`;
}

const ViewBlog = () => {
  const user: string = JSON.parse(
    localStorage.getItem("userData") as string
  )?.id;
  const { register, handleSubmit } = useForm();
  const params = useParams();
  const [addCommentToBlog] = useMutation(ADD_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const { data, error, loading, refetch } = useQuery(GET_BLOG_BY_ID, {
    variables: {
      id: params.id,
    },
  });
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    return (
      <Dialog open={true}>
        <DialogContent>Error Fetching Blog</DialogContent>
      </Dialog>
    );
  }
  const commentHandler = async (data: any) => {
    const text = data.comment;
    const date = new Date();

    try {
      await addCommentToBlog({
        variables: {
          text,
          date,
          blog: params.id,
          user,
        },
      });
      toast.promise(refetch(), {
        error: "Unexpected Error",
        success: "Fetching Complete",
        loading: "Hold On!",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handleCommentDelete = async (id: string) => {
    try {
      await deleteComment({ variables: { id } });
      toast.promise(refetch(), {
        error: "Unexpected Error",
        success: "Fetching Complete",
        loading: "Hold On!",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    data && (
      <Box sx={blogPageStyles.container}>
        <Box sx={blogPageStyles.profileHeader}>
          <Typography sx={blogPageStyles.headerText}>
            {data.blog.user.name}
          </Typography>
          <Box sx={blogPageStyles.profileHeaderItems}>
            <ImMail />
            <Typography sx={blogPageStyles.headerText}>
              {data.blog.user.email}
            </Typography>
            <Box sx={{ ml: "auto", display: "flex" }}>
              <BsCalendar2DateFill />
              <Typography>
                {new Date(+data.blog.date).toDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography sx={blogPageStyles.blogTitle}>{data.blog.title}</Typography>
        <Typography sx={blogPageStyles.blogContent}>
          {data.blog.content}
        </Typography>
        <Box sx={blogPageStyles.commentBox}>
          Comments:{" "}
          <IconButton>
            <FaComments size={"30px"} />
          </IconButton>
        </Box>
        <Box sx={blogPageStyles.commentInputContainer}>
          <Typography margin={2} fontFamily={"Arvo"}>
            Add Your Commnet
          </Typography>
          <Box sx={blogPageStyles.inputLayout}>
            <TextField
              {...register("comment")}
              sx={blogPageStyles.textField}
              InputProps={{
                style: { width: "60vw", borderRadius: "10px" },
                endAdornment: (
                  <IconButton onClick={handleSubmit(commentHandler)}>
                    <BiSend size="25" />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
        {data.blog.comments.length > 0 && (
          <Box sx={blogPageStyles.comments}>
            {data.blog.comments.map((comment: any) => (
              <Box sx={blogPageStyles.commentItem} key={comment.date}>
                <Avatar
                  sx={{ padding: 1, color: "red", bgcolor: "transparent" }}
                >
                  {getInitials(comment.user.name)}
                </Avatar>
                <Typography sx={blogPageStyles.commentText}>
                  {comment.text}
                </Typography>
                {user === comment.user.id && (
                  <IconButton
                    onClick={() => handleCommentDelete(comment.id)}
                    sx={{ ml: "auto" }}
                    color="error"
                  >
                    <AiOutlineDelete />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    )
  );
};

export default ViewBlog;
