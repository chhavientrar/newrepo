import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type ArticleProps = {
  title: string;
  link: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ArticleProps[];
}

export default function AppTopRelated({ title, subheader, list, ...other }: Props) {
  const hasArticles = list && list.length > 0;

  return (
    <Card {...other} sx={{ height: 624 }}> {/* Set the fixed height here */}
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 1, minWidth: 360, maxHeight: '100%', overflow: 'auto' }}>
          {hasArticles ? (
            list.map((article, index) => (
              <ArticleItem key={index} article={article} index={index + 1} />
            ))
          ) : (
            // Center the message both vertically and horizontally
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                You did not add any skills, please add your skills; these articles are related to your articles.
              </Typography>
            </Box>
          )}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ArticleItemProps = {
  article: ArticleProps;
  index: number;
};

function ArticleItem({ article, index }: ArticleItemProps) {
  const { title, link } = article;

  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      {/* Display the index before the title */}
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {index}.
      </Typography>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Stack>
  );
}
