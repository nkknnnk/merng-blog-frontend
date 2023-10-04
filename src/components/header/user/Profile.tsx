//@ts-nocheck
import React from "react";
import { Avatar, Box, LinearProgress, Typography } from "@mui/material";
import { profileStyles } from "../../style/profile-styles";
import BlogItem from "../../blogs/BlogItem";
import { useQuery } from "@apollo/client";
import { GET_USER_BLOGS } from "../../graphql/queries";

const Profile = () => {
  const { loading, data, error, refetch } = useQuery(GET_USER_BLOGS, {
    variables: {
      id: JSON.parse(localStorage.getItem("userData") as string).id,
    },
  });
  console.log(data);
  if (error) return <p>ERROR</p>;
  return loading ? (
    <LinearProgress />
  ) : (
    data && (
      <Box sx={profileStyles.container}>
        <Box sx={profileStyles.blogsContainer}>
          <Typography sx={profileStyles.text} variant="h3">
            My Post
          </Typography>
          <Box sx={profileStyles.cardsContainer}>
            {data.user.blogs.map((item) => (
              <BlogItem
                showActions={true}
                refetch={refetch}
                blog={{
                  title: item.title,
                  content: item.content,
                  date: item.date,
                  id: item.id,
                }}
                blogId={item.id}
              />
            ))}
          </Box>
        </Box>
        <Box sx={profileStyles.profileContainer}>
          <Box sx={profileStyles.userContainer}>
            <Avatar sx={profileStyles.avatar}></Avatar>
            <Typography variant="h3" fontFamily="Work Sans">
              Nitish Kumar
            </Typography>
            <Typography variant="h4" fontFamily="Work Sans">
              Email: nitish@email.com
            </Typography>
            <Typography variant="h4" fontFamily="monospace">
              You Wrote {10} Blogs 🎉🧨
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default Profile;
