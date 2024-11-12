import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
  CircularProgress,
  Typography,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { TicketFormData, TicketFormErrors } from './types';
import { validateForm } from './TicketFormValidation';
import { mockGroups } from '@/data/mock/mockGroups';
import { TicketPriority, TicketType } from '@/types/ticket.types';

export const TicketForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    type: TicketType.INCIDENT,
    priority: TicketPriority.MEDIUM,
    groupId: '',
    customerId: '',
    tags: [],
    attachments: null,
  });

  const [errors, setErrors] = useState<TicketFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof TicketFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'type'
          ? (value as TicketType)
          : name === 'priority'
            ? (value as TicketPriority)
            : value,
    }));
    if (errors[name as keyof TicketFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachments: e.target.files,
      }));
    }
  };

  const handleTagChange = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value.trim()) {
      e.preventDefault();
      const newTag = target.value.trim();
      // Prevent duplicate tags
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      target.value = '';
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        type: TicketType.INCIDENT,
        priority: TicketPriority.MEDIUM,
        groupId: '',
        customerId: '',
        tags: [],
        attachments: null,
      });
    } catch (error) {
      setErrors({ title: 'Failed to submit ticket. Please try again. Error: ' + error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 600,
        mx: 'auto',
        p: 3,
      }}
    >
      {success && (
        <Alert severity='success' sx={{ mb: 2 }}>
          Ticket created successfully!
        </Alert>
      )}

      <Typography variant='h4' component='h1' gutterBottom>
        Create Support Ticket
      </Typography>

      <TextField
        fullWidth
        label='Title'
        name='title'
        value={formData.title}
        onChange={handleTextChange}
        error={!!errors.title}
        helperText={errors.title}
        disabled={loading}
      />

      <FormControl fullWidth error={!!errors.type}>
        <InputLabel>Type</InputLabel>
        <Select name='type' value={formData.type} onChange={handleSelectChange} disabled={loading}>
          {Object.values(TicketType).map((type) => (
            <MenuItem key={type} value={type}>
              {type.replace('_', ' ')}
            </MenuItem>
          ))}
        </Select>
        {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth error={!!errors.groupId}>
        <InputLabel>Group</InputLabel>
        <Select
          name='groupId'
          value={formData.groupId}
          onChange={handleSelectChange}
          disabled={loading}
        >
          {mockGroups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
        {errors.groupId && <FormHelperText>{errors.groupId}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth error={!!errors.priority}>
        <InputLabel>Priority</InputLabel>
        <Select
          name='priority'
          value={formData.priority}
          onChange={handleSelectChange}
          disabled={loading}
        >
          {Object.values(TicketPriority).map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </Select>
        {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={4}
        label='Description'
        name='description'
        value={formData.description}
        onChange={handleTextChange}
        error={!!errors.description}
        helperText={errors.description}
        disabled={loading}
      />

      <Box>
        <TextField fullWidth label='Add Tags' onKeyDown={handleTagChange} disabled={loading} />
        <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
          {formData.tags.map((tag) => (
            <Chip key={tag} label={tag} onDelete={() => handleTagDelete(tag)} disabled={loading} />
          ))}
        </Stack>
      </Box>

      <Button component='label' variant='outlined' startIcon={<CloudUpload />} disabled={loading}>
        Upload Attachments
        <input
          type='file'
          hidden
          multiple
          onChange={handleFileChange}
          accept='.pdf,.doc,.docx,.jpg,.png'
        />
      </Button>
      {formData.attachments && formData.attachments.length > 0 && (
        <Typography variant='body2' color='textSecondary'>
          {formData.attachments.length} file(s) selected
        </Typography>
      )}
      {errors.attachments && (
        <Typography variant='body2' color='error'>
          {errors.attachments}
        </Typography>
      )}

      <Button type='submit' variant='contained' color='primary' disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} color='inherit' /> : 'Submit Ticket'}
      </Button>
    </Box>
  );
};

export default TicketForm;
