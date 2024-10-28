import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

type Props = {
  post: IPostItem;
};

export default function PostItemHorizontal({ post }: Props) {
  const popover = usePopover();

  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const {
    title,
    // author,
    // publish,
    // coverUrl,
    // createdAt,
    // totalViews,
    // totalShares,
    // totalComments,
    description,
  } = post;

  return (
    <>
      <Stack component={Card}>
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >

          <Link color="inherit" component={RouterLink} href={paths.dashboard.post.details(title)}>
            <Stack>
              <Link color="inherit" component={RouterLink} href={paths.dashboard.post.details(title)}>
                <TextMaxLine variant="subtitle2">
                  {title}
                </TextMaxLine>
              </Link>

              <TextMaxLine line={7} variant="body1" sx={{ color: 'text.secondary' }}>
                {description}
              </TextMaxLine>
            </Stack>
          </Link>
        </Stack>

        {smUp && (
          <Box
            sx={{
              width: 180,
              // height: 170,
              position: 'relative',
              flexShrink: 0,
              p: 1,
            }}
          >
            <>
              {/* <Avatar
                // alt={author.name}
                src="https://api-prod-minimal-v6.pages.dev/assets/images/cover/cover-1.webp"
                sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}
              />
              <Image
                alt={title}
                src="https://api-prod-minimal-v6.pages.dev/assets/images/cover/cover-1.webp"
                sx={{ height: 1, borderRadius: 1.5 }}
              /> */}
            </>
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.post.details(title));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.post.edit(title));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
