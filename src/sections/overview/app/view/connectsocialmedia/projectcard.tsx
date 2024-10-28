import React from 'react';

import Box from '@mui/material/Box';
import { CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';

import PostListHorizontal from 'src/sections/blog/post-list-horizontal';

interface Props extends CardProps {
  title: string;
  posts: any;
}

const ProjectCards: React.FC<Props> = ({ title, posts, sx, ...other }) => {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', mt: 1, ...sx }} {...other}>
      <Box sx={{ flexGrow: 2 }}>
        <CardHeader title={title} />
        <Box
          sx={{
            mt: 1.2,
            display: 'flex',
            borderTop: `dashed 1px ${theme.palette.divider}`,
            flexWrap: 'wrap',
            gap: 1,
            p: 2,
          }}
        >
          {/* <PostList posts={posts} /> */}
          {/* <PostListView /> */}

          <PostListHorizontal posts={posts} />
        </Box>
      </Box>
    </Card>
  );
};

export default ProjectCards;
