import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';

interface Transaction {
  amount: number;
  type: 'income' | 'expense';
}

const Balance: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <Box sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Your Balance
        </Typography>
        <Typography variant="h4" color={balance >= 0 ? 'success.main' : 'error.main'}>
          ${balance.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box>
            <Typography variant="subtitle1">Income</Typography>
            <Typography color="success.main">+${income.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Expenses</Typography>
            <Typography color="error.main">-${expenses.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Balance; 