import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Surface, Title, Caption } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { formatCurrency } from '../../utils/formatters';
import { sampleData } from '../../data/sampleData';
import * as colors from '../../utils/colors';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const isFocused = useIsFocused();
  const [monthlyData, setMonthlyData] = useState(sampleData.monthlySpending);
  const [categoryData, setCategoryData] = useState(sampleData.spendingByCategory);
  const [totalSpent, setTotalSpent] = useState(0);
  const [topCategory, setTopCategory] = useState({ name: '', amount: 0 });

  useEffect(() => {
    if (isFocused) {
      // Calculate total spent
      const total = categoryData.reduce((sum, item) => sum + item.amount, 0);
      setTotalSpent(total);
      
      // Find top category
      const top = [...categoryData].sort((a, b) => b.amount - a.amount)[0];
      setTopCategory(top || { name: 'None', amount: 0 });
    }
  }, [isFocused, categoryData]);

  const chartConfig = {
    backgroundGradientFrom: colors.neutral.card,
    backgroundGradientTo: colors.neutral.card,
    color: (opacity = 1) => `rgba(67, 97, 238, ${opacity})`, // primary.main
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 10,
      fontFamily: 'Inter-Medium',
      fill: colors.neutral.text.secondary,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.primary.light,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Financial Summary</Text>
      </View>
      
      <View style={styles.summaryCards}>
        <Surface style={styles.card}>
          <Title style={styles.cardTitle}>Total Spent</Title>
          <Text style={styles.cardAmount}>{formatCurrency(totalSpent)}</Text>
          <Caption style={styles.cardCaption}>This Month</Caption>
        </Surface>
        
        <Surface style={styles.card}>
          <Title style={styles.cardTitle}>Top Category</Title>
          <Text style={styles.cardAmount}>{formatCurrency(topCategory.amount)}</Text>
          <Caption style={styles.cardCaption}>{topCategory.name}</Caption>
        </Surface>
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Spending by Category</Text>
        <PieChart
          data={categoryData.map(item => ({
            name: item.name,
            population: item.amount,
            color: item.color,
            legendFontColor: colors.neutral.text.secondary,
            legendFontSize: 12,
            legendFontFamily: 'Inter-Medium',
          }))}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
          hasLegend={true}
          avoidFalseZero
        />
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Spending Trend</Text>
        <LineChart
          data={{
            labels: monthlyData.map(item => item.month),
            datasets: [
              {
                data: monthlyData.map(item => item.amount),
                color: (opacity = 1) => `rgba(76, 201, 240, ${opacity})`, // primary.light
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            ...chartConfig,
            backgroundGradientFrom: colors.neutral.background,
            backgroundGradientTo: colors.neutral.background,
            fillShadowGradient: colors.primary.main,
            fillShadowGradientOpacity: 0.3,
          }}
          bezier
          style={styles.lineChart}
        />
      </View>
      
      <View style={styles.insightContainer}>
        <Text style={styles.insightTitle}>Insights</Text>
        <Text style={styles.insightText}>
          Your spending in <Text style={styles.highlight}>{topCategory.name}</Text> is higher
          than other categories. Consider reviewing your budget for this category.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.primary.main,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: colors.neutral.card,
    shadowColor: colors.primary.main + '30',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral.text.secondary,
  },
  cardAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.primary.main,
    marginVertical: 8,
  },
  cardCaption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral.text.muted,
  },
  chartContainer: {
    marginVertical: 16,
    backgroundColor: colors.neutral.card,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: colors.primary.main + '20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.primary.main,
    marginBottom: 16,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 12,
  },
  insightContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.primary.light + '15',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
    marginBottom: 32,
    shadowColor: colors.primary.main + '20',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  insightTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.primary.main,
    marginBottom: 8,
  },
  insightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral.text.secondary,
    lineHeight: 20,
  },
  highlight: {
    fontFamily: 'Inter-Bold',
    color: colors.primary.dark,
  },
});