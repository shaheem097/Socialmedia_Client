import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Avatar, Typography, Input } from '@mui/material';

function PostComponent() {
  return (
   
    <div>
    <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#37474F', color: '#ECEFF1', borderRadius: '16px', overflow: 'hidden' , border: '3px solid #083344' }}>
        <CardHeader className="bg-gray-900"
          avatar={
            <Avatar src="https://stackdiary.com/140x100.png" alt="" />
          }
          title="External_"
          subheader="New York City"
          action={
            <IconButton aria-label="options">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                {/* ... */}
              </svg>
            </IconButton>
          }
        />
        <img src="https://stackdiary.com/140x100.png" alt="" style={{ width: '100%', height: '288px' }} />
        <CardContent className="bg-gray-900">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* ... */}
          </div>
  
          <div style={{ marginTop: '0.75rem' }}>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold' }}>External_</span> It's getting cold out there!
            </Typography>
          </div>
          <Input placeholder="Add a comment..." style={{ width: '100%', padding: '0.25rem 0', backgroundColor: 'transparent', border: 'none', borderRadius: '4px', fontSize: '14px', color: '#ECEFF1' }} />
        </CardContent>
      </div>
    </div>
  </div>
  
      
  );
}

export default PostComponent;
