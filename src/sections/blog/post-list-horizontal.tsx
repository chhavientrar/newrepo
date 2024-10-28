/* eslint-disable no-nested-ternary */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IPostItem } from 'src/types/blog';

import { PostItemSkeleton } from './post-skeleton';
import PostItemHorizontal from './post-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  loading?: boolean;
};

export default function PostListHorizontal({ posts, loading }: Props) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <PostItemSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  const renderList = (
    <>
      {posts?.map((post) => (
        <PostItemHorizontal key={post.id} post={post} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={1}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {loading ? (
          renderSkeleton
        ) : posts?.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center" // Horizontally center
            width="100%" // Ensure full width for horizontal centering
            my={2} // Add vertical margin for spacing from top and bottom
          >
            <Typography variant="h6" color="text.secondary">
              No projects have been added yet.
            </Typography>
          </Box>
        ) : (
          renderList
        )}
      </Box>

      {/* Uncomment this if pagination is needed */}
      {/* {posts?.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )} */}
    </>
  );
}
