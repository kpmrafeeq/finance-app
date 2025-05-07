import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/colors';
import * as colors from '../../utils/colors';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { description, amount, date, category } = transaction;
  
  // Use our new color helper function
  const categoryColor = getCategoryColor(category);
  
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <View style={[styles.categoryIndicator, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryInitial}>
              {category.charAt(0)}
            </Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.description} numberOfLines={1}>
              {description}
            </Text>
            <Text style={styles.date}>{formatDate(date)}</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={styles.amount}>
            {formatCurrency(amount)}
          </Text>
          <Surface style={[styles.categoryTag, { backgroundColor: categoryColor + '20' }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {category}
            </Text>
          </Surface>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.neutral.card,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  categoryIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 1,
  },
  categoryInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.primary.contrast,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral.text.primary,
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral.text.muted,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.neutral.text.primary,
    marginBottom: 4,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    elevation: 0,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
  },
});

export default TransactionItem;