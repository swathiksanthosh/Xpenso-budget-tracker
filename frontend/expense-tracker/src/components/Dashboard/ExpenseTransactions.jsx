import TransactionInfoCard from "../Cards/TransactionInfoCard";
import React from "react";
import {LuArrowRight} from "react-icons/lu";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-bold">Expenses</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    SeeAll <LuArrowRight className="text-base"/>
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {transactions?.slice(0,5)?.map((expense) => (
                    <div
                        key={expense._id}
                        className="justify-between items-center bg-gradient-to-r from-[#d1d0f9] via-[#e2e2f4] to-[#eee] p-1 rounded-lg shadow-sm"
                    >
                        <TransactionInfoCard
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.data).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseTransactions;