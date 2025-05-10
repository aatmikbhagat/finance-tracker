import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/transactions', {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: '',
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            label="Type"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Transaction
        </Button>
      </Box>
    </Paper>
  );
};

export default TransactionForm; 