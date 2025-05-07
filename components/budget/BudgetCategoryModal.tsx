import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Modal, Portal, Button, TextInput } from 'react-native-paper';
import { Budget } from '../../types';
import { X } from 'lucide-react-native';
import { formatCurrency } from '../../utils/formatters';
import * as colors from '../../utils/colors';

interface BudgetCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (category: string, amount: number) => void;
  initialBudget: Budget | null;
}

const BudgetCategoryModal = ({
  visible,
  onClose,
  onSave,
  initialBudget,
}: BudgetCategoryModalProps) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    if (initialBudget) {
      setCategory(initialBudget.category);
      setAmount(initialBudget.amount.toString());
    } else {
      setCategory('');
      setAmount('');
    }
    setError(null);
  }, [initialBudget, visible]);
  
  useEffect(() => {
    // Validate form input
    const numAmount = parseFloat(amount);
    setIsFormValid(
      category.trim().length > 0 && 
      !isNaN(numAmount) && 
      numAmount > 0
    );
  }, [category, amount]);
  
  const handleAmountChange = (text: string) => {
    // Only allow numbers and decimal point
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(text) || text === '') {
      setAmount(text);
    }
  };
  
  const handleSave = () => {
    if (!category.trim()) {
      setError('Please enter a category name');
      return;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    onSave(category.trim(), numAmount);
  };
  
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {initialBudget ? 'Edit Budget Category' : 'New Budget Category'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={20} color="#718096" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.modalContent}>
          <TextInput
            label="Category Name"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            mode="outlined"
            outlineColor="#CBD5E0"
            activeOutlineColor="#3AAFB9"
          />
          
          <TextInput
            label="Monthly Budget Amount"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            outlineColor="#CBD5E0"
            activeOutlineColor="#3AAFB9"
            left={<TextInput.Affix text="$" />}
          />
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          {initialBudget && (
            <View style={styles.currentSpendingContainer}>
              <Text style={styles.currentSpendingText}>
                Current spending: {formatCurrency(initialBudget.spent)}
              </Text>
              <View style={styles.spendingPercentage}>
                <Text style={styles.percentageText}>
                  {initialBudget.amount > 0 
                    ? Math.round((initialBudget.spent / initialBudget.amount) * 100)
                    : 0
                  }% used
                </Text>
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={onClose}
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonLabel}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            style={[
              styles.saveButton,
              !isFormValid && styles.disabledSaveButton
            ]}
            labelStyle={[
              styles.saveButtonLabel,
              !isFormValid && styles.disabledSaveButtonLabel
            ]}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0A2463',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E53E3E',
    marginBottom: 16,
  },
  currentSpendingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
    marginBottom: 8,
  },
  currentSpendingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2D3748',
  },
  spendingPercentage: {
    backgroundColor: '#3AAFB9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#CBD5E0',
  },
  cancelButtonLabel: {
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#0A2463',
  },
  disabledSaveButton: {
    backgroundColor: colors.primary.disabled,
  },
  saveButtonLabel: {
    fontFamily: 'Inter-Medium',
    color: colors.primary.contrast,
  },
  disabledSaveButtonLabel: {
    color: colors.primary.contrast,
  },
});

export default BudgetCategoryModal;