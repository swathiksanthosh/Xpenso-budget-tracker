import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransaction = ({transactions, onSeeMore}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-bold">Recent Transactions</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base"/>
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {transactions?.slice(0,5)?.map((item) => (
                    <div
                        key={item._id}
                        className="bg-gradient-to-r from-[#d1d0f9] via-[#e2e2f4] to-[#eee] p-1 rounded-lg shadow-sm"
                    >
                        <TransactionInfoCard
                            title={item.type == 'expense' ? item.category : item.source}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransaction;