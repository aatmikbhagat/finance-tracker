import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Transaction History
      </Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem
            key={transaction._id}
            sx={{
              borderLeft: 6,
              borderColor: transaction.type === 'income' ? 'success.main' : 'error.main',
              mb: 1,
            }}
          >
            <ListItemText
              primary={transaction.description}
              secondary={`${transaction.category} - ${new Date(transaction.date).toLocaleDateString()}`}
            />
            <ListItemSecondaryAction>
              <Typography
                variant="body1"
                color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                sx={{ mr: 2 }}
              >
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </Typography>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(transaction._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TransactionList; 