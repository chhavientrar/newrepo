import axios from 'axios';
import GitHubCalendar from 'react-github-calendar';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';
import { Fab, Grid, CardHeader, Typography, CardContent } from '@mui/material';

import { HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify/iconify';

import AddProjectDialog from './add-project';
import AddSocialMediaDialog from './AddSocialMediaDialog';

interface SocialMediaLink {
  platform: string;
  link: string;
}

interface Props extends CardProps {
  title: string;
  socialMediaLinks: SocialMediaLink[];
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

const ConnectSocialMedia: React.FC<Props> = ({ title, socialMediaLinks, sx, ...other }) => {
  const theme = useTheme();
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [socialMediaDialogOpen, setSocialMediaDialogOpen] = useState(false);
  const [socialMediaName, setSocialMediaName] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [showGitHubButton, setShowGitHubButton] = useState(true);

  const handleProjectDialogOpen = () => setProjectDialogOpen(true);
  const handleProjectDialogClose = () => setProjectDialogOpen(false);

  console.log(accessToken);

  const handleSocialMediaDialogOpen = useCallback((name: string) => {
    setSocialMediaName(name);
    setSocialMediaDialogOpen(true);
  }, []);

  const handleSocialMediaDialogClose = useCallback(() => {
    setSocialMediaDialogOpen(false);
    setSocialMediaName('');
  }, []);

  const handleAddUrl = useCallback((url: string) => {
    console.log(`Adding URL for ${socialMediaName}: ${url}`);
  }, [socialMediaName]);

  const fetchGitHubUserData = useCallback(async (token: string) => {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${token}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  }, []);

  const fetchGitHubRepos = useCallback(async (token: string) => {
    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `token ${token}` },
      });
      const sortedRepos = response.data
        .sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);
      setRepos(sortedRepos);
    } catch (error) {
      console.error('Failed to fetch repositories', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('githubtoken');
    if (token) {
      setAccessToken(token);
      setShowGitHubButton(false);
      fetchGitHubUserData(token);
      fetchGitHubRepos(token);
    } else {
      const params = new URLSearchParams(window.location.search);
      const newToken = params.get('access_token');
      if (newToken) {
        localStorage.setItem('githubtoken', newToken);
        setAccessToken(newToken);
        fetchGitHubUserData(newToken);
        fetchGitHubRepos(newToken);
      }
    }
  }, [fetchGitHubUserData, fetchGitHubRepos]);

  const handleAuth = () => {
    window.location.href = `${HOST_API}/auth/github/github`;
  };

  // const handleLogout = useCallback(() => {
  //   setAccessToken(null);
  //   setUserData(null);
  //   setRepos([]);
  //   localStorage.removeItem('githubtoken');
  //   window.history.replaceState({}, document.title, "/");
  // }, []);

  const renderSocialMediaButton = (platform: string, icon: string, color: string) => (
    <Fab sx={{ borderRadius: '10px' }} color="default" variant="extended" onClick={() => handleSocialMediaDialogOpen(platform)}>
      <Iconify icon={icon} width={24} />
      {platform}
    </Fab>
  );

  const renderRepoCard = (repo: Repo) => (
    <Grid item xs={12} sm={12} md={12} lg={6} key={repo.id}>
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: '#1e1e1e',
          height: '200px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            {repo.name}
          </a>
        </Typography>
        <Typography variant="body2" sx={{ color: 'white' }}>
          {repo.description}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {repo.language}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );

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
          }}
        >
          <Grid sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {renderSocialMediaButton('LinkedIn', 'eva:linkedin-fill', '#0077B5')}
            {renderSocialMediaButton('Twitter', 'eva:twitter-fill', '#1DA1F2')}
            {showGitHubButton && (
              // <Fab sx={{ backgroundColor: '#333', color: 'white' }} onClick={handleAuth}>
              //   <Iconify icon="eva:github-fill" width={24} />
              // </Fab>
              <Fab sx={{ borderRadius: '10px' }} color="default" variant="extended" onClick={handleAuth}>
                <Iconify icon="eva:github-fill" width={24} />
                Github
              </Fab>
            )}
            <Fab sx={{ borderRadius: '10px' }} color="default" variant="extended" onClick={handleProjectDialogOpen}>
              <Iconify icon="eva:folder-add-outline" width={24} />
              Add Projects
            </Fab>
          </Grid>

          {!showGitHubButton && (
            <Card sx={{ display: 'flex', ...sx }} {...other}>
              <Box sx={{ flexGrow: 1 }}>
                <CardHeader title="Github" sx={{ color: 'white' }} />
                {userData?.login && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '90%', mt: 3, ml: 1 }}>
                    <GitHubCalendar
                      username={userData.login}
                      blockSize={8}
                      blockMargin={4}
                      fontSize={12}
                    // width={8000}
                    />
                  </Box>
                )}
                <CardContent>
                  <Grid container spacing={2}>
                    {repos?.map(renderRepoCard)}
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          )}
        </Box>
      </Box>

      <AddProjectDialog open={projectDialogOpen} onClose={handleProjectDialogClose} />
      <AddSocialMediaDialog
        open={socialMediaDialogOpen}
        onClose={handleSocialMediaDialogClose}
        socialMediaName={socialMediaName}
        onAdd={handleAddUrl}
      />
    </Card>
  );
};

export default ConnectSocialMedia;
