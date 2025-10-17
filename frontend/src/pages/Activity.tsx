import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityById, getActivityDetail } from '../api';
import type { IActivityResponse, IRecommendation } from '../api/interface';

export const Activity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<IActivityResponse | null>(null);
  const [recommendation, setRecommendation] = useState<IRecommendation | null>(
    null
  );

  useEffect(() => {
    if (id) {
      fetchActivityDetail(id);
      fetchActivityRecommendation(id);
    }
  }, [id]);

  const fetchActivityDetail = async (id: string) => {
    try {
      const response = await getActivityById(id);
      setActivity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivityRecommendation = async (id: string) => {
    try {
      const response = await getActivityDetail(id);
      setRecommendation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!activity && !recommendation) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {recommendation?.recommendation}
    </Box>
  );
};
