import { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Surface, ProgressBar, Button, IconButton } from 'react-native-paper';
import { Plus, ChevronRight } from 'lucide-react-native';
import { sampleData } from '../../data/sampleData';
import { formatCurrency } from '../../utils/formatters';
import BudgetCategoryModal from '../../components/budget/BudgetCategoryModal';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as colors from '../../utils/colors';
import { getStatusColor } from '../../utils/colors';

export default function BudgetScreen() {
  const [budgets, setBudgets] = useState(sampleData.budgets);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState<(typeof budgets)[0] | null>(null);
  
  const handleAddBudget = () => {
    setEditingBudget(null);
    setModalVisible(true);
  };
  
  const handleEditBudget = (budget: (typeof budgets)[0]) => {
    setEditingBudget(budget);
    setModalVisible(true);
  };
  
  const handleSaveBudget = (category: string, amount: number) => {
    if (editingBudget) {
      // Update existing budget
      setBudgets(prevBudgets => 
        prevBudgets.map(budget => 
          budget.id === editingBudget.id
            ? { ...budget, category, amount }
            : budget
        )
      );
    } else {
      // Add new budget
      const newBudget = {
        id: `budget-${Date.now()}`,
        category,
        amount,
        spent: 0,
        color: colors.getCategoryColor(category),
      };
      setBudgets(prevBudgets => [...prevBudgets, newBudget]);
    }
    setModalVisible(false);
  };
  
  // Calculate total budget and spending
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const budgetUsagePercentage = totalBudget > 0 ? (totalSpent / totalBudget) : 0;
  
  const renderBudgetItem = useCallback(({ item, index }: { item: typeof budgets[0], index: number }) => {
    const percentage = item.amount > 0 ? (item.spent / item.amount) : 0;
    const isOverBudget = item.spent > item.amount;
    const statusColor = getStatusColor(percentage);
    
    return (
      <Animated.View 
        entering={FadeInDown.delay(index * 100).springify()} 
        style={styles.itemContainer}
      >
        <TouchableOpacity
          style={styles.budgetItem}
          onPress={() => handleEditBudget(item)}
        >
          <View style={styles.categoryContainer}>
            <View style={[styles.categoryIndicator, { backgroundColor: item.color }]} />
            <View style={styles.categoryDetails}>
              <Text style={styles.categoryName}>{item.category}</Text>
              <View style={styles.amountContainer}>
                <Text style={[
                  styles.spentAmount, 
                  isOverBudget && styles.overBudgetText
                ]}>
                  {formatCurrency(item.spent)}
                </Text>
                <Text style={styles.budgetLimit}>
                  {' of '}{formatCurrency(item.amount)}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={Math.min(percentage, 1)}
              color={statusColor}
              style={styles.progressBar}
            />
            <View style={styles.percentageContainer}>
              <Text style={[
                styles.percentageText,
                isOverBudget && styles.overBudgetText
              ]}>
                {Math.round(percentage * 100)}%
              </Text>
              <ChevronRight size={16} color={colors.neutral.text.muted} />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [budgets]);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Surface style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Monthly Budget</Text>
            <Text style={styles.monthText}>June 2025</Text>
          </View>
          
          <View style={styles.budgetDetails}>
            <View style={styles.budgetTextContainer}>
              <Text style={styles.spentText}>
                {formatCurrency(totalSpent)}
                <Text style={styles.totalBudgetText}>
                  {' of '}{formatCurrency(totalBudget)}
                </Text>
              </Text>
            </View>
            
            <ProgressBar
              progress={Math.min(budgetUsagePercentage, 1)}
              color={getStatusColor(budgetUsagePercentage)}
              style={styles.summaryProgress}
            />
            
            <Text style={[
              styles.remainingText, 
              { color: getStatusColor(budgetUsagePercentage) }
            ]}>
              {budgetUsagePercentage <= 1 
                ? `${formatCurrency(totalBudget - totalSpent)} remaining`
                : `${formatCurrency(totalSpent - totalBudget)} over budget`
              }
            </Text>
          </View>
        </Surface>
      </View>
      
      <View style={styles.budgetListHeader}>
        <Text style={styles.sectionTitle}>Budget Categories</Text>
        <Button
          mode="text"
          onPress={handleAddBudget}
          icon={({ size, color }) => <Plus size={size} color={color} />}
          labelStyle={styles.addButtonLabel}
        >
          Add Category
        </Button>
      </View>
      
      <FlatList
        data={budgets}
        keyExtractor={item => item.id}
        renderItem={renderBudgetItem}
        contentContainerStyle={styles.budgetList}
        showsVerticalScrollIndicator={false}
      />
      
      <BudgetCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveBudget}
        initialBudget={editingBudget}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: colors.neutral.card,
    shadowColor: colors.primary.main + '40',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.primary.main,
  },
  monthText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral.text.muted,
  },
  budgetDetails: {
    marginBottom: 8,
  },
  budgetTextContainer: {
    marginBottom: 8,
  },
  spentText: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: colors.neutral.text.primary,
  },
  totalBudgetText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral.text.muted,
  },
  summaryProgress: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  remainingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'right',
  },
  budgetListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.neutral.text.primary,
  },
  addButtonLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary.main,
  },
  budgetList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    marginBottom: 12,
  },
  budgetItem: {
    backgroundColor: colors.neutral.card,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: colors.primary.main + '20',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral.text.primary,
    marginBottom: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spentAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.neutral.text.primary,
  },
  budgetLimit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral.text.muted,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  percentageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral.text.secondary,
    marginRight: 4,
  },
  overBudgetText: {
    color: colors.accent.error,
  },
});