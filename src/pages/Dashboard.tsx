import React from 'react';
import {
  WelcomeBand,
  KPIRow,
  EmissionsChart,
  PillarScores,
  FrameworkReadiness,
  DeadlinesTable,
  DoNextPanel,
  ActivityFeed,
} from '../components/dashboard/DashboardWidgets';

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <WelcomeBand />
        <KPIRow />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <EmissionsChart />
            <FrameworkReadiness />
          </div>
          <div>
            <PillarScores />
            <DoNextPanel />
          </div>
        </div>

        <DeadlinesTable />
        <ActivityFeed />
      </div>
    </div>
  );
};
