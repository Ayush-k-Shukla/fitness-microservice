import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { addActivity } from '../api';
import type { IBaseActivity } from '../api/interface';

interface CreateActivityProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateActivity = ({
  open,
  onClose,
  onSuccess,
}: CreateActivityProps) => {
  const [formData, setFormData] = useState<IBaseActivity>({
    activityType: '',
    duration: 0,
    caloriesBurned: 0,
    startedAt: '',
    additionalMetrics: new Map(),
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addActivity(formData);
      onSuccess();
      onClose();
      setFormData({
        activityType: '',
        duration: 0,
        caloriesBurned: 0,
        startedAt: new Date().toISOString(),
        additionalMetrics: new Map(),
      });
    } catch (e) {
      console.log(e);
      setError('Failed to create activity. Please try again.');
    }
  };

  const handleChange =
    (field: keyof IBaseActivity) =>
    (
      e: React.ChangeEvent<HTMLInputElement> | { target: { value: unknown } }
    ) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === 'duration' || field === 'caloriesBurned'
            ? Number(value)
            : value,
      }));
      console.log(formData);
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Create New Activity</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl required fullWidth>
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={formData.activityType}
                onChange={handleChange('activityType')}
                label='Activity Type'
                required
              >
                <MenuItem value='WALKING'>Walking</MenuItem>
                <MenuItem value='SWIMMING'>Swimming</MenuItem>
                <MenuItem value='RUNNING'>Running</MenuItem>
                <MenuItem value='YOGA'>Yoga</MenuItem>
                <MenuItem value='CARDIO'>Cardio</MenuItem>
                <MenuItem value='OTHER'>Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              label='Duration (minutes)'
              type='number'
              value={formData.duration}
              onChange={handleChange('duration')}
              InputProps={{ inputProps: { min: 0 } }}
            />

            <TextField
              required
              label='Calories Burned'
              type='number'
              value={formData.caloriesBurned}
              onChange={handleChange('caloriesBurned')}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label='Started At'
                value={dayjs(formData.startedAt)}
                onChange={(newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    startedAt: newValue
                      ? newValue.toISOString()
                      : new Date().toISOString(),
                  }));
                }}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained' color='primary'>
            Create Activity
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
