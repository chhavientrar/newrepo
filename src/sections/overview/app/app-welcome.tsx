import axios from 'axios';
import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import { alpha, useTheme } from '@mui/material/styles';
import Stack, { StackProps } from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

interface SocialMediaLink {
  platform: string;
  link: string;
}

type Props = StackProps & {
  title?: string;
  description?: any;
  otherinfo?: any;
  img?: React.ReactNode;
  action?: React.ReactNode;
  userData?: any;
  socialMediaLinks?: SocialMediaLink[];
};

const platformIcons: { [key: string]: string } = {
  LinkedIn: 'eva:linkedin-fill',
  Twitter: 'eva:twitter-fill',
  GitHub: 'eva:github-fill',
};

export default function AppWelcome({
  title,
  description,
  otherinfo,
  action,
  img,
  userData,
  socialMediaLinks,
  ...other
}: Props) {
  const theme = useTheme();

  // State for managing hover and modal
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle file upload to API
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);
    console.log(file)


    try {
      await axios.put(`/users/${userData?._id}/profile-image`, formData, {
        headers: {
          'auth-token': `${window.localStorage.getItem('auth-token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      handleClose(); // Close modal after success
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Stack
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette.primary.light, 0.2),
          endColor: alpha(theme.palette.primary.main, 0.2),
        }),
        height: { xs: 400, md: 300 },
        borderRadius: 2,
        position: 'relative',
        color: 'primary.darker',
        backgroundColor: 'common.white',
      }}
      {...other}
    >
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: {
            xs: theme.spacing(5, 3, 0, 3),
            md: theme.spacing(5),
          },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
          {title}
        </Typography>
        {description}
        <Typography> {otherinfo}</Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {socialMediaLinks?.map((link) => (
            <IconButton
              key={link.platform}
              component="a"
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: platformIcons[link.platform] ? 'primary.main' : 'text.secondary' }}
            >
              <Iconify
                icon={platformIcons[link.platform] || 'eva:external-link-outline'}
                width={24}
                height={24}
              />
            </IconButton>
          ))}
        </Stack>

        {action && action}
      </Stack>

      {/* Image section with hover effect */}
      {img && (
        <Stack
          component="span"
          justifyContent="center"
          sx={{
            p: { xs: 5, md: 3 },
            maxWidth: 360,
            mx: 'auto',
            position: 'relative',
            '&:hover .upload-icon': { opacity: 1 }, // Show icon on hover
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {img}

          {/* Upload icon */}
          <IconButton
            className="upload-icon"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
            onClick={handleOpen}
          >
            <Iconify icon="eva:upload-fill" width={24} height={24} />
          </IconButton>
        </Stack>
      )}

      {/* Popup for file upload */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Profile Image</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload} disabled={!file}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
