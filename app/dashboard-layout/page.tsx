// Praveen
import ScrollUp from '@/components/Common/ScrollUp';
import Hero from '@/components/Hero';
import FinancialGoalsPage from '@/components/financial_goals';
import FinancialSummaryPage from '@/components/financial_summary';
import BanksDetailsPage from '@/components/piggy_banks';
import { StockDetailsMainPage } from '@/components/stock_details_main_page';
import React from 'react';

export default function Dashboard() {
    return (
        <>
            <ScrollUp />
            <Hero />
            {/* <PlaidComponentPage/> */}
            <FinancialSummaryPage />
            <BanksDetailsPage />
            <FinancialGoalsPage />
            <StockDetailsMainPage />
            {/* <TopStocksDetailsPage /> */}
        </>
    );
}
