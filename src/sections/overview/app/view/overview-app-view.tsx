import axios from 'axios';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _appFeatured } from 'src/_mock';
import { SeoIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import SkillCard from './skillcard';
import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppTopRelated from '../app-top-related';
import ConnectSocialMedia from './connectsocialmedia';
import ProjectCards from './connectsocialmedia/projectcard';

// ----------------------------------------------------------------------

interface UserData {
  name: string;
  phoneNo: any;
  profileImageUrl: any;
  email: string;
  skills: any[];
  projects: any[];
  socialMediaLinks: SocialMediaLink[];
}

interface Article {
  title: string;
  link: string;
}

interface SocialMediaLink {
  platform: string;
  link: string;
}

export default function OverviewAppView() {
  const settings = useSettingsContext();

  const [userData, setUserdata] = useState<UserData | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/users/me', {
        headers: {
          'auth-token': `${window.localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      });

      const user = response?.data;
      setUserdata(user);

      if (user.skills && user.skills.length > 0) {
        const skillsString = user.skills.join(', ');

        const feedResponse = await axios.post(
          '/feeds/latest-articles',
          {
            skill: skillsString,
          },
          {
            headers: {
              'auth-token': `${window.localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const articlesData = feedResponse?.data?.articles.map((article: any) => ({
          title: article.title,
          link: article.link,
        }));

        setArticles(articlesData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3} sx={{ mt: 1 }}>


        <Grid md={8} lg={8} xs={12}>
          <AppWelcome
            title={`Welcome back 👋 \n ${userData?.name}`}
            description={`Phone No: ${userData?.phoneNo}`}
            otherinfo={`Email : ${userData?.email}`}
            userData={userData}
            img={<SeoIllustration profilePic={userData?.profileImageUrl} />}
            socialMediaLinks={userData?.socialMediaLinks || []} // Pass social media links here
          />
          <SkillCard skillsArray={userData?.skills} title="Skills" />

          <ConnectSocialMedia
            title="Proof of Work"
            socialMediaLinks={userData?.socialMediaLinks || []}
          />
          <ProjectCards posts={userData?.projects} title="Your Projects" />

        </Grid>
        <Grid sx={{
          height: "600px"
        }} md={4} lg={4} xs={12}>
          <AppTopRelated title="Top Related Articles" list={articles} />
          <AppFeatured list={_appFeatured} />
        </Grid>
      </Grid>
    </Container>
  );
}
