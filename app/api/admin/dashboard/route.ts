import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin, getAllUsers } from '@/lib/auth';
import { getPaymentsCollection } from '@/lib/mongodb';
import { startOfWeek, startOfMonth, startOfYear, subDays, subWeeks, subMonths, format } from 'date-fns';

// GET /api/admin/dashboard
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const currentUser = await getCurrentUser(request);
    if (!currentUser || !isAdmin(currentUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'month'; // week, month, year

    // Get collections
    const users = await getAllUsers();
    const paymentsCollection = await getPaymentsCollection();

    // Calculate date ranges
    const now = new Date();
    const startOfCurrentWeek = startOfWeek(now);
    const startOfCurrentMonth = startOfMonth(now);
    const startOfCurrentYear = startOfYear(now);

    // Get all payments
    const allPayments = await paymentsCollection.find({}).sort({ createdAt: -1 }).toArray();

    // === OVERVIEW METRICS ===
    const totalUsers = users.length;
    const totalPayments = allPayments.length;
    const approvedPayments = allPayments.filter(p => p.status === 'approved');
    const pendingPayments = allPayments.filter(p => p.status === 'pending');
    const rejectedPayments = allPayments.filter(p => p.status === 'rejected');
    
    const totalRevenue = approvedPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const averageOrderValue = approvedPayments.length > 0 ? totalRevenue / approvedPayments.length : 0;

    // === TIME-BASED ANALYSIS ===
    
    // Get payments for different time periods
    const last30Days = subDays(now, 30);
    const last7Days = subDays(now, 7);
    const lastWeek = subWeeks(now, 1);
    const lastMonth = subMonths(now, 1);

    const paymentsLast30Days = allPayments.filter(p => new Date(p.createdAt) >= last30Days);
    const paymentsLast7Days = allPayments.filter(p => new Date(p.createdAt) >= last7Days);
    const paymentsLastWeek = allPayments.filter(p => 
      new Date(p.createdAt) >= subWeeks(startOfCurrentWeek, 1) && 
      new Date(p.createdAt) < startOfCurrentWeek
    );
    const paymentsLastMonth = allPayments.filter(p => 
      new Date(p.createdAt) >= subMonths(startOfCurrentMonth, 1) && 
      new Date(p.createdAt) < startOfCurrentMonth
    );

    // Calculate growth rates
    const weeklyGrowth = paymentsLastWeek.length > 0 
      ? ((paymentsLast7Days.length - paymentsLastWeek.length) / paymentsLastWeek.length * 100)
      : paymentsLast7Days.length > 0 ? 100 : 0;

    const monthlyGrowth = paymentsLastMonth.length > 0 
      ? ((paymentsLast30Days.length - paymentsLastMonth.length) / paymentsLastMonth.length * 100)
      : paymentsLast30Days.length > 0 ? 100 : 0;

    // === REVENUE ANALYSIS ===
    const revenueLast30Days = paymentsLast30Days
      .filter(p => p.status === 'approved')
      .reduce((sum, p) => sum + p.amount, 0);

    const revenueLast7Days = paymentsLast7Days
      .filter(p => p.status === 'approved')
      .reduce((sum, p) => sum + p.amount, 0);

    const revenueLastWeek = paymentsLastWeek
      .filter(p => p.status === 'approved')
      .reduce((sum, p) => sum + p.amount, 0);

    const revenueGrowth = revenueLastWeek > 0 
      ? ((revenueLast7Days - revenueLastWeek) / revenueLastWeek * 100)
      : revenueLast7Days > 0 ? 100 : 0;

    // === CHART DATA GENERATION ===
    
    // Revenue trend chart (last 30 days)
    const revenueTrendData = [];
    for (let i = 29; i >= 0; i--) {
      const date = subDays(now, i);
      const dayPayments = allPayments.filter(p => 
        p.status === 'approved' && 
        format(new Date(p.createdAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      const dayRevenue = dayPayments.reduce((sum, p) => sum + p.amount, 0);
      
      revenueTrendData.push({
        date: format(date, 'MM/dd'),
        revenue: dayRevenue,
        payments: dayPayments.length
      });
    }

    // Payment status distribution
    const paymentStatusData = [
      { name: 'مقبول', value: approvedPayments.length, color: '#10B981' },
      { name: 'معلق', value: pendingPayments.length, color: '#F59E0B' },
      { name: 'مرفوض', value: rejectedPayments.length, color: '#EF4444' }
    ];

    // Weekly comparison chart
    const weeklyComparisonData = [];
    for (let i = 6; i >= 0; i--) {
      const weekStart = subWeeks(startOfCurrentWeek, i);
      const weekEnd = subWeeks(startOfCurrentWeek, i - 1);
      const weekPayments = allPayments.filter(p => {
        const paymentDate = new Date(p.createdAt);
        return paymentDate >= weekStart && paymentDate < weekEnd && p.status === 'approved';
      });
      
      weeklyComparisonData.push({
        week: `أسبوع ${i === 0 ? 'الحالي' : i}`,
        revenue: weekPayments.reduce((sum, p) => sum + p.amount, 0),
        payments: weekPayments.length
      });
    }

    // Monthly trend (last 12 months)
    const monthlyTrendData = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = subMonths(startOfCurrentMonth, i);
      const monthEnd = subMonths(startOfCurrentMonth, i - 1);
      const monthPayments = allPayments.filter(p => {
        const paymentDate = new Date(p.createdAt);
        return paymentDate >= monthStart && paymentDate < monthEnd && p.status === 'approved';
      });
      
      monthlyTrendData.push({
        month: format(monthStart, 'MMM yyyy'),
        revenue: monthPayments.reduce((sum, p) => sum + p.amount, 0),
        payments: monthPayments.length,
        users: users.filter(u => {
          const userDate = new Date(u.createdAt);
          return userDate >= monthStart && userDate < monthEnd;
        }).length
      });
    }

    // === USER ANALYSIS ===
    const usersLast30Days = users.filter(u => new Date(u.createdAt) >= last30Days).length;
    const usersLast7Days = users.filter(u => new Date(u.createdAt) >= last7Days).length;
    const usersLastWeek = users.filter(u => {
      const userDate = new Date(u.createdAt);
      return userDate >= subWeeks(startOfCurrentWeek, 1) && userDate < startOfCurrentWeek;
    }).length;

    const userGrowth = usersLastWeek > 0 
      ? ((usersLast7Days - usersLastWeek) / usersLastWeek * 100)
      : usersLast7Days > 0 ? 100 : 0;

    // === TOP PERFORMERS ===
    
    // Top paying users
    const userPayments = new Map();
    approvedPayments.forEach(payment => {
      const current = userPayments.get(payment.userId) || { totalSpent: 0, paymentCount: 0, userName: payment.userName };
      current.totalSpent += payment.amount;
      current.paymentCount += 1;
      userPayments.set(payment.userId, current);
    });

    const topUsers = Array.from(userPayments.entries())
      .map(([userId, data]) => ({ userId, ...data }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10);

    // === CONVERSION RATES ===
    const conversionRate = totalUsers > 0 ? (approvedPayments.length / totalUsers * 100) : 0;
    const approvalRate = totalPayments > 0 ? (approvedPayments.length / totalPayments * 100) : 0;

    // === RECENT ACTIVITY ===
    const recentPayments = allPayments.slice(0, 10).map(payment => ({
      id: payment.id,
      userName: payment.userName,
      amount: payment.amount,
      status: payment.status,
      createdAt: payment.createdAt,
      itemName: payment.itemName
    }));

    const recentUsers = users
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
      .map(user => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      }));

    // === RESPONSE DATA ===
    const dashboardData = {
      overview: {
        totalUsers,
        totalPayments,
        totalRevenue,
        averageOrderValue,
        approvedPayments: approvedPayments.length,
        pendingPayments: pendingPayments.length,
        rejectedPayments: rejectedPayments.length,
        conversionRate,
        approvalRate
      },
      growth: {
        weeklyGrowth,
        monthlyGrowth,
        revenueGrowth,
        userGrowth,
        usersLast7Days,
        usersLast30Days,
        revenueLast7Days,
        revenueLast30Days
      },
      charts: {
        revenueTrend: revenueTrendData,
        paymentStatus: paymentStatusData,
        weeklyComparison: weeklyComparisonData,
        monthlyTrend: monthlyTrendData
      },
      topPerformers: {
        topUsers
      },
      recentActivity: {
        recentPayments,
        recentUsers
      },
      timeframe,
      lastUpdated: new Date().toISOString()
    };

    console.log(`Dashboard data generated for timeframe: ${timeframe}`);
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error generating dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to generate dashboard data' },
      { status: 500 }
    );
  }
} 