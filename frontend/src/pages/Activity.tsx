import { Box, Typography } from '@mui/material';

export const Activity = () => {
  return (
    <Box
      component='section'
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant='h2' sx={{ p: 2 }}>
        This is Single Activity page
      </Typography>
    </Box>
  );
};
