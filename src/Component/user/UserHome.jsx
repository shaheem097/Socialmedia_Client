import React from 'react';
import { Grid, Paper } from '@mui/material';
import PostComponent from './PostComponent';

function UserHome() {
  // Assuming you have an array of posts
  const posts = [
    { id: 1, content: 'Post 1 content' },
    { id: 2, content: 'Post 2 content' },
    // Add more posts as needed
  ];

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item key={post.id} xs={12} sm={12} md={8} lg={9} style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={3} style={{ padding: 16, backgroundColor: '#111827', width: '550px' }}>
            <PostComponent content={post.content} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default UserHome;
