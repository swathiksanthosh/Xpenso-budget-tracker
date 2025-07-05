import React, { useEffect, useState }  from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);
    return <div className="card min-h-[450px]">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-xl font-bold">Expense Overview</h5>
            </div>

            <button className="add-btn flex items-center gap-1" onClick={onExpenseIncome}>
                <LuPlus className="text-xl strokeWidth={4}" />
                Add Expense
            </button>
        </div>

        <div className="mt-10">
            <CustomLineChart data={chartData} />

        </div>
    </div>;

};

export default ExpenseOverview;