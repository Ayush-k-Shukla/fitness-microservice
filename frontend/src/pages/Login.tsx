import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Box, Button, Container, Paper, Typography } from '@mui/material';

export const Login = ({ logIn }: { logIn: () => void }) => {
  return (
    <Container
      maxWidth='sm'
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b3a 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: '100% !important',
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: 4,
          mx: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(30, 30, 40, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '100%',
          maxWidth: '400px',
          margin: 'auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '3px',
            background:
              'linear-gradient(90deg, #6b46c1 0%, #9f7aea 50%, #6b46c1 100%)',
            animation: 'shimmer 3s infinite linear',
          },
          '@keyframes shimmer': {
            '0%': { transform: 'translateX(-50%)' },
            '100%': { transform: 'translateX(50%)' },
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            mb: 3,
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '150%',
              height: '150%',
              top: '-80%',
              left: '-25%',
              background:
                'radial-gradient(circle, rgba(107, 70, 193, 0.2) 0%, transparent 70%)',
              zIndex: 0,
            },
          }}
        >
          <FitnessCenterIcon
            sx={{
              fontSize: 60,
              color: '#9f7aea',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 0 10px rgba(159, 122, 234, 0.5))',
            }}
          />
        </Box>
        <Typography
          variant='h3'
          sx={{
            p: 2,
            mb: 2,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(159, 122, 234, 0.3)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Welcome to Fitness AI
        </Typography>
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Your intelligent fitness companion powered by AI
        </Typography>
        <Button
          variant='contained'
          size='large'
          onClick={() => logIn()}
          sx={{
            py: 1.5,
            px: 6,
            borderRadius: '50px',
            fontSize: '1.1rem',
            textTransform: 'none',
            background: 'linear-gradient(45deg, #6b46c1 30%, #9f7aea 90%)',
            boxShadow: '0 4px 20px rgba(159, 122, 234, 0.4)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 25px rgba(159, 122, 234, 0.5)',
              background: 'linear-gradient(45deg, #805ad5 30%, #b794f4 90%)',
            },
            '&:active': {
              transform: 'translateY(1px)',
            },
          }}
        >
          Get Started
        </Button>
      </Paper>
    </Container>
  );
};
