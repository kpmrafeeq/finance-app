import { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Searchbar, Chip, Surface, Divider } from 'react-native-paper';
import { Calendar, ArrowDownNarrowWide, Filter } from 'lucide-react-native';
import { sampleData } from '../../data/sampleData';
import TransactionItem from '../../components/transactions/TransactionItem';
import FilterModal from '../../components/transactions/FilterModal';
import { formatCurrency } from '../../utils/formatters';

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(sampleData.transactions);
  const [filteredTransactions, setFilteredTransactions] = useState(sampleData.transactions);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (item) => 
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  const toggleSort = () => {
    if (sortBy === 'date') {
      setSortBy('amount');
    } else {
      setSortBy('date');
    }
    
    // Apply sorting to filtered transactions
    sortTransactions(sortBy, sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    
    // Apply sorting direction to filtered transactions
    sortTransactions(sortBy, newDirection);
  };

  const sortTransactions = (by: 'date' | 'amount', direction: 'asc' | 'desc') => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      if (by === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });
    
    setFilteredTransactions(sorted);
  };

  const applyFilters = (categories: string[], dateRange: { start?: Date; end?: Date }) => {
    let filtered = [...transactions];
    
    // Apply category filters
    if (categories.length > 0) {
      filtered = filtered.filter(item => categories.includes(item.category));
    }
    
    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(item => {
        const transactionDate = new Date(item.date);
        return (
          transactionDate >= dateRange.start && 
          transactionDate <= dateRange.end
        );
      });
    }
    
    setFilteredTransactions(filtered);
    setActiveFilters(categories);
    setFilterModalVisible(false);
  };

  const removeFilter = (filter: string) => {
    const updatedFilters = activeFilters.filter(f => f !== filter);
    setActiveFilters(updatedFilters);
    
    // Reapply filters
    if (updatedFilters.length === 0) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(item => updatedFilters.includes(item.category));
      setFilteredTransactions(filtered);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilteredTransactions(transactions);
  };

  // Calculate total amount
  const totalAmount = filteredTransactions.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search transactions"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#0A2463"
        />
        
        <View style={styles.filterActions}>
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={toggleSort}
          >
            <Text style={styles.actionText}>
              {sortBy === 'date' ? 'Date' : 'Amount'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sortDirectionButton} 
            onPress={toggleSortDirection}
          >
            <ArrowDownNarrowWide 
              size={16} 
              color="#0A2463" 
              style={[
                styles.sortIcon, 
                sortDirection === 'asc' && styles.sortIconReversed
              ]} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Filter size={20} color="#0A2463" />
          </TouchableOpacity>
        </View>
      </View>
      
      {activeFilters.length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {activeFilters.map((filter) => (
              <Chip
                key={filter}
                style={styles.filterChip}
                onClose={() => removeFilter(filter)}
                onPress={() => removeFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      
      <View style={styles.summaryContainer}>
        <Surface style={styles.summaryCard}>
          <View style={styles.summaryDetails}>
            <Text style={styles.summaryLabel}>
              {filteredTransactions.length} {filteredTransactions.length === 1 ? 'Transaction' : 'Transactions'}
            </Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalAmount)}</Text>
          </View>
          
          <View style={styles.dateContainer}>
            <Calendar size={16} color="#718096" />
            <Text style={styles.dateText}>
              Last 30 days
            </Text>
          </View>
        </Surface>
      </View>
      
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      />
      
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        categories={Array.from(
          new Set(transactions.map((item) => item.category))
        )}
        activeFilters={activeFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    backgroundColor: '#F7FAFC',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 48,
    borderRadius: 8,
  },
  searchInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  filterActions: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#EBF8FF',
  },
  sortDirectionButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#EBF8FF',
    marginRight: 8,
  },
  sortIcon: {
    transform: [{ rotate: '0deg' }],
  },
  sortIconReversed: {
    transform: [{ rotate: '180deg' }],
  },
  filterButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#EBF8FF',
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#0A2463',
  },
  activeFiltersContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filtersScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: '#EBF8FF',
  },
  clearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#3AAFB9',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  summaryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  summaryAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0A2463',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  divider: {
    backgroundColor: '#E2E8F0',
    height: 1,
  },
});