import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineBadgeCheck,
  HiOutlineXCircle,
} from 'react-icons/hi';
import { useApplications } from '../hooks/useApplications';
import PageWrapper from '../components/layout/PageWrapper';
import StatsCard from '../components/ui/StatsCard';
import { getMonthYear } from '../utils/dateHelpers';

const COLORS = ['#6366f1', '#f59e0b', '#22c55e', '#ef4444'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-surface-100 px-4 py-3">
        <p className="text-xs font-semibold text-surface-800 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs text-surface-600">
            <span
              className="inline-block w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}: <strong>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const { applications } = useApplications();

  // Pie chart data
  const statusData = useMemo(() => {
    const counts = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    applications.forEach((app) => {
      const key =
        app.status === 'applied'
          ? 'Applied'
          : app.status === 'interview'
          ? 'Interview'
          : app.status === 'offer'
          ? 'Offer'
          : 'Rejected';
      counts[key]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [applications]);

  // Bar chart data — monthly
  const monthlyData = useMemo(() => {
    const monthMap = {};
    applications.forEach((app) => {
      const month = getMonthYear(app.appliedDate);
      if (month) {
        if (!monthMap[month]) {
          monthMap[month] = { month, applied: 0, interview: 0, offer: 0, rejected: 0 };
        }
        monthMap[month][app.status]++;
      }
    });

    return Object.values(monthMap).sort(
      (a, b) => new Date(a.month) - new Date(b.month)
    );
  }, [applications]);

  // Top platforms
  const platformData = useMemo(() => {
    const counts = {};
    applications.forEach((app) => {
      if (app.platform) {
        counts[app.platform] = (counts[app.platform] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [applications]);

  const total = applications.length;
  const interviews = applications.filter((a) => a.status === 'interview').length;
  const offers = applications.filter((a) => a.status === 'offer').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;

  return (
    <PageWrapper
      title="Analytics"
      subtitle="Visual insights into your job search journey"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={HiOutlineDocumentText} label="Total" value={total} color="primary" delay={0} />
        <StatsCard icon={HiOutlineChatAlt2} label="Interviews" value={interviews} color="warning" delay={0.07} />
        <StatsCard icon={HiOutlineBadgeCheck} label="Offers" value={offers} color="success" delay={0.14} />
        <StatsCard icon={HiOutlineXCircle} label="Rejected" value={rejected} color="danger" delay={0.21} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-surface-100 p-6"
        >
          <h3 className="text-base font-semibold text-surface-900 mb-4">
            Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-surface-100 p-6"
        >
          <h3 className="text-base font-semibold text-surface-900 mb-4">
            Top Platforms
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={platformData} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Applications" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Monthly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-surface-100 p-6"
      >
        <h3 className="text-base font-semibold text-surface-900 mb-4">
          Monthly Application Trend
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyData} barCategoryGap="15%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontWeight: 500, paddingBottom: '16px' }}
            />
            <Bar dataKey="applied" name="Applied" fill="#6366f1" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="interview" name="Interview" fill="#f59e0b" radius={[0, 0, 0, 0]} stackId="a" />
            <Bar dataKey="offer" name="Offer" fill="#22c55e" radius={[0, 0, 0, 0]} stackId="a" />
            <Bar dataKey="rejected" name="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </PageWrapper>
  );
};

export default Analytics;
