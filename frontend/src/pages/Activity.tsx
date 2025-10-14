import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityDetail } from '../api';
import type { IRecommendation } from '../api/interface';

export const Activity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<IRecommendation | null>(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (id) fetchActivityDetail(id);
  }, [id]);

  const fetchActivityDetail = async (id: string) => {
    try {
      const response = await getActivityDetail(id);
      setActivity(response.data);
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error(error);
    }
  };

  if (!activity) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {activity.recommendation}
    </Box>
  );
};
