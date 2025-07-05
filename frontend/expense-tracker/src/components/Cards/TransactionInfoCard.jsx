import React from 'react';
import {
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete
}) => {
    const getAmountStyles = () =>
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

    // Optional: Assign custom circle color per category or type
    const getCircleColor = () => {
        if (type === "expense") return "bg-[#3f386b]";
        if (type === "income") return "bg-[#3f386b]";
        return "bg-gray-400";
    };

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-100/60">
            {/* Colored Circle instead of icon */}
            <div className={`w-10 h-10 rounded-full ${getCircleColor()}`} />

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className="text-xs font-medium">
                            {type === "income" ? "+" : "-"} ${amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;
