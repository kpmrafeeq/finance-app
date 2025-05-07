import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Portal, Button, Chip, Surface } from 'react-native-paper';
import { Calendar, RefreshCw, X } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (categories: string[], dateRange: { start?: Date; end?: Date }) => void;
  categories: string[];
  activeFilters: string[];
}

const FilterModal = ({ 
  visible, 
  onClose, 
  onApply, 
  categories, 
  activeFilters 
}: FilterModalProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(activeFilters);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setDateRange({});
  };
  
  const handleApply = () => {
    onApply(selectedCategories, dateRange);
  };
  
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filter Transactions</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={20} color="#718096" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
                <RefreshCw size={14} color="#3AAFB9" />
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  mode="outlined"
                  selected={selectedCategories.includes(category)}
                  onPress={() => toggleCategory(category)}
                  style={[
                    styles.categoryChip,
                    selectedCategories.includes(category) && styles.selectedChip,
                  ]}
                  textStyle={[
                    styles.chipText,
                    selectedCategories.includes(category) && styles.selectedChipText,
                  ]}
                >
                  {category}
                </Chip>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date Range</Text>
            
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Calendar size={20} color="#718096" />
              <Text style={styles.datePickerText}>
                {dateRange.start && dateRange.end
                  ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
                  : 'Select date range'
                }
              </Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateRangePicker
                onConfirm={(range) => {
                  setDateRange(range);
                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
                initialRange={dateRange}
              />
            )}
          </View>
        </ScrollView>
        
        <Surface style={styles.buttonContainer}>
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
            onPress={handleApply}
            style={styles.applyButton}
            labelStyle={styles.applyButtonLabel}
          >
            Apply Filters
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
};

// This is a simplified DateRangePicker component for illustration
// In a real app, you would use a proper date picker library
function DateRangePicker({ 
  onConfirm, 
  onCancel, 
  initialRange 
}: { 
  onConfirm: (range: { start?: Date; end?: Date }) => void;
  onCancel: () => void;
  initialRange: { start?: Date; end?: Date };
}) {
  // For simplicity, this is just setting a predefined range
  // In a real app, you would use a calendar UI component
  
  const setLastWeek = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);
    onConfirm({ start, end });
  };
  
  const setLastMonth = () => {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 1);
    onConfirm({ start, end });
  };
  
  const setLast3Months = () => {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 3);
    onConfirm({ start, end });
  };

  return (
    <View style={styles.dateRangeContainer}>
      <Text style={styles.dateRangeTitle}>Select a predefined range:</Text>
      
      <TouchableOpacity 
        style={styles.dateRangeOption} 
        onPress={setLastWeek}
      >
        <Text style={styles.dateRangeOptionText}>Last 7 days</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.dateRangeOption} 
        onPress={setLastMonth}
      >
        <Text style={styles.dateRangeOptionText}>Last 30 days</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.dateRangeOption} 
        onPress={setLast3Months}
      >
        <Text style={styles.dateRangeOptionText}>Last 3 months</Text>
      </TouchableOpacity>
      
      <Button onPress={onCancel} style={styles.dateRangeCancel}>
        Cancel
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
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
    maxHeight: 500,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 12,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#3AAFB9',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    margin: 4,
    backgroundColor: '#F7FAFC',
  },
  selectedChip: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3AAFB9',
  },
  chipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  selectedChipText: {
    color: '#3AAFB9',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
  },
  datePickerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
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
  applyButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#0A2463',
  },
  applyButtonLabel: {
    fontFamily: 'Inter-Medium',
  },
  dateRangeContainer: {
    marginTop: 12,
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 8,
  },
  dateRangeTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2D3748',
    marginBottom: 12,
  },
  dateRangeOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dateRangeOptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A5568',
  },
  dateRangeCancel: {
    marginTop: 12,
  },
});

export default FilterModal;